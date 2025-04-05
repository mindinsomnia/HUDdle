// Basically load all of the schemas, handlers, upgraders, downgraders, etc.
// Handles can receive commands and use server actions, and respond with commands. Or handle events from the server and decide what to do, and if necessary send commands to the client.
// Protocol handler specifies what the default state is for the handler, what versions of the protocol are supported, what version it is, etc.

export default {
  version: 1,
  supported: [ 1 ],
  defaultState: {

  },

}
