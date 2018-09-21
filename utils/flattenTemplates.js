const last = list => list[list.length - 1];

module.exports = arch =>
(function _internal(arch, results) {
	return arch.reduce((acc, curr) => {

		if (curr.type === 'file') {
				const id =
					last(curr.path.split('/'))
					.replace('.template.json', '');
				acc[id] = curr.contents;
		} else if (curr.type === 'dir') {
				_internal(curr.contents, acc);
		}

			return acc;

		}, results)
	})(arch, {});
