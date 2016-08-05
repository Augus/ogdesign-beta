var keystone = require(__base + 'keystone_custom');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post
	};
	locals.data = {
		posts: [],
		recommends: []
	};
	
	// Load the current post
	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post
		}).populate('author categories');
		
		q.exec(function(err, result) {
			locals.data.post = result;
			var categories = result.categories.map(function (c) {
				return c._id;
			});

			keystone.list('Post').model.find({_id : {$ne: result._id}})
				.where('state', 'published')
				.where('categories').in(categories)
				.sort('-publishedDate')
				.populate("categories")
				.populate('author')
				.limit('3')
			.exec(function (err, recommends) {
				locals.data.recommends = recommends;
				next(err);
			})
		});
	});

	// Load other posts
	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('8');
		
		q.exec(function(err, results) {
			locals.data.posts = results;
			console.log(results);
			next(err);
		});
		
	});
	
	// Render the view
	view.render('post');
	
};
