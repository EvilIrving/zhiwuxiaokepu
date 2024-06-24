<template>
  <div class="upload-box">
    <el-upload :id="uuid" action="#" :class="['upload', self_disabled ? 'disabled' : '']" :multiple="false"
      :disabled="self_disabled" :show-file-list="false" :http-request="handleHttpUpload" :before-upload="beforeUpload"
      :on-success="uploadSuccess" :on-error="uploadError"  :accept="fileType.join(',')">
      <template v-if="imageUrl">
        <img :src="imageUrl" class="upload-image" />
        <div class="upload-handle" @click.stop>
          <div v-if="!self_disabled" class="handle-icon" @click="editImg">
            <el-icon>
              <Edit />
            </el-icon>
            <span>编辑</span>
          </div>
          <div class="handle-icon" @click="imgViewVisible = true">
            <el-icon>
              <ZoomIn />
            </el-icon>
            <span>查看</span>
          </div>
          <div v-if="!self_disabled" class="handle-icon" @click="deleteImg">
            <el-icon>
              <Delete />
            </el-icon>
            <span>删除</span>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="upload-empty">
          <slot name="empty">
            <el-icon>
              <Plus />
            </el-icon>
            <!-- <span>请上传图片</span> -->
          </slot>
        </div>
      </template>
    </el-upload>
    <div class="el-upload__tip">
      <slot name="tip"></slot>
    </div>
    <el-image-viewer v-if="imgViewVisible" :url-list="[imageUrl]" @close="imgViewVisible = false" />
  </div>
</template>

<script setup>
import { ref, computed, inject } from "vue";
import { generateUUID } from "@/utils/utils";
import { uploadImage as uploadImg } from "@/api/upload";
import { ElNotification, formContextKey, formItemContextKey } from "element-plus";

// 接受父组件参数
const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
    default: ""
  },

  disabled: {
    type: Boolean,
    default: false
  },
  fileSize: {
    type: Number,
    default: 5
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

// 生成组件唯一id
const uuid = ref("id-" + generateUUID());

// 查看图片
const imgViewVisible = ref(false);
// 获取 el-form 组件上下文
const formContext = inject(formContextKey, void 0);
// 获取 el-form-item 组件上下文
const formItemContext = inject(formItemContextKey, void 0);
// 判断是否禁用上传和删除
const self_disabled = computed(() => {
  return props.disabled || formContext?.disabled;
});

/**
 * @description 图片上传
 * @param options upload 所有配置项
 * */
const emit = defineEmits < {
  "update:imageUrl": [value: string];
} > ();
const handleHttpUpload = async (options) => {
  let formData = new FormData();
  formData.append("file", options.file);
  try {
    const api =  uploadImg;
    const { data } = await api(formData);
    emit("update:imageUrl", data.fileUrl);
    // 调用 el-form 内部的校验方法（可自动校验）
    formItemContext?.prop && formContext?.validateField([formItemContext.prop]);
  } catch (error) {
    options.onError(error);
  }
};

/**
 * @description 删除图片
 * */
const deleteImg = () => {
  emit("update:imageUrl", "");
};

/**
 * @description 编辑图片
 * */
const editImg = () => {
  const dom = document.querySelector(`#${uuid.value} .el-upload__input`);
  dom && dom.dispatchEvent(new MouseEvent("click"));
};

/**
 * @description 文件上传之前判断
 * @param rawFile 选择的文件
 * */
const beforeUpload = rawFile => {
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
 * @description 图片上传成功
 * */
const uploadSuccess = () => {
  ElNotification({
    title: "温馨提示",
    message: "图片上传成功！",
    type: "success"
  });
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
</script>