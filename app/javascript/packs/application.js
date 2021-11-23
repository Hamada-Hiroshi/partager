import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

import "../stylesheets/reset"
import "bootstrap"
import "../stylesheets/application"
import "../stylesheets/common"
import "../stylesheets/home"
import "../stylesheets/user"

const images = require.context("../images", true);
const imagePath = (name) => images(name, true);
