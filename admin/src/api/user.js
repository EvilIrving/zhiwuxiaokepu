import request from "@/request";
import { ContentTypeEnum } from "@/request/httpEnum";
export const Api = {
  LOGIN: "/user/login",
  UPDATE_PASSWORD: "/user/upd-pwd",
};

export const login = (data) =>
  request.post(Api.LOGIN, data, {
    contentType: ContentTypeEnum.FORM_URLENCODED,
  });

export const modifyPassword = (data) =>
  request.put(Api.UPDATE_PASSWORD, data, {
    contentType: ContentTypeEnum.FORM_URLENCODED,
  });
