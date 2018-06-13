import React from 'react';

const NavBar = () => (
	<nav className="blue darken-4" >
		<div className="nav-wrapper container">
			<a className="brand-logo" href="/" id="logo-container">busybusy</a>
			<ul className="right hide-on-med-and-down">
				<li><a href="/">Navbar Link</a></li>
			</ul>

			<ul className="sidenav" id="nav-mobile">
				<li><a href="/">Navbar Link</a></li>
			</ul>

			<a className="sidenav-trigger" data-target="nav-mobile" href="/">
				<i className="material-icons">menu</i>
			</a>
		</div>
	</nav>
);

export default NavBar;
