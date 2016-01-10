var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates');

Metalsmith(__dirname)
    .source('src')
    .use(markdown({
        'smartypants': true,
        'gfm': true,
        'tables': true
    }))
    .use(templates('handlebars'))
    .destination('build')
    .build(function(err) {
        if (err) console.log(err);
    });
