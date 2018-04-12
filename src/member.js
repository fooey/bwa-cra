import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Link } from 'react-router-dom';

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
    console.log(match)
    const { id } = match.params;
    console.log({id});
    
    return (
        <Query key={id} query={QUERY_MEMBER} variables={{ id }}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                
                const { member } = data;
                console.log('member', member);

                return (
                    <div>
                        <p><Link to={`/`}>back</Link></p>
                        <h2>{member.first_name} {member.last_name}</h2>
                        <p>{member.email}</p>
                        {/* <p>{member.id}</p> */}
                        
                        <MemberOpenTimeEntries member_id={member.id} />
                    </div>
                );
            }}
        </Query>
    )
};

export default Member;
