import axios from "axios";
import { useEnv } from "@/hooks/useEnv";
import { ResultEnum, ContentTypeEnum } from "@/request/httpEnum";
import { useUserStoreWithOut } from "@/stores/user";
import { LOGIN_URL } from "@/config/config";
import router from "@/router";
import { checkStatus } from "@/request/checkStatus";
import { AxiosLoading } from "./loading";
import { AxiosCancel } from "./cancel";
import { AxiosRetry } from "./retry";
import { ElMessage } from "element-plus";
const defaultConfig = {
  successMessage: false,
  errorMessage: true,
  cancelSame: false,
  isRetry: false,
  retryCount: 3,
  loading: true,
};

const { VITE_BASE_API } = useEnv();

const axiosCancel = new AxiosCancel();
const axiosLoading = new AxiosLoading();

const service = axios.create({
  baseURL: VITE_BASE_API,
  timeout: 10 * 1000,
  headers: { "Content-Type": ContentTypeEnum.JSON },
});

service.interceptors.request.use((config) => {
  const { getToken } = useUserStoreWithOut();
  const { cancelSame, loading, contentType } = config.requestOptions;

  if (contentType) {
    config.headers["Content-Type"] = contentType;
  }

  if (cancelSame) {
    axiosCancel.addPending(config);
  }

  if (getToken) {
    config.headers.Authorization = `${getToken}` || "";
  }
  if (loading) {
    axiosLoading.addLoading();
  }

  return config;
});

service.interceptors.response.use(
  (response) => {
    const { data, config } = response;
    axiosCancel.removePending(config);

    if (data) {
      return data;
    }

    // 登录失效
    if (data.code == ResultEnum.OVERDUE) {
      userStore.setToken("");
      router.replace(LOGIN_URL);
      ElMessage.error(data.msg);
      return Promise.reject(data);
    }
    // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
    if (data.code && data.code !== ResultEnum.SUCCESS) {
      ElMessage.error(data.msg);
      return Promise.reject(data);
    }
    // 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
    return data;
    // if (data.code === ResultEnum.SUCCESS) {
    //   return data;
    // } else {
    //   return Promise.reject(data);
    // }
  },
  async (error) => {
    const { response, config } = error;
    axiosCancel.removePending(config || {});
    // 请求超时 && 网络错误单独判断，没有 response
    if (error.message.indexOf("timeout") !== -1)
      ElMessage.error("请求超时！请您稍后重试");
    if (error.message.indexOf("Network Error") !== -1)
      ElMessage.error("网络错误！请您稍后重试");
    // 根据服务器响应的错误状态码，做不同的处理
    if (response) checkStatus(response.status, router);
    // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
    if (!window.navigator.onLine) router.replace("/500");
    if (response && response.status === 401) router.replace("/login");
    return Promise.reject(error);
  }
  // (err) => {
  // console.log("err", err);

  // if (err.code === "ERR_CANCELED") return;
  // const { isRetry, retryCount } = err.config.requestOptions;
  // if (isRetry && (err.config._retryCount || 0) < retryCount) {
  //   const axiosRetry = new AxiosRetry();
  //   axiosRetry.retry(service, err);
  //   return;
  // }
  // axiosCancel.removePending(err.config || {});
  // return Promise.reject(err.response);
  // }
);

const request = {
  get(url, data, config) {
    return request.request("GET", url, { params: data }, config);
  },
  post(url, data, config) {
    return request.request("POST", url, { data }, config);
  },
  put(url, data, config) {
    return request.request("PUT", url, { data }, config);
  },
  delete(url, data, config) {
    return request.request("DELETE", url + `/${data}`, config);
  },
  request(method = "GET", url, data, config) {
    const options = Object.assign({}, defaultConfig, config);
    return new Promise((resolve, reject) => {
      service({ method, url, ...data, requestOptions: options })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          if (options.loading) {
            axiosLoading.closeLoading();
          }
        });
    });
  },
};

export default request;
