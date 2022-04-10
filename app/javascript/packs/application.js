import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
ActiveStorage.start()

import "../stylesheets/reset"
import "bootstrap"
import "../stylesheets/application"
import "../stylesheets/common"
import "../stylesheets/home"
import "../stylesheets/user"

const images = require.context("../images", true);
const imagePath = (name) => images(name, true);
const setHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

(() => {
  setHeight();
})();
