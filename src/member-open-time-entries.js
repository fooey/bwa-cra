import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";



const QUERY_MEMBER_OPEN_TIME_ENTRIES = gql `
    query openTimeEntries($member_id: ID!) {
        timeEntries: openTimeEntries(member_id: $member_id) {
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
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                
                const { timeEntries } = data;
                console.log('timeEntries', timeEntries);
                
                return timeEntries.length ? (timeEntries.map(timeEntry => (
                    <dl>
                        <dt>start_time</dt><dd>{timeEntry.start_time}</dd>
                        <dt>end_time</dt><dd>{timeEntry.end_time}</dd>
                        <dt>cost_code_id</dt><dd>{timeEntry.cost_code_id}</dd>
                        
                        <dt>project</dt><dd>{timeEntry.project_id ? <Project id={timeEntry.project_id} /> : 'none'}</dd>
                    </dl>
                ))) : (
                    <p>No open time entries</p>
                );
            }}
        </Query>
    )
};


const Project = ({ id }) => {    
    return (
        <Query query={QUERY_PROJECT} variables={{ id }}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                
                const { project } = data;
                console.log('project', project);
                
                return (
                    <dl>
                        {/* <dt>id</dt><dd>{project.id}</dd> */}
                        <dt>title</dt><dd>{project.title}</dd>
                        {/* <dt>parent_project_id</dt><dd>{project.parent_project_id}</dd> */}
                        {/* <dt>root_project_id</dt><dd>{project.root_project_id}</dd> */}
                        <dt>parent_project</dt><dd>{project.parent_project_id ? <Project id={project.parent_project_id} /> : 'none'}</dd>
                        <dt>root_project</dt><dd>{project.root_project_id !== project.id ? <Project id={project.root_project_id} /> : 'none'}</dd>
                    </dl>
                );
            }}
        </Query>
    )
};

export default MemberOpenTimeEntries;
