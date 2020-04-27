import React from 'react';
import logo from './logo.svg';
import { Counter } from '../counter/Counter';

import './About.css';

export function About() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<Counter />
				<p>ocd.codes react sdk</p>
				<span>
					<span>Learn </span>
					<a className="App-link" href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
						React
					</a>
					<span>, </span>
					<a className="App-link" href="https://react.i18next.com" target="_blank" rel="noopener noreferrer">
						react-i18next
					</a>
					<span>, </span>
					<a className="App-link" href="https://material-ui.com/" target="_blank" rel="noopener noreferrer">
						Material UI
					</a>
					<span>, </span>
					<a className="App-link" href="https://jaredpalmer.com/formik/" target="_blank" rel="noopener noreferrer">
						Formik
					</a>
					<span>, </span>
					<a className="App-link" href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">
						Redux
					</a>
					<span>, </span>
					<a className="App-link" href="https://redux-toolkit.js.org/" target="_blank" rel="noopener noreferrer">
						Redux Toolkit
					</a>
					<span>, </span>
					<a className="App-link" href="https://react-redux.js.org/" target="_blank" rel="noopener noreferrer">
						React Redux
					</a>
					,<span> and </span>
					<a className="App-link" href="https://redux-saga.js.org" target="_blank" rel="noopener noreferrer">
						Redux Sagas
					</a>
				</span>
			</header>
		</div>
	);
}

export default About;
