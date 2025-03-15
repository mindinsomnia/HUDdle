import defaultConnectionState from './helper/defaultConnectionState.js';

export default class WSConnection {

  constructor(server, connection, connectionEventDispatcher) {
    this.server = server;
    this.connection = connection;
    this.state = defaultConnectionState();
    this.connectionEventDispatcher = connectionEventDispatcher;
    this.connection.on('message', data => this.onMessage(data));
    this.connection.on('error', () => this.onError());
    this.connection.on('close', () => this.onClose());
  }

  onMessage(data) {
    let text = "";
    try {
      text = data.toString();
    } catch(e) {
      console.error("Could not convert received message to string.");
      return;
    }
    console.log("Text: ", text);
    let command = null;
    try {
      command = JSON.parse(text);
    } catch(e) {
      console.error("Could not parse text into command.")
      return;
    }
    console.log("Received command: ", command);
    this.connectionEventDispatcher.emit('command', this.server, this, command);
  }

  sendCommand(commandName, data) {
    this.connection.send(JSON.stringify({cmd: commandName, data}));
  }

  onError() {
    this.connection.close(1000, 'Error occurred.');
  }

  onClose() {
    this.server.onDisconnected(this);
  }

}
