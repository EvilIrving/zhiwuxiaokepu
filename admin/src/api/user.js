import request from "@/request";
import { ContentTypeEnum } from "@/request/httpEnum";
export const Api = {
  LOGIN: "/user/login",
};

export const login = (data) =>
  request.post(Api.LOGIN, data, {
    contentType: ContentTypeEnum.FORM_URLENCODED,
  });
