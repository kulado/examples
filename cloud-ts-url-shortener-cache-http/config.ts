// Copyright 2016-2018, Kulado Corporation.  All rights reserved.

import * as kulado from "@kulado/kulado";

let config = new kulado.Config();

// Get the Redis password from config
export let redisPassword = config.require("redisPassword");
