const express = require('express');
const app = express();
global.__root = __dirname + '/';

const bodyParser = require('body-parser');

// body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/api', function(req, res) {
    res.status(200).send('API works.');
});

// routes
app.use('/api/users', require(__root + 'user/UserController'));
app.use('/api/tweet', require(__root + 'tweet/TweetRoute'))

// const AuthController = require(__root + 'auth/AuthController')(db, app);
// app.use('/api/auth', AuthController);

// starting server
const port = process.env.PORT || 5000
app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});

// module.exports = app;