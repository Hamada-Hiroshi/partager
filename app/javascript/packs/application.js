import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "bootstrap"
import ReactOnRails from "react-on-rails";
import App from "./App";

Rails.start()
ActiveStorage.start()
ReactOnRails.register({ App });

// const images = require.context("../images", true);
// const imagePath = (name) => images(name, true);

const setHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

(() => {
  setHeight();
})();
