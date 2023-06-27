var express = require('express');
var controllers = require('./controllers.ts')

const app = express();
const port = 3000;
app.use(express.json());

app.get('/activities', controllers.getActivities);

app.post('/postActivityName', controllers.postActivityName)

app.listen(port, () => {
  console.log(`Now listening to portER ROBINSON ${port}`)
});
