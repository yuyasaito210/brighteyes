var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'recipe';

	// Load the galleries by sortOrder
	view.query('recipes', keystone.list('Recipe').model.find().sort('sortOrder'));

	// Render the view
	view.render('recipe');

};
