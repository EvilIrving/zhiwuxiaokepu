import request from "@/request";
import { ContentTypeEnum } from "@/request/httpEnum";

export const Api = {
  PLANT_LIST: "/botany/page",
  PLANT_DETAIL: "/botany/detail",
  PLANT_EDIT: "/botany/edit",
  UPLOAD: "/file/upload",
  PLANT_DELETE: "/botany/del",
};

export const getPlantList = (data) => request.get(Api.PLANT_LIST, data);
export const getPlantDetail = (data) => request.get(Api.PLANT_DETAIL, data);
export const editPlant = (data) =>
  request.post(Api.PLANT_EDIT, data, {
    contentType: ContentTypeEnum.FORM_URLENCODED,
  });
export const deletePlant = (data) =>
  request.delete(Api.PLANT_DELETE, data, {
    contentType: ContentTypeEnum.FORM_URLENCODED,
  });
