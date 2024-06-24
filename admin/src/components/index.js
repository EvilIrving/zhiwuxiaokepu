import SearchBar from "@/components/SearchBar.vue";
import PlantList from "@/components/PlantList.vue";
import Pagination from "@/components/Pagination.vue";
import Images from "@/components/base-image/Images.vue";
import PlantFormDialog from "@/components/PlantFormDialog.vue";
import BaseInput from "@/components/base-input/base-input.vue";

// import BaseSelect from "@/components/base-select/base-select.vue";
// import BaseInputNumber from "@/components/base-input-number/base-input-number.vue";
// import BaseDatePicker from "@/components/base-date-picker/base-date-picker.vue";

const componentMap = new Map();

componentMap.set("input", BaseInput);
// componentMap.set("select", BaseSelect);
// componentMap.set("number", BaseInputNumber);
// componentMap.set("date", BaseDatePicker);

export { SearchBar, PlantList, Pagination, Images, PlantFormDialog, BaseInput };
