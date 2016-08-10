var keystone = require(__base + 'keystone_custom');
var async = require('async');
var PortfolioCategory = keystone.list('PortfolioCategory');

exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = 'showcases';
    locals.data = {
		portfolios: [],
	};

	view.on('init', function(next) {
		PortfolioCategory.model.find().sort('sortOrder').exec(function(err, results) {
			if (err || !results.length) {
				return next(err);
			}
			locals.data.categories = results;
			locals.data.categoryId = req.params.slug;
			next(err);
		});
	});

	view.on('init', function(next) {
		var q = keystone.list('Portfolio').model.find()
			.sort('sortOrder')
			.limit('40');
		if (req.params.slug) {
			PortfolioCategory.model.findOne({slug: req.params.slug}).exec(function (err, category) {
				q.where("categories", category._id);
				q.exec(function(err, portfolios) {
					console.log(portfolios);
					locals.data.portfolios = portfolios || [];
					next(err);
				});
			});
		}
		else {
			q.exec(function(err, portfolios) {
				locals.data.portfolios = portfolios || [];
				next(err);
			});
		}
	});

    view.render('showcases');
};
