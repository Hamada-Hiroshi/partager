import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "bootstrap"

Rails.start()
ActiveStorage.start()

const images = require.context("../images", true);
const imagePath = (name) => images(name, true);
const setHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

(() => {
  setHeight();
})();
