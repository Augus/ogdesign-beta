var keystone = require(__base + 'keystone_custom');
var async = require('async');

exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = 'qa';
    locals.data = {
    	questions : []
    };

    view.on('init', function(next) {
		var q = keystone.list('Question').model.find()
			.sort('sortOrder')
		.exec(function(err, questions) {
			locals.data.questions = questions;
			next(err);
		});
		
	});

    view.render('qa');
};
