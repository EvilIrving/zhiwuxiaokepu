<template>
    <el-dialog :model-value="dialogVisible" :destroy-on-close="true" :title="`${dialogData.title}植物`" width="900"
        @close="dialogVisible = false">
        <el-form label-suffix=" :" label-width="auto" :model="dialogData.row" :rules="rules" ref="ruleFormRef">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="中文名" prop="chineseName">
                        <el-input v-model="dialogData.row.chineseName" :style="InputStyle" placeholder="请输入中文名"
                            clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="拉丁名" prop="latinName">
                        <el-input v-model="dialogData.row.latinName" :style="InputStyle" placeholder="请输入拉丁名"
                            clearable />

                        <el-radio-group v-model="dialogData.row.latinStyle" class="ml-4">
                            <!-- 拉丁格式 1-正则 2-全正体 -->
                            <el-radio :value="1" size="large">常规正则</el-radio>
                            <el-radio :value="2" size="large">全正体正则</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="科" prop="family">
                        <el-input v-model="dialogData.row.family" :style="InputStyle" placeholder="请输入科" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="属" prop="genus">
                        <el-input v-model="dialogData.row.genus" :style="InputStyle" placeholder="请输入属" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="花期" prop="florescence">
                        <el-input v-model="dialogData.row.florescence" :style="InputStyle" placeholder="请输入花期"
                            clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="果期" prop="fruitStage">
                        <el-input v-model="dialogData.row.fruitStage" :style="InputStyle" placeholder="请输入果期"
                            clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="花果期" prop="flowerFruit">
                        <el-input v-model="dialogData.row.flowerFruit" :style="InputStyle" placeholder="请输入花果期"
                            clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="种子成熟" prop="seedMaturation">
                        <el-input v-model="dialogData.row.seedMaturation" :style="InputStyle" placeholder="请输入种子成熟"
                            clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="保护等级" prop="protectionClass">
                        <el-input v-model="dialogData.row.protectionClass" :style="InputStyle" placeholder="请输入保护等级"
                            clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="dialogData.row.remark" :style="InputStyle" placeholder="请输入备注" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="形态特征" prop="morphological">
                        <el-input v-model="dialogData.row.morphological" :style="InputStyle"
                            :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="请输入形态特征" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="生活习性" prop="lifeHabit">
                        <el-input v-model="dialogData.row.lifeHabit" :style="InputStyle"
                            :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="请输入生活习性" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="绿化应用" prop="greenApplication">
                        <el-input v-model="dialogData.row.greenApplication" :style="InputStyle"
                            :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="请输入绿化应用" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="图片地址" prop="photosArr">
                        <UploadImgs v-model:file-list="dialogData.row.photosArr" :limit="2">
                            <template #empty>
                                <el-icon>
                                    <Picture />
                                </el-icon>
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
import UploadImgs from "@/components/base-upload/Imgs.vue";
import { editPlant } from "@/api/plant";
import { toRaw } from "vue";

const rules = reactive({
    chineseName: [{ required: true, message: '请输入中文名', trigger: 'blur' }],
    latinName: [{ required: true, message: '请输入拉丁名', trigger: 'blur' }],
    family: [{ required: true, message: '请输入科', trigger: 'blur' }],
    genus: [{ required: true, message: '请输入属', trigger: 'blur' }],
    // morphological: [{ required: true, message: '请输入形态特征', trigger: 'blur' }],
    // lifeHabit: [{ required: true, message: '请输入生活习性', trigger: 'blur' }],
    // greenApplication: [{ required: true, message: '请输入绿化运用', trigger: 'blur' }],
    // photosArr: [{ required: true, message: "请上传植物照片" }],
});

const InputStyle = ref({ width: '300px' })
const dialogVisible = ref(false)
const dialogData = ref({
    title: '',
    isView: false,
    row: {}
})

const ruleFormRef = ref()
const handleSubmit = () => {
    ruleFormRef.value.validate(async valid => {
        if (!valid) return;
        try {
            const { photosArr } = dialogData.value.row
            dialogData.value.row.photos = toRaw(photosArr).map(item => item.url).join(',')
            await editPlant(dialogData.value.row);
            ElMessage.success({ message: `${dialogData.value.title}成功！` });
            dialogData.value.getTableList();
            dialogVisible.value = false;
        } catch (error) {
            console.log(error);
        }
    });
};

// 接收父组件传过来的参数
const acceptParams = (params) => {
    dialogData.value = params;
    dialogVisible.value = true;
};
defineExpose({
    acceptParams
});
</script>
