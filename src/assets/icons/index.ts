const files = require.context(".", true, /\.svg$/);

const modules: { [propName: string]: string } = {};

files.keys().forEach(key => {
  if (key === "./index.js") {
    return;
  }

  modules[key.replace(/(\.\/|\.svg)/g, "")] = `#${files(key).default.id}`;
});

export default modules;
