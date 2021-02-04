import React from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import Header from './components/Header';
import DetailsScreen from './screens/DetailsScreen';
import HomeScreen from './screens/HomeScreen';
import NotFound from './screens/NotFound';

export default function App() {
	return (
		<Router>
			<div>
				<Header />
				{/* SWITCH */}
				<Switch>
					<Route exact path='/' component={HomeScreen} />
					<Route path='/posts/:id' component={DetailsScreen} />
					<Route path='/404' component={NotFound} />
					<Redirect to='/404' />
				</Switch>
			</div>
		</Router>
	);
}
