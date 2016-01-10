var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    permalinks = require('metalsmith-permalinks'),
    Handlebars = require('handlebars'),
    fs = require('fs');

// Add Handlebars partials
Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());

// Metalsmith build plugins
Metalsmith(__dirname)
    .source('src')
    .use(markdown({
        'smartypants': true,
        'gfm': true,
        'tables': true
    }))
    .use(permalinks())
    .use(templates('handlebars'))
    .destination('build')
    .build(function(err) {
        if (err) console.log(err);
    });
