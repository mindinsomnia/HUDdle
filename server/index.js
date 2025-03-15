/*
Server simply requires node v22 or higher to run.
It uses an SQLite3 database to store conversation logs, maintain channels,
and store users and their passwords.
This system is not intended to be used for sensitive secure communication,
so passwords are stored in plain text, and unless you have setup HTTPS,
the communication won't be encrypted, so do not use it for asking Grandma
for her banking passwords.
*/

import AppConfig from './AppConfig.js';
import WebUIServer from './WebUIServer.js';
import WSServer from './WSServer.js';
import connectionEventDispatcher from './connectionEventDispatcher.js';
import serverEventDispatcher from './serverEventDispatcher.js';

// Create servers
const wsServer = new WSServer(serverEventDispatcher, connectionEventDispatcher, { port: AppConfig.get("wsPort") });
const webUIServer = new WebUIServer({ cacheUIHTMLFile: AppConfig.get("cacheUIHTMLFile") });

// Run
await webUIServer.listen({ port: AppConfig.get("webPort") });
