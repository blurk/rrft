import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import DetailsScreen from './screens/DetailsScreen';
import HomeScreen from './screens/HomeScreen';

export default function App() {
	return (
		<Router>
			<div>
				<Header />
				{/* SWITCH */}
				<Switch>
					<Route path='/posts/:id' exact>
						<DetailsScreen />
					</Route>
					<Route path='/'>
						<HomeScreen />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
