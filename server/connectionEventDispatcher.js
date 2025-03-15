import EventDispatcher from './EventDispatcher.js';
import CommandProcessor from './CommandProcessor.js';
import loginCommand from './commands/login.js';

const commandProcessor = new CommandProcessor();
commandProcessor.loadCommands("./commands");

const eventDispatcher = new EventDispatcher();
eventDispatcher.on('connected', (server, connection) => {
  connection.sendCommand("system_message", { message: "Hi" })
});
eventDispatcher.on('command', (server, connection, command) => {
  commandProcessor.processCommand(command, server, connection)
});
export default eventDispatcher;
