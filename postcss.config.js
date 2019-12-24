const pxtorem = require("postcss-pxtorem");

module.exports = {
  plugins: [
    require("autoprefixer"),
    pxtorem({
      rootValue: 37.5,
      propList: ["*"]
    })
  ]
};
