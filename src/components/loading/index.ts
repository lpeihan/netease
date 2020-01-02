import Vue from "vue";

const LoadingConstructor = Vue.extend(require("./Loading").default);

let instance: any;

export default {
  open(options: { message?: string } = {}) {
    if (!instance) {
      instance = new LoadingConstructor({
        el: document.createElement("div")
      });

      document.body.appendChild(instance.$el);
    }

    if (instance.show) {
      return;
    }

    if (options.message) {
      instance.message = options.message;
    }

    Vue.nextTick(() => {
      instance.show = true;
    });
  },

  close() {
    if (instance) {
      instance.show = false;
    }
  }
};
