// Copyright 2016-2018, Kulado Corporation.  All rights reserved.

let kulado = require("@kulado/kulado");
let config = new kulado.Config();
module.exports = {
    slackChannel: config.get("slackChannel") || "#general",
    slackToken: config.require("slackToken"),
};
