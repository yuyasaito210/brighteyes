// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
  'name': 'BrightEyes',
  'brand': 'BrightEyes',

  'sass': 'server/public',
  'static': 'server/public',
  'favicon': 'server/public/favicon.ico',
  'views': 'server/templates/views',
  'view engine': '.hbs',

  'custom engine': handlebars.create({
    layoutsDir: 'server/templates/views/layouts',
    partialsDir: 'server/templates/views/partials',
    defaultLayout: 'default',
    helpers: new require('./server/templates/views/helpers')(),
    extname: '.hbs',
  }).engine,

  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
});

// Load your project's Models
keystone.import('server/models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
  _: require('lodash'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./server/routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
  posts: ['posts', 'post-categories'],
  galleries: 'galleries',
  enquiries: 'enquiries',
  users: 'users',
});

// Start Keystone to connect to your database and initialise the web server



keystone.start();
