import Joi from 'joi';

// Configuration Schema
const configSchema = Joi.object({

  // Port to server the web UI to
  webPort: Joi.number().integer().min(1024).max(65535).default(6969).optional(),

  // Port to serve the websocket connections over
  wsPort: Joi.number().integer().min(1024).max(65535).default(16969).optional(),

  // If true, don't reload the web UI HTML file for each request
  cacheUIHTMLFile: Joi.boolean().default(false).optional(),

  // Default admin username and password
  adminUsername: Joi.string().default("admin").optional(),
  adminPassword: Joi.string().default("password").optional()

}).unknown(true); // Ignore unknown keys

export default configSchema;
