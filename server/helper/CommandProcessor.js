import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export default class CommandProcessor {

  constructor() {
    this.commands = new Map();
  }

  async loadCommands(folderPath) {
    const absolutePath = path.resolve(process.cwd(), folderPath);

    const files = fs.readdirSync(absolutePath);

    for (const file of files) {
      if (path.extname(file) === '.js') {
        const filePath = path.join(absolutePath, file);
        const module = await import(filePath);

        if (typeof module.default !== 'function') {
          throw new Error(`Command file ${file} does not export a default function.`);
        }

        const commandName = path.basename(file, '.js');
        this.addCommand(commandName, module.default);
        console.log("Loaded command: ", commandName);
      }
    }
  }

  addCommand(commandName, handler) {
    this.commands.set(commandName, handler);
  }

  processCommand(command, ...args) {
    if(this.commands.has(command.cmd)) {
      this.commands.get(command.cmd)(command.data, ...args);
    } else {
      console.error("Could not run command, not loaded: ", command.name);
    }
  }

  removeCommand(commandName) {
    this.commands.delete(commandName);
  }

}
