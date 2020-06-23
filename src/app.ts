'use strict';

import YAML from 'yamljs';
import SwaggerTools from 'swagger-tools';
import SwaggerExpress from 'swagger-express-mw';

var swaggerDoc = YAML.load('./dist/api/swagger/swagger.yaml');

var app = require('express')();
SwaggerTools.initializeMiddleware(swaggerDoc, function(middleware) {
  app.use(middleware.swaggerUi());
});

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port, () => {
    console.log('try this:\nhttp://127.0.0.1:' + port + '/docs');
  });
});
