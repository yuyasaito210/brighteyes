var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'service';
	locals.filters = {
		service: req.params.service
	}
	local.data = {
		services: []
	}
	// // Load the galleries by sortOrder
	// view.query('services', keystone.list('Service').model.find().sort('sortOrder'));

	// Load the current service
	view.on('init', function(next){
		var q = keystone.list('Service').model.findOne({
			slug: locals.filters.service
		}).populate('provider service_categories');;

		q.exec(function(err, result){
			locals.data.service = result;
			next(err);
		});
	});

	// Load other services
	view.on('init', function (next) {

		var q = keystone.list('Service').model.find().
						where('published').sort('-publishedDate').
						populate('provider').limit('5');

		q.exec(function (err, results) {
			locals.data.services = results;
			next(err);
		});

	});

	// Render the view
	view.render('service');
};
