/*

Copyright (c) 2011 Noel Herrick

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


*/

// Get the external libs
var fs = require('fs');

// HTTP framework
var express = require('express');
var app = express.createServer();

// HTML layout helper
var dust = require('./node_modules/express-dust/lib/dust');

// Internal libs
var hinkModel = require('./models/hink-model');

// Call the main function
setup_app(app);

function setup_app (app){
  // Setup the application
  app.use(express.bodyParser());

  // Setup our global template
  dust.makeBase({
      copy: '&copy; 2011 Noel Herrick',
      title: 'HinkPink'
  });

  fs.readdir(__dirname + '/controllers', function(err, files) {

    if (err) throw err;

    files.forEach(function(file) {
        setup_controller(app, file);
    });
  });
};

function setup_controller (app, file) {
  var filename = file.replace('.js', ''),
      actions = require('./controllers/' + filename),
      plural = filename,
      prefix = '/' + plural;

  // App does not get a suffix
  if (filename == 'app') prefix = '/';

  Object.keys(actions).map(function (action) {
      var fn = actions[action];
      switch (action) {
      case 'index':
          app.get(prefix, fn);
          break;
      case 'show':
          app.get(prefix + '/:id', fn);
          break;
      case 'check':
          app.post(prefix + '/check', fn);
          break;
      case 'add':
          app.get(prefix + '/:id/add', fn);
          break;
      case 'create':
          app.post(prefix + '/:id', fn);
          break;
      case 'edit':
          app.get(prefix + '/:id/edit', fn);
          break;
      case 'update':
          app.put(prefix + '/:id', fn);
          break;
      case 'destroy':
          app.del(prefix + '/:id', fn);
          break;
      }
  });
}

// Start the server
app.listen(81);
