var express = require('express');
var controllers = require('./controllers.ts');
var jwt = require('./middleware/jwt.ts');

const app = express();
const port = 3000;
app.use(express.json());

app.get('/activities', jwt.verifyToken, controllers.getActivities);

app.post('/postActivityName', controllers.postActivityName);

app.post('/postNote', controllers.postNote);

app.patch('/updateNote', controllers.updateNote);

app.delete('/deleteActivity', controllers.deleteActivity);

app.post('/signUp', controllers.signUp);

app.post('/login', controllers.login);

app.get('/confirm', controllers.confirmAccount);

app.get('/getUserInfo', controllers.getUserInfo);

app.patch('/saveProfileEdits', controllers.saveProfileEdits);

app.listen(port, () => {
  console.log(`Now listening to portER ROBINSON ${port}`)
});