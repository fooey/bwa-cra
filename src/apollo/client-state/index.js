import authentication from './authentication';


const clientStateDefaults = {
	...authentication.defaultState,
};

const resolvers = {
	Query: {
		...authentication.resolvers,
	},
};


const clientState = {
	defaults: clientStateDefaults,
	resolvers,
	// typeDefs
};

console.dir({clientState});

export default clientState;
