import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from "react-apollo";

import './App.scss';

import client from './lib/apollo-client';

import Navbar from './components/layout/navbar';

import Organization from './organization';
//
// import Home from 'src/pages/home';
// import About from 'src/pages/about';
// import Topics from 'src/pages/topics';
// import States from 'src/pages/agencies/states';

const App = () => (
	<ApolloProvider client={client}>
		<Router>
			<Layout />
		</Router>
	</ApolloProvider>
);

const Layout = () => (
	<div className="App">
		<Navbar />
		<div className="container">
			<div className="app-body">
				<Organization />
			</div>
		</div>
	</div>
);

export default App;
