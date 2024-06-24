class VStorage {
  constructor(storageModel) {
    this.storage = storageModel;
  }

  getItem(key) {
    return this.storage.getItem(key);
  }

  setItem(key, value) {
    this.storage.setItem(key, value);
  }

  removeItem(key) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}

const local = new VStorage(localStorage);
const session = new VStorage(sessionStorage);

export { local, session };
