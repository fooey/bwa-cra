
const defaultOptions = {
	watchQuery: {
		fetchPolicy: 'cache-and-network',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'cache-network-only',
		errorPolicy: 'all',
	},
	mutate: {
		errorPolicy: 'all',
	},
};

export default defaultOptions;
