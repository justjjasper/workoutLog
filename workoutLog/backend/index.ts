var express = require('express');
var controllers = require('./controllers')

const app = express();
const port = 3000;

app.get('/activities', controllers.getActivities);

app.listen(port, () => {
  console.log(`Now listening to portER ROBINSON ${port}`)
});
