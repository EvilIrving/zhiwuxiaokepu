class AxiosCancel {
  constructor() {
    this.pendingMap = new Map();
  }

  generateKey(config) {
    const { method, url } = config;
    return [url || "", method || ""].join("&");
  }

  addPending(config) {
    this.removePending(config);
    const key = this.generateKey(config);
    if (!this.pendingMap.has(key)) {
      const controller = new AbortController();
      config.signal = controller.signal;
      this.pendingMap.set(key, controller);
    } else {
      config.signal = this.pendingMap.get(key).signal;
    }
  }

  removePending(config) {
    const key = this.generateKey(config);
    if (this.pendingMap.has(key)) {
      this.pendingMap.get(key).abort();
      this.pendingMap.delete(key);
    }
  }

  removeAllPending() {
    this.pendingMap.forEach((cancel) => {
      cancel.abort();
    });
    this.reset();
  }

  reset() {
    this.pendingMap = new Map();
  }
}

export { AxiosCancel };
