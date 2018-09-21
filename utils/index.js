module.exports = {

	range : (start = 0, end = 1) =>
		Array.from(
			{ length: (end - start + 1) },
			(v, i) => i + 1
		),

	path : obj =>
		path =>
			path.reduce((result, segment) => result && result[segment], obj)

};