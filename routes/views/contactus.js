var keystone = require(__base + 'keystone_custom');
var async = require('async');

exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = 'contactus';
    locals.data = {};
    view.render('contactus');
};
