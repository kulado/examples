// Copyright 2016-2018, Kulado Corporation.  All rights reserved.

import * as azure from "@kulado/azure";
import * as kulado from "@kulado/kulado";

// Parse and export configuration variables for this stack.
const config = new kulado.Config();
export const password = config.require("password");
export const location = config.get("location") || azure.Locations.EastUS;
export const sshPublicKey = config.require("sshPublicKey");
export const resourceGroup = new azure.core.ResourceGroup("aks", {location: location});
