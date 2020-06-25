import YAML from 'yamljs';
import mongoose from 'mongoose'
import SwaggerTools from 'swagger-tools';
import SwaggerExpress from 'swagger-express-mw';

var swaggerDoc = YAML.load('./dist/api/swagger/swagger.yaml');

var app = require('express')();
mongoose.connect("mongodb://localhost/my_db", {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.once('open', () => {
  console.log("we're in!")
})

SwaggerTools.initializeMiddleware(swaggerDoc, function(middleware) {
  app.use(middleware.swaggerUi());
});

SwaggerExpress.create({ appRoot: __dirname }, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 10010;
  app.listen(port, () => {
    console.log('http://127.0.0.1:' + port + '/docs');
  });
});
