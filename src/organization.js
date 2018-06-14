/* eslint-disable no-console */

import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Route } from 'react-router-dom';

import OrganizationMembers from './organization-members';
import Member from './member';

import Preloader from 'src/components/util/preloader';

const QUERY_ORGANIZATION = gql `
query organization {
	organization {
		id
		organization_name
		owned_by
		updated_on
		created_on
		submitted_on
		deleted_on
	}
}
`;

const Organization = () => (
	<Query query={QUERY_ORGANIZATION}>
		{({ loading, error, data }) => {
			console.log('Organization', { loading, error, data });

			if (loading) return <Preloader />;
			if (error) return <p>Error :(</p>;

			const { organization } = data;

			console.log(organization);

			return (
				<div>
					<h1>{organization.organization_name}</h1>
					{/* <h2>{organization.id}</h2> */}

					<Route component={OrganizationMembers} exact path="/" />
					<Route component={Member} exact path="/member/:id" />
				</div>
			);
		}}
	</Query>
);

export default Organization;
