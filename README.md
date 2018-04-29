## Technology stack

- KeystoneJS CMS
- React.js
- MongoDB

## Installation

1. Install MongoDB and Run

	```bash
	brew install mongodb

	sudo mkdir -p /data/db

	sudo chown -R `id -un` /data/db

	mongodb
	```

2. Install yo and generator-keystone npm pacakge

	```bash
	npm install -g yo

	npm install -g generator-keystone

	mkdir brighteyes

	cd brighteyes
	```

3. Create new keystone based CMS project

	```bash
	yo keystone
	```

## Reference

http://keystonejs.com/docs/

https://www.youtube.com/watch?v=DPXDFeUEk3g

https://itnext.io/building-a-node-cms-with-keystonejs-mongo-db-react-and-redux-part-i-ae5958496df2

https://itnext.io/building-a-node-cms-with-keystonejs-mongo-db-react-and-redux-part-ii-842a85ebd9f7

https://itnext.io/building-a-node-cms-with-keystonejs-mongo-db-react-and-redux-part-iii-4c8b991cc3f
