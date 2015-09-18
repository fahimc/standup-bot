var Slack = require('./Slack');
var Standup = require('./Standup');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


Standup.init(Slack);
Slack.addCallback(Standup.onMessage.bind(Standup));

var port = process.env.PORT || 3000;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get('/', function (req, res) { res.status(200).send('Hello world!') });

app.post('/bot', Slack.onMessage.bind(Slack));

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});