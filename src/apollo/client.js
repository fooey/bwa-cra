import ApolloClient from "apollo-boost";
// import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';

import cache from './cache';
import clientState from './client-state';
// import defaultOptions from './defaultOptions';
import link from './link';


// const stateLink = withClientState(clientState);

console.log({
	// cache,
	clientState,
	// defaultOptions,
	link,
	REACT_APP_GRAPHQL: process.env.REACT_APP_GRAPHQL
});


const client = new ApolloClient({
	cache,
	clientState,
	// defaultOptions,
	uri: process.env.REACT_APP_GRAPHQL,//ApolloLink.from([stateLink, link]),
});

export default client;
