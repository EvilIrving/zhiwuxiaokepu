import SearchBar from "./SearchBar.vue";
import PlantList from "./PlantList.vue";
import Pagination from "./Pagination.vue";
import Images from "./Images.vue";
import PlantFormUI from "./PlantFormUI.vue";
import BaseInput from "@/components/base-input/base-input.vue";

// import BaseSelect from "@/components/base-select/base-select.vue";
// import BaseInputNumber from "@/components/base-input-number/base-input-number.vue";
// import BaseDatePicker from "@/components/base-date-picker/base-date-picker.vue";

const componentMap = new Map();

componentMap.set("input", BaseInput);
// componentMap.set("select", BaseSelect);
// componentMap.set("number", BaseInputNumber);
// componentMap.set("date", BaseDatePicker);

export { SearchBar, PlantList, Pagination, Images, PlantFormUI, BaseInput };
