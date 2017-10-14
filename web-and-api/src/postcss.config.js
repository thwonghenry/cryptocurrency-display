const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');

module.exports = {
    plugins: () => [stylelint, autoprefixer]
};
