var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'service_category';
	locals.filters = {
		service_category: req.params.service_category
	};

	locals.data = {
		services: [],
		service_categories: [],
		serviceCount: 0
	};

	// Load all service categories
	view.on('init', function (next) {

		keystone.list('ServiceCategory').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.service_categories = results;

			// Load the counts for each category
			async.each(locals.data.service_categories, function (service_category, next) {

				keystone.list('Service').model.count().where('service_categories')
				.in([service_category.id]).exec(function (err, count) {
					service_category.serviceCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load the current service category filter
	view.on('init', function (next) {

		if (req.params.service_category) {
			keystone.list('ServiceCategory').model.findOne({ key: locals.filters.service_category })
			.exec(function (err, result) {
				locals.data.service_category = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the services
	view.on('init', function (next) {

		var q = keystone.list('Service').paginate({
							page: req.query.page || 1,
							perPage: 10,
							maxPages: 10,
							filters: {
								state: 'published',
							},
						})
						.sort('-publishedDate')
						.populate('provider service_categories');

		if (locals.data.service_categoy) {
			q.where('service_categories').in([locals.data.service_category]);
		}

		q.exec(function (err, results) {
			locals.data.services = results;
			next(err);
		});
	});

	// Render the view
	view.render('service_category');
};
