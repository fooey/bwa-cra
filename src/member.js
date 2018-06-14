/* eslint-disable no-console */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from 'react-router-dom';

import Preloader from 'src/components/util/preloader';

import MemberOpenTimeEntries from './member-open-time-entries';

const QUERY_MEMBER = gql `
    query member($id: ID!) {
        member(id: $id) {
            id
            first_name
            last_name
            email
            organization_id
            position_id
        }
    }
`;

const Member = ({ match }) => {
	const { params, path, isExact, url } = match;
	const { id } = params;

	console.log('Member', match);
	console.log('Member', { path, url, isExact });
	console.log('Member', { id });

	return (
		<Query key={id} query={QUERY_MEMBER} variables={{ id }}>
			{({ loading, error, data }) => {
				if (loading) return <Preloader />;
				if (error) return <p>Error :(</p>;

				const { member } = data;
				console.log('member', member);

				return (
					<Fragment>
						<div>
							<Link className="btn waves-effect waves-light blue" to='/'>
								<i className="material-icons left">chevron_left</i>
								<span>Employees Listing</span>
								<i className="material-icons right">people</i>
							</Link>
						</div>
						<div className="card">
							<div className="card-content">
								<div className="card-title">{member.first_name} {member.last_name}</div>
								<p>{member.email}</p>
								{/* <p>{member.id}</p> */}
							</div>
							<div className="card-action grey lighten-4">
								<button className="btn waves-effect waves-light green" type="button">
									<i className="material-icons left">timer</i>
									<span>Clock In</span>
								</button>
								{' '}
								<button className="btn waves-effect waves-light amber" type="button">
									<i className="material-icons left">av_timer</i>
									<span>Break</span>
								</button>
								{' '}
								<button className="btn waves-effect waves-light red" type="button">
									<i className="material-icons left">timer_off</i>
									<span>Clock Out</span>
								</button>
							</div>
						</div>

						<MemberOpenTimeEntries member_id={member.id} />
					</Fragment>
				);
			}}
		</Query>
	);
};

Member.propTypes = {
	match: PropTypes.shape({
		path: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
		params: PropTypes.object,
		isExact: PropTypes.bool,
	}).isRequired,
};

export default Member;
