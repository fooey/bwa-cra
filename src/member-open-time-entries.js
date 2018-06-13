/* eslint-disable no-console */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";

import './member-open-time-entries.scss';
import Preloader from 'src/components/util/preloader';


const QUERY_MEMBER_OPEN_TIME_ENTRIES = gql `
	query openTimeEntries($member_id : ID !) {
		timeEntries : openTimeEntries(member_id : $member_id) {
			id
			start_time
			end_time
			project_id
			cost_code_id
			member_id
		}
	}
`;

const QUERY_PROJECT = gql `
	query project($id: ID!) {
		project(id: $id) {
		id
		title
		parent_project_id
		root_project_id
		}
	}
`;



const MemberOpenTimeEntries = ({ member_id }) => {
	return (
		<Query query={QUERY_MEMBER_OPEN_TIME_ENTRIES} variables={{ member_id }}>
			{({ loading, error, data }) => {
				if (loading) return <Preloader />;
				if (error) return <p>Error :(</p>;

				const { timeEntries } = data;
				console.log('timeEntries', timeEntries);

				return timeEntries.length
					? (<TimeEntries data={timeEntries} />)
					: (<p>No open time entries</p>);
			}}
		</Query>
	);
};

MemberOpenTimeEntries.propTypes = {
	member_id: PropTypes.string.isRequired,
};

const TimeEntries = ({ data }) => (
	<div className="card">
		<div className="card-content">
			<div className="card-title">Open Time Entry</div>
			{data.map(timeEntry => (
				<dl key={timeEntry.id} className="time-entries">
					<dt>start_time</dt>
					<dd>{timeEntry.start_time ? moment(timeEntry.start_time, 'X').format() : '-'}</dd>
					<dt>end_time</dt>
					<dd>{timeEntry.end_time ? moment(timeEntry.end_time, 'X').format() : '-'}</dd>
					<dt>cost_code_id</dt>
					<dd>{timeEntry.cost_code_id ? timeEntry.cost_code_id : '-'}</dd>

					<dt>project</dt>
					<dd className="project">{timeEntry.project_id ? <Project id={timeEntry.project_id} /> : 'none'}</dd>
				</dl>
			))}
		</div>
	</div>
);

TimeEntries.propTypes = {
	data: PropTypes.array.isRequired,
};


const Project = ({ id, depth=0 }) => {
	return (
		<Query query={QUERY_PROJECT} variables={{ id }}>
			{({ loading, error, data }) => {
				if (loading) return <div><i className="material-icons spin">autorenew</i></div>;
				if (error) return <p>Error :(</p>;

				const { project } = data;
				const nextDepth = depth + 1;

				return (
					<Fragment>
						{depth ? <div><i className="material-icons">chevron_left</i></div> : null}
						<div>{project.title}</div>
						{project.parent_project_id ? <Project depth={nextDepth} id={project.parent_project_id} /> : null}
					</Fragment>
				);
			}}
		</Query>
	);
};
// <dl>
// 	{/* <dt>id</dt><dd>{project.id}</dd> */}
// 	{/* <dt>title</dt> */}
// 	<dd>{project.title} {depth}</dd>
// 	{/* <dt>parent_project_id</dt><dd>{project.parent_project_id}</dd> */}
// 	{/* <dt>root_project_id</dt><dd>{project.root_project_id}</dd> */}
// 	{/* <dt>parent_project</dt> */}
// 	<dd>{project.parent_project_id ? <Project id={project.parent_project_id} depth={++depth} /> : null}</dd>
// 	{/* <dt>root_project</dt><dd>{project.root_project_id !== project.id ? <Project id={project.root_project_id} /> : 'none'}</dd> */}
// </dl>

Project.defaultProps = {
	depth: 0,
};

Project.propTypes = {
	depth: PropTypes.number,
	id: PropTypes.string.isRequired,
};

export default MemberOpenTimeEntries;
