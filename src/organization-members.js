import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Link } from 'react-router-dom';

const QUERY_ORGANIZATION_MEMBERS = gql `
    query organizationMembers {
        members {
            id
            first_name
            last_name
            email
            organization_id
            position_id
        }
    }
`;


const OrganizationMembers = () => (
    <Query query={QUERY_ORGANIZATION_MEMBERS} >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            
            const { members } = data;

            return (
                <ul>
                    {members.map(member => (
                        <li key={member.id}>
                            <Link to={`/member/${member.id}`}>{member.first_name} {member.last_name}</Link>
                        </li>
                    ))}
                </ul>
            );
        }}
    </Query>
);

export default OrganizationMembers;
