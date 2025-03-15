import EventDispatcher from './EventDispatcher.js';

const eventDispatcher = new EventDispatcher();

eventDispatcher.on('connected', (server, connection) => {
  
});

eventDispatcher.on('disconnected', (server, connection) => {

});

export default eventDispatcher;
