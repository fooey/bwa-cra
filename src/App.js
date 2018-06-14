import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from "react-apollo";

import 'src/App.scss';

import client from 'src/apollo/client';

import Navbar from 'src/components/layout/navbar';
import Home from 'src/pages/home';


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
			<Home />
		</div>
	</div>
);

export default App;
