import path from 'path';
import os from 'os';
import fs from 'fs';

export default (...args) => {
  let appDataDir;

  switch (os.platform()) {
    case 'win32': // Windows
      appDataDir = process.env.APPDATA;
      break;
    case 'darwin': // macOS
      appDataDir = path.join(os.homedir(), 'Library', 'Application Support');
      break;
    default: // Linux and others
      appDataDir = path.join(os.homedir(), '.config');
  }

  // Append your app's name to the path
  appDataDir = path.join(appDataDir, 'grady-vuckovic.HUDdle');

  // Override if environment variable set
  if(process.env.HUDDLE_APP_DATA_PATH) {
    appDataDir = process.env.HUDDLE_APP_DATA_PATH;
  }

  console.log("App Data Path: ", appDataDir);

  // Ensure the directory exists
  if (!fs.existsSync(appDataDir)) {
    fs.mkdirSync(appDataDir, { recursive: true });
  }

  // Return the path to the database file
  return path.join(appDataDir, ...args);
};
