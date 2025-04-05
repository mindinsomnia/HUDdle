export default class EventDispatcher {

  constructor() {
    this.eventHandlers = new Map();
  }

  on(eventName, handler) {
    if(!this.eventHandlers.has(eventName)) {
      this.eventHandlers.set(eventName, []);
    }
    this.eventHandlers.get(eventName).push(handler);
  }

  off(eventName, handler) {
    if(!this.eventHandlers.has(eventName)) {
      return;
    }
    let handlers = this.eventHandlers.get(eventName);
    let index = handlers.indexOf(handler);
    if(index > -1) {
      handlers.splice(index, 1);
    }
  }

  emit(eventName, ...args) {
    if(!this.eventHandlers.has(eventName)) {
      return;
    }
    let handlers = this.eventHandlers.get(eventName);
    for(const handler of handlers) {
      handler(...args);
    }
  }

}
