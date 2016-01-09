var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown');

Metalsmith(__dirname)
    .source('src')
    .use(markdown({
        'smartypants': true,
        'gfm': true,
        'tables': true
    }))
    .destination('build')
    .build(function(err) {
        if (err) console.log(err);
    });
