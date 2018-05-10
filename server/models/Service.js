var keystone = require('keystone');
var Types = keystone.Field.Types;
var path = require('path');

// Create a new Keystone list called Services
var Service = new keystone.List('Service', {
	map: {name: 'name'},
	singular: 'Serivce',
	plural: 'Services',
  autokey: { path: 'slug', from: 'name', unique: true },
  defaultSort: '-createdAt',
});

Service.add ({
	name: { type: String, required: true },
	price: { type: Number },
	provider: {type: Types.Relationship, ref: 'User', index: true},
	image: { type: Types.CloudinaryImage },
	description: { type: Types.Html, wysiwyg: true, height: 400 },
	service_categoreis: { type: Types.Relationship, ref: 'ServiceCategory', many: true },
	publishedDate: { type: Date, default: Date.now }
});

Service.register();
