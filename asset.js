class Asset {
  path = null;
  loaded = false;

  constructor(path, callback) {
    this.path = path;
    this.callback = callback;
  }

  load() {
    const extension = this.path.split('.').pop();
    let promise = Promise.resolve();

    if (this.loaded) {
      console.warn('Already loaded: %o', this.path);
      return promise;
    }

    switch (extension) {
      case 'css':
        promise = this.#loadStyles();
        break;

      case 'js':
        promise = this.#loadScript();
        break;

      default:
        promise = Promise.reject(`Unknown extension: ${extension}`);
    }

    return promise
      .catch((msg) => (msg && console.error(msg)))
      .then((msg) => (msg && console.log(msg)))
      .then(() => this.callback?.());
  }

  #loadScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');

      script.type = 'text/javascript';
      script.src = this.path;

      script.onload = () => {
        this.loaded = true;
        resolve(`Loaded script: ${this.path}`);
      };

      script.onerror = () => {
        reject(`Error loading script: ${this.path}`);
      };

      document.head.appendChild(script);
    });
  }

  #loadStyles(path) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');

      link.rel = 'stylesheet';
      link.crossorigin = 'anonymous';
      link.href = this.path;

      link.onload = () => {
        this.loaded = true;
        resolve(`Loaded stylesheet: ${this.path}`);
      };

      link.onerror = () => {
        reject(`Error loading stylesheet: ${this.path}`);
      };

      document.head.appendChild(link);
    });
  }
}
