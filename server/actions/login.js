import AppConfig from './../AppConfig.js';

// How to handle a login request
export default (data, server, connection) => {
  console.log("Login attempt...");
  console.log("Username: ", data.username);
  console.log("Password: ", data.password);
}
