import { BatchHttpLink } from "apollo-link-batch-http";

const {
	REACT_APP_GRAPHQL = 'http://jasonr.local:4000/graphql',
	NODE_ENV,
} = process.env;

console.log('NODE_ENV', NODE_ENV);
console.log('REACT_APP_GRAPHQL', REACT_APP_GRAPHQL);

const link = new BatchHttpLink({
	uri: REACT_APP_GRAPHQL,
	headers: {
		'key-authorization': '9d692a9beb6b2ebf54b153982c12b32c81b81380c4fb44b5756ef6bd673702e9',
	},
	batchMax: 100,
	batchInterval: 10,
});

export default link;
