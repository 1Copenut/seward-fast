var Metalsmith = require('metalsmith'),
    collections = require('metalsmith-collections'),
    drafts = require('metalsmith-drafts'),
    excerpts = require('metalsmith-excerpts'),
    fs = require('fs'),
    Handlebars = require('handlebars'),
    markdown = require('metalsmith-markdown'),
    pagination = require('metalsmith-pagination'),
    path = require('path'),
    permalinks = require('metalsmith-permalinks'),
    sass = require('metalsmith-sass'),
    templates = require('metalsmith-templates'),
    webpack = require('metalsmith-webpack');

/* Add Handlebars partials */
Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());
Handlebars.registerPartial('navigation', fs.readFileSync(__dirname + '/templates/partials/navigation.hbt').toString());
Handlebars.registerPartial('blogHeader', fs.readFileSync(__dirname + '/templates/partials/blogHeader.hbt').toString());
Handlebars.registerPartial('blogPagination', fs.readFileSync(__dirname + '/templates/partials/blogPagination.hbt').toString());

/* Add Handlebars helpers */
Handlebars.registerHelper('moment', require('helper-moment'));

/* Metalsmith build plugins */
Metalsmith(__dirname)
    .source('src/')
    .use(drafts())
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
        pattern: 'articles/:permalinkDate/:title',
        date: 'YYYY/MM/DD'
    }))
    .use(excerpts())
    .use(templates('handlebars'))
    .destination('build/')
    .use(sass({
        outputDir: 'css/',
        sourceMap: true,
        sourceMapContents: true,
        precision: 10
    }))
    .use(webpack({
        context: path.resolve(__dirname, './src/js/'),
        entry: './index.js',
        output: {
            path: __dirname,
            filename: 'bundle.js'
        },
        module: {
            loaders: [{
                test: /.js$/,
                loader: 'babel-loader'
            }]
        }
    }))
    .build(function(err) {
        if (err) console.log(err);
    });

