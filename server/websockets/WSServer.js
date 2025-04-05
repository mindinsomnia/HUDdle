import { WebSocketServer, WebSocket } from 'ws';
import WSConnection from './WSConnection.js';

export default class WSServer {

  constructor(serverEventDispatcher, connectionEventDispatcher, {port = 16969} = {}) {
    this.serverEventDispatcher = serverEventDispatcher;
    this.connectionEventDispatcher = connectionEventDispatcher;
    this.wss = new WebSocketServer({port});
    this.wss.on('connection', ws => this.onConnection(ws));
    this.connections = [];
  }

  onConnection(ws) {
    let wsConnection = new WSConnection(this, ws, this.connectionEventDispatcher);
    this.connections.push(wsConnection);
    this.serverEventDispatcher.emit('connected', this, wsConnection);
  }

  onDisconnected(connection) {
    this.connections = this.connections.filter(o => o !== connection);
    this.serverEventDispatcher.emit('disconnected', this, connection);
  }

}
