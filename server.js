var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    app = express();

/* Log all requests */
app.use(morgan('combined'));

/* Log all body requests */
app.use(bodyParser.urlencoded({
    extended: true
}));

/* Base route */
app.use('/', express.static(__dirname + '/build'));

/* Start the server */
app.listen(3000, function() {
    console.log('Server running on port 3000')
});
