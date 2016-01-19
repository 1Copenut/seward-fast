var Metalsmith = require('metalsmith'),
    collections = require('metalsmith-collections'),
    pagination = require('metalsmith-pagination'),
    markdown = require('metalsmith-markdown'),
    permalinks = require('metalsmith-permalinks'),
    templates = require('metalsmith-templates'),
    Handlebars = require('handlebars'),
    fs = require('fs');

/* Add Handlebars partials */
Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());
Handlebars.registerPartial('navigation', fs.readFileSync(__dirname + '/templates/partials/navigation.hbt').toString());
Handlebars.registerPartial('blogHeader', fs.readFileSync(__dirname + '/templates/partials/blogHeader.hbt').toString());
Handlebars.registerPartial('blogPagination', fs.readFileSync(__dirname + '/templates/partials/blogPagination.hbt').toString());

/* Metalsmith build plugins */
Metalsmith(__dirname)
    .source('src')
    .use(collections({
        articles: {
            pattern: 'articles/**/*.md',
            sortBy: 'date',
            reverse: true
        },
        pages: {
            pattern: 'pages/**/*.md'
        }
    }))
    .use(pagination({
        'collections.articles': {
            'perPage': 2,
            'template': 'pages/blog.hbt',
            'first': 'articles/index.html',
            'path': 'articles/:num/index.html',
            'noPageOne': true
        }
    }))
    .use(markdown({
        'smartypants': true,
        'gfm': true,
        'tables': true
    }))
    .use(permalinks({
        relative: false,
        pattern: 'articles/:date/:title',
        date: 'YYYY/MM/DD'
    }))
    .use(templates('handlebars'))
    .destination('build')
    .build(function(err) {
        if (err) console.log(err);
    });

