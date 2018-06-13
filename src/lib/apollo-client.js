import ApolloClient from "apollo-client";
import { BatchHttpLink } from "apollo-link-batch-http";
import { InMemoryCache } from 'apollo-cache-inmemory';

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

const link = new BatchHttpLink({
	uri: process.env.REACT_APP_GRAPHQL,
	headers: {
		'key-authorization': '9d692a9beb6b2ebf54b153982c12b32c81b81380c4fb44b5756ef6bd673702e9',
	},
	batchMax: 100,
	batchInterval: 10,
});

const cache = new InMemoryCache();

const client = new ApolloClient({ link, cache, defaultOptions });

export default client;
