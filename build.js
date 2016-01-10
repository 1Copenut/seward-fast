var Metalsmith = require('metalsmith'),
    collections = require('metalsmith-collections'),
    pagination = require('metalsmith-pagination'),
    markdown = require('metalsmith-markdown'),
    permalinks = require('metalsmith-permalinks'),
    templates = require('metalsmith-templates'),
    Handlebars = require('handlebars'),
    fs = require('fs');

// Add Handlebars partials
Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());
Handlebars.registerPartial('navigation', fs.readFileSync(__dirname + '/templates/partials/navigation.hbt').toString());
Handlebars.registerPartial('blogNavigation', fs.readFileSync(__dirname + '/templates/partials/blogNavigation.hbt').toString());

// Metalsmith build plugins
Metalsmith(__dirname)
    .source('src')
    .use(permalinks())
    .use(collections({
        articles: {
            pattern: 'articles/**/*.md',
            sortBy: 'date',
            reverse: true
        },
        pages: {
            pattern: 'pages/**/*.md',
        }
    }))
    .use(pagination({
        'collections.articles': {
            perPage: 2,
            template: 'partials/blogNavigation.hbt',
            path: 'page/:num/index.html'
        }
    }))
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
