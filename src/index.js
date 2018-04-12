import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { BrowserRouter as Router } from 'react-router-dom'


const client = new ApolloClient({uri: "http://localhost:4000/graphql"});

const ApolloApp = () => (
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>
);

ReactDOM.render(
	<ApolloApp />, 
	document.getElementById('root')
);
registerServiceWorker();
