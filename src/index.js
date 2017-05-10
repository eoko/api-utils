const Middlewares = {};
const Handlers    = {};
const Utils       = {};

Middlewares.joiSchemaValidation = require('./middlewares/joiSchemaValidation');
Middlewares.ajvSchemaValidation = require('./middlewares/ajvSchemaValidation');
Middlewares.adminOnly           = require('./middlewares/adminOnly');
Middlewares.userOnly            = require('./middlewares/userOnly');
Middlewares.currentOrganization = require('./middlewares/currentOrganization');
Middlewares.organizationAccess  = require('./middlewares/organizationAccess');

Handlers.groupParser = require('./handlers/groupParser');
Handlers.authParser  = require('./handlers/authParser');

Utils.renderTemplate             = require('./utils/render');
Utils.assertJsonSchemaValidation = require('./utils/assertJsonSchema');

exports.Handlers    = Handlers;
exports.Middlewares = Middlewares;
exports.Utils       = Utils;
