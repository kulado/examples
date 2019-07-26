import * as kulado from "@kulado/kulado";

/**
 *   company
 *   └─ department
 *      └─ team
 */

const config = new kulado.Config();

export const companyName = config.require("companyName");
