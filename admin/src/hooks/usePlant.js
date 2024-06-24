import { ref } from "vue";
import { ElMessage } from "element-plus";
import { editPlant } from "@/api/plant";

export function useAddPlant() {
  const form = ref({
    chineseName: "",
    latinName: "",
    family: "",
    genus: "",
    florescence: "",
    fruitStage: "",
    flowerFruit: "",
    seedMaturation: "",
    protectionClass: "",
    remark: "",
    morphological: "",
    lifeHabit: "",
    greenApplication: "",
    photos: "",
  });

  const updateForm = async (data) => {
    try {
      // 提交新增表单的逻辑
      await editPlant(data);
      ElMessage.success("新增成功!");
    } catch (error) {
      ElMessage.error("新增失败!");
    }
  };

  return {
    form,
    updateForm,
  };
}

export function useEditPlant(initialData) {
  const form = ref({
    ...initialData,
  });

  const updateForm = async (data) => {
    try {
      // 提交编辑表单的逻辑
      await editPlant(data);
      ElMessage.success("编辑成功!");
    } catch (error) {
      ElMessage.error("编辑失败!");
    }
  };

  return {
    form,
    updateForm,
  };
}
