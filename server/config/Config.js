import configSchema from './configSchema.js';
import getAppDataPath from './helper/getAppDataPath.js';
import fs from 'fs';

const CONFIG_FILEPATH = getAppDataPath("config.json");

class Config {

  constructor() {
    this.configuration = configSchema.validate({}).value;
    this.load();
  }

  set(property, value) {
    this.configuration[property] = value;
    this.validate();
    this.save();
  }

  validate() {
    this.configuration = configSchema.validate(this.configuration).value;
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
      this.configuration = configSchema.validate(configData).value;
    } catch(e) {
      console.error(e);
      console.error("Could not save app configuration.");
    }
  }



}

const config = new Config();

export default config;
