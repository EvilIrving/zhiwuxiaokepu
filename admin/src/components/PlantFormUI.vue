<template>
    <el-dialog :model-value="dialogVisible" :destroy-on-close="true" :title="`${dialogProps.title}植物`" width="900"
        @close="dialogVisible = false">
        <el-form :model="dialogProps.row" :rules="rules" ref="ruleFormRef">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="中文名" prop="chineseName" :label-width="formLabelWidth">
                        <el-input v-model="dialogProps.row.chineseName" :style="InputStyle" placeholder="请输入中文名"
                            clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="拉丁名" prop="latinName" :label-width="formLabelWidth">
                        <el-input v-model="dialogProps.row.latinName" :style="InputStyle" placeholder="请输入拉丁名"
                            clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="科" prop="family" :label-width="formLabelWidth">
                        <el-input v-model="dialogProps.row.family" :style="InputStyle" placeholder="请输入科" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="属" prop="genus" :label-width="formLabelWidth">
                        <el-input v-model="dialogProps.row.genus" :style="InputStyle" placeholder="请输入属" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="花期" prop="florescence" :label-width="formLabelWidth">
                        <el-input v-model="dialogProps.row.florescence" :style="InputStyle" placeholder="请输入花期"
                            clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="果期" prop="fruitStage" :label-width="formLabelWidth">
                        <el-input v-model="dialogProps.row.fruitStage" :style="InputStyle" placeholder="请输入果期"
                            clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="花果期" prop="flowerFruit" :label-width="formLabelWidth">
                        <el-input v-model="dialogProps.row.flowerFruit" :style="InputStyle" placeholder="请输入花果期"
                            clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="种子成熟" prop="seedMaturation" :label-width="formLabelWidth">
                        <el-input v-model="dialogProps.row.seedMaturation" :style="InputStyle" placeholder="请输入种子成熟"
                            clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="保护等级" prop="protectionClass" :label-width="formLabelWidth">
                        <el-input v-model="dialogProps.row.protectionClass" :style="InputStyle" placeholder="请输入保护等级"
                            clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                        <el-input v-model="dialogProps.row.remark" :style="InputStyle" placeholder="请输入备注" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="形态特征" prop="morphological" :label-width="formLabelWidth">
                        <el-input v-model="dialogProps.row.morphological" :style="InputStyle"
                            :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="请输入形态特征" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="生活习性" prop="lifeHabit" :label-width="formLabelWidth">
                        <el-input v-model="dialogProps.row.lifeHabit" :style="InputStyle"
                            :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="请输入生活习性" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="绿化应用" prop="greenApplication" :label-width="formLabelWidth">
                        <el-input v-model="dialogProps.row.greenApplication" :style="InputStyle"
                            :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="请输入绿化应用" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="图片地址" prop="photosArr" :label-width="formLabelWidth">
                        <UploadImgs v-model:file-list="dialogProps.row.photosArr" :limit="2">
                            <template #empty>
                                <!-- <el-icon>
                                    <Picture />
                                </el-icon> -->
                                <span>请上传照片</span>
                            </template>
                            <template #tip> 必须上传 1-2 张图片 </template>
                        </UploadImgs>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import UploadImgs from "@/components/Upload/Imgs.vue";
import { editPlant } from "@/api/plant";
const props = defineProps({
    title: {
        type: String,
        default: '添加植物'
    },
    isView: {
        type: Boolean,
        default: false
    },
    row: {
        type: Object,
        required: true
    }
})

const rules = reactive({
    chineseName: [{ required: true, message: '请输入中文名', trigger: 'blur' }],
    latinName: [{ required: true, message: '请输入拉丁名', trigger: 'blur' }],
    family: [{ required: true, message: '请输入科', trigger: 'blur' }],
    genus: [{ required: true, message: '请输入属', trigger: 'blur' }],
    morphological: [{ required: true, message: '请输入形态特征', trigger: 'blur' }],
    lifeHabit: [{ required: true, message: '请输入生活习性', trigger: 'blur' }],
    greenApplication: [{ required: true, message: '请输入绿化运用', trigger: 'blur' }]
});

const formLabelWidth = ref('120px')
const InputStyle = ref({ width: '300px' })
const dialogVisible = ref(false)
const dialogProps = ref({
    title: '',
    isView: false,
    row: {}
})

// 接收父组件传过来的参数
const acceptParams = (params) => {
    console.log(params, 'params');
    dialogProps.value = params;
    dialogVisible.value = true;
};


const ruleFormRef = ref()
const handleSubmit = () => {
    console.log(ruleFormRef, 'ruleFormRef');
    ruleFormRef.value.validate(async valid => {
        if (!valid) return;
        try {
            await editPlant(dialogProps.value.row);
            ElMessage.success({ message: `${dialogProps.value.title}成功！` });
            dialogProps.getTableList();
            dialogVisible.value = false;
        } catch (error) {
            console.log(error);
        }
    });
};

const closeForm = () => {
    dialogVisible.value = false;
};

defineExpose({
    acceptParams
});
</script>
