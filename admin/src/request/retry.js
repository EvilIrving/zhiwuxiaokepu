export class AxiosRetry {
  retry(service, err) {
    const config = err?.config || {};
    config._retryCount = config._retryCount || 0;
    config._retryCount += 1;
    delete config.headers; //删除config中的header，采用默认生成的header
    setTimeout(() => {
      service(config);
    }, 100);
  }
}
