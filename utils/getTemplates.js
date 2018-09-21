const fs = require('fs');

module.exports = function getTemplates(folder) {

	const contents = fs
		.readdirSync(folder)
		.map(x => ({ path: folder + '/' + x }))
		.map(x => {

			const stat = fs.statSync(x.path);

			if(stat.isDirectory()) {
				x.type = 'dir';
				x.contents = getTemplates(x.path);
			} else if(stat.isFile()) {
				x.type = 'file';
				x.contents = fs.readFileSync(x.path, 'utf8');
			} else {
				x.type = 'unsupported';
			}

			return x;

		});

	return contents;

};
