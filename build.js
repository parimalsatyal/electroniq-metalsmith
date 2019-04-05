var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var handlebars = require('handlebars');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Electroniq',
      description: "Electroniq is astrophysicist (and retro music enthusiast) Tara Himmels' blog."
    }
  })
  .source('./src')
  .destination('./public')
	.use(collections({
	      articles: {
	        pattern: 'articles/**/*.md',
	        sortBy: 'date',
	        reverse: true
	        },
	      }))
	.use(markdown())
	.use(permalinks({
	  relative: false,
		pattern: ':title'
	}))
	.use(layouts({
		directory: './layouts',
        	default: 'article.html',
        	suppressNoFilesError: true,
		default: 'article.html',
		pattern: ["*/*/*html","*/*html","*html"],
	  partials: {
	        header: 'partials/header',
	        footer: 'partials/footer'
	        }
	}))
	.use(serve({
	  port: 8082,
	  verbose: true
	}))
	.use(watch({
	    paths: {
	      "${source}/**/*": true,
	      "layout/**/*": "**/*",
	    }
	  }))
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Electroniq built!');
    }
  });
