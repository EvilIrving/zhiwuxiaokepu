class AxiosLoading {
  constructor() {
    this.loadingCount = 0;
  }

  initLoading() {
    if (this.loading) {
      this.loading?.close?.();
    }
    this.loading = ElLoading.service({
      fullscreen: true,
    });
  }

  addLoading() {
    if (this.loadingCount === 0) {
      this.initLoading();
    }
    this.loadingCount++;
  }

  closeLoading() {
    if (this.loadingCount > 0) {
      if (this.loadingCount === 1) {
        this.loading.close();
      }
      this.loadingCount--;
    }
  }
}

export { AxiosLoading };
