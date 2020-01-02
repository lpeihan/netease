import Vue from "vue";

const LoadingConstructor = Vue.extend(require("./Loading").default);

let instance: any;

export default {
  open() {
    if (!instance) {
      instance = new LoadingConstructor({
        el: document.createElement("div")
      });

      document.body.appendChild(instance.$el);
    }

    if (instance.show) {
      return;
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
