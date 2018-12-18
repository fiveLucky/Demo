import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Route, Switch } from 'react-router-dom';
const DemoList = lazy(() => import('../../views/Demo'));
const Home = lazy(() => import('../../views/Home'));
import styles from '../index.less';


@withRouter
export default class Content extends Component {
	static propTypes = {
		renderChildren: PropTypes.func,
	}

	render() {
		const { path } = this.props.match;
		return (
			<div className={styles.contentContainer}>
				<Suspense fallback={'loading'}>
					<Switch>
						<Route path={`${path}`} component={Home}></Route>
						<Route path={`${path}Demo`} component={DemoList}></Route>
					</Switch>
				</Suspense>
			</div>
		);
	}
}

