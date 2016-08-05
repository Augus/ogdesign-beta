var keystone = require(__base + 'keystone_custom');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Init locals
	locals.section = 'blog';
	locals.filters = {
		category: req.params.category
	};
	locals.data = {
		posts: [],
		recommends: [],
		categories: [],
	};
	
	// Load all categories
	view.on('init', function(next) {
		
		keystone.list('PostCategory').model.find().sort('name').exec(function(err, results) {
			
			if (err || !results.length) {
				return next(err);
			}
			
			locals.data.categories = results;
			locals.data.categoryId = req.params.category;
			next(err);
		});
	});

	view.on('init', function(next) {

		keystone.list('PromotePost').model.find()
        	.sort('sortOrder')
	    .exec(function (err, promotes) {
	    	var postIds = promotes.map(function (p) {
	    		return p.post;
	    	});
	    	keystone.list('Post').model.find()
	    		.where('_id').in(postIds)
    			.populate('author categories')
			.exec(function (err, posts) {
				var result = [];
				postIds.forEach(function (postId) {
	                posts.forEach(function(post, index) {
	                    if (post._id.equals(postId)) {
	                        result.push(post);
	                        return;
	                    }
	                });
	            });
	            locals.data.recommends = result;
				next(err);
			});
	    });
	});
	
	// // Load the posts
	// view.on('init', function(next) {
		
	// 	var q = keystone.list('Post').paginate({
	// 			page: req.query.page || 1,
	// 			perPage: 10,
	// 			maxPages: 10
	// 		})
	// 		.where('state', 'published')
	// 		.sort('-publishedDate')
	// 		.populate('author categories');
		
	// 	if (locals.data.category) {
	// 		q.where('categories').in([locals.data.category]);
	// 	}
		
	// 	q.exec(function(err, results) {
	// 		locals.data.posts = results;
	// 		next(err);
	// 	});
		
	// });

	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.find()
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author')
			.limit('9')
		.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('blog');
	
};
