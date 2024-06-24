<template>
  <div class="upload-box">
    <el-upload v-model:file-list="_fileList" action="#" list-type="picture-card"
      :class="['upload', self_disabled ? 'disabled' : '']" :multiple="true" :disabled="self_disabled" :limit="limit"
      :http-request="handleHttpUpload" :before-upload="beforeUpload" :on-exceed="handleExceed"
      :on-success="uploadSuccess" :on-error="uploadError" :accept="fileType.join(',')">
      <div class="upload-empty">
        <slot name="empty">
          <el-icon>
            <Plus />
          </el-icon>
        </slot>
      </div>
      <template #file="{ file }">
        <img :src="file.url" class="upload-image" />
        <div class="upload-handle" @click.stop>
          <div class="handle-icon" @click="handlePictureCardPreview(file)">
            <el-icon>
              <ZoomIn />
            </el-icon>
            <span>查看</span>
          </div>
          <div v-if="!self_disabled" class="handle-icon" @click="handleRemove(file)">
            <el-icon>
              <Delete />
            </el-icon>
            <span>删除</span>
          </div>
        </div>
      </template>
    </el-upload>
    <div class="el-upload__tip">
      <slot name="tip"></slot>
    </div>
    <el-image-viewer v-if="imgViewVisible" :url-list="[viewImageUrl]" @close="imgViewVisible = false" />
  </div>
</template>

<script setup name="UploadImgs">
import { ref, computed, inject, watch } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { uploadImage } from "@/api/upload";
import { ElNotification, formContextKey, formItemContextKey } from "element-plus";


// 接受父组件参数
const props = defineProps({
  fileList: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number,
    default: 2
  },
  fileSize: {
    type: Number,
    default: 10
  },
  fileType: {
    type: Array,
    default: () => ["image/jpeg", "image/png", "image/gif"]
  },
  height: {
    type: String,
    default: "150px",
  },
  width: {
    type: String,
    default: "150px"
  }
})

// 获取 el-form 组件上下文
const formContext = inject(formContextKey, void 0);
// 获取 el-form-item 组件上下文
const formItemContext = inject(formItemContextKey, void 0);
// 判断是否禁用上传和删除
const self_disabled = computed(() => {
  return props.disabled || formContext?.disabled;
});

const _fileList = ref(props.fileList);

// 监听 props.fileList 列表默认值改变
watch(
  () => props.fileList,
  (n) => {
    _fileList.value = n;
  }
);

/**
 * @description 文件上传之前判断
 * @param rawFile 选择的文件
 * */
const beforeUpload = (rawFile) => {
  const imgSize = rawFile.size / 1024 / 1024 < props.fileSize;
  const imgType = props.fileType.includes(rawFile.type);
  if (!imgType)
    ElNotification({
      title: "温馨提示",
      message: "上传图片不符合所需的格式！",
      type: "warning"
    });
  if (!imgSize)
    setTimeout(() => {
      ElNotification({
        title: "温馨提示",
        message: `上传图片大小不能超过 ${props.fileSize}M！`,
        type: "warning"
      });
    }, 0);
  return imgType && imgSize;
};

/**
 * @description 图片上传
 * @param options upload 所有配置项
 * */
const handleHttpUpload = async (options) => {
  let formData = new FormData();
  formData.append("file", options.file);
  try {
    const api = uploadImage;
    console.log(options.file,'options.file');
    const { data } = await api(formData);
    options.onSuccess(data);
  } catch (error) {
    options.onError(error);
  }
};

/**
 * @description 图片上传成功
 * @param response 上传响应结果
 * @param uploadFile 上传的文件
 * */
const emit = defineEmits(['update:fileList']);
const uploadSuccess = (response, uploadFile) => {
  if (!response) return;
  uploadFile.url = response.fileUrl;
  emit("update:fileList", _fileList.value);
  // 调用 el-form 内部的校验方法（可自动校验）
  formItemContext?.prop && formContext?.validateField([formItemContext.prop]);
  ElNotification({
    title: "温馨提示",
    message: "图片上传成功！",
    type: "success"
  });
};

/**
 * @description 删除图片
 * @param file 删除的文件
 * */
const handleRemove = (file) => {
  _fileList.value = _fileList.value.filter(item => item.url !== file.url || item.name !== file.name);
  emit("update:fileList", _fileList.value);
};

/**
 * @description 图片上传错误
 * */
const uploadError = () => {
  ElNotification({
    title: "温馨提示",
    message: "图片上传失败，请您重新上传！",
    type: "error"
  });
};

/**
 * @description 文件数超出
 * */
const handleExceed = () => {
  ElNotification({
    title: "温馨提示",
    message: `当前最多只能上传 ${props.limit} 张图片，请移除后上传！`,
    type: "warning"
  });
};

/**
 * @description 图片预览
 * @param file 预览的文件
 * */
const viewImageUrl = ref("");
const imgViewVisible = ref(false);
const handlePictureCardPreview = (file) => {
  viewImageUrl.value = file.url;
  imgViewVisible.value = true;
};
</script>
