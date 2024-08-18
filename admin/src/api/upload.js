import request from "@/request";
import { ContentTypeEnum } from "@/request/httpEnum";

export const Api = {
  UPLOAD: "/file/upload",
  EXPORT: "/botany/export",
};

export const uploadImage = (data) =>
  request.post(Api.UPLOAD, data, {
    contentType: ContentTypeEnum.FORM_URLENCODED,
  });

export const exportZip = (data) =>
  request.post(Api.EXPORT, data, {
    contentType: "application/json; application/octet-stream",
    responseType: ContentTypeEnum.Blob,
  });
