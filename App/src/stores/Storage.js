class Store {
  get(k) {
    if (!window.Alteryx.browser) return null;
    try {
      return JSON.parse(sessionStorage.getItem(k));
    } catch (e) {
      return null;
    }
  }
  set(k, v) {
    if (window.Alteryx.browser) {
      sessionStorage.setItem(k, JSON.stringify(v));
    }
  }
}

export default new Store();
