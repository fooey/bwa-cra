const authentication = {
	isAuthenticated: false,
	authenticatedAt: null,
	keyAuthorization: null,
	organizationId: null,
	memberId: null,
};

const resolvers = {
	authentication: (obj, args, context, info) => {
		console.log('authentication', { obj, args, context, info });
		console.log('authentication', { authentication });

		return authentication;
	},
};


export default {
	defaultState: {
		authentication,
	},
	resolvers,
};
