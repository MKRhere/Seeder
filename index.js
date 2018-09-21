const JSONT = require('@codefeathers/jsont');

const getTemplates = require('./utils/getTemplates');
const flattenTemplates = require('./utils/flattenTemplates');
const { range, path } = require('./utils');

class Seeder {

	constructor (template, env, incrementable) {

		this.template = template;
		this.env = env;
		this.incrementable = incrementable;

	}

	static getTemplates (path) {

		return flattenTemplates(getTemplates(path));

	}

	createItem (value) {

		const generatedEnv = Object.keys(this.incrementable).reduce(
			(acc, curr) => {
				acc[curr] = this.incrementable[curr](value);
				return acc
			}, {});
	
		const newEnv = Object.assign({}, this.env, generatedEnv);
		return JSONT.toJSON(JSONT.parse(this.template, newEnv));

	}

	getSeed (from, to) {

		return range(from, to).map(x => this.createItem(x));

	}

}

module.exports = Seeder;
// module.exports.recipes = recipes;
