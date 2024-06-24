import request from "@/request";
import { ContentTypeEnum } from "@/request/httpEnum";

export const Api = {
  UPLOAD: "/file/upload",
};

export const uploadImage = (data) =>
  request.post(Api.UPLOAD, data, {
    contentType: ContentTypeEnum.FORM_URLENCODED,
  });
