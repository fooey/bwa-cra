import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Preloader from 'src/components/util/preloader';

import Organization from 'src/organization';

const QUERY_AUTHENTICATION = gql`
{
	authentication @client {
		isAuthenticated
		authenticatedAt
		keyAuthorization
		organizationId
		memberId
	}
}
`;

const Home = () => (
	<Query query={QUERY_AUTHENTICATION}>
		{({ loading, error, data }) => {
			console.log('Home', { loading, error, data });

			if (loading) return <Preloader />;
			if (error) return <div>Error :( <pre>{JSON.stringify(error, null, '\t')}</pre></div>;

			const { authentication } = data;

			console.log('Home', {authentication});

			return (
				<Fragment>
					<LoggedIn />
					<pre>{JSON.stringify(authentication)}</pre>
				</Fragment>
			);
		}}
	</Query>
);

const LoggedIn = () => (
	<Organization />
);


export default Home;
