import Joi from 'joi';
import getAppDataPath from './helper/getAppDataPath.js';
import fs from 'fs';

const appConfigSchema = Joi.object({
  webPort: Joi.number().integer().min(1024).max(65535).default(6969).optional(),
  wsPort: Joi.number().integer().min(1024).max(65535).default(16969).optional(),
  cacheUIHTMLFile: Joi.boolean().default(false).optional(),
  adminUsername: Joi.string().default("admin").optional(),
  adminPassword: Joi.string().default("password").optional()
}).unknown(true);
const CONFIG_FILEPATH = getAppDataPath("config.json");

class AppConfig {

  constructor() {
    this.configuration = appConfigSchema.validate({}).value;
    this.load();
  }

  set(property, value) {
    this.configuration[property] = value;
    this.validate();
    this.save();
  }

  validate() {
    this.configuration = appConfigSchema.validate(this.configuration).value;
  }

  get(property) {
    return this.configuration[property];
  }

  load() {
    try {
      fs.writeFileSync(CONFIG_FILEPATH, JSON.stringify(this.configuration), { encoding: 'utf8' });
    } catch(e) {
      console.error(e);
      console.error("Could not load app configuration.");
    }
  }

  save() {
    try {
      let configFileText = fs.readFileSync(CONFIG_FILEPATH, { encoding: 'utf8' });
      let configData = JSON.parse(configData);
      this.configuration = appConfigSchema.validate(configData).value;
    } catch(e) {
      console.error(e);
      console.error("Could not save app configuration.");
    }
  }



}

const appConfig = new AppConfig();

export default appConfig;
