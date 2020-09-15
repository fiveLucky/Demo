
import React, { Suspense, lazy, Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './style/component';
import App from './App';


const LifeCircle = lazy('./views/LifeCircle');
const DemoList = lazy('./views/Demo');
const Home = lazy('./views/Home');

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <App>
          <Suspense fallback={'loading'}>
            <Switch>
              <Route exact path={`/web`} component={Home}></Route>
              <Route path={`/web/Demo`} component={DemoList}></Route>
              <Route
                path={`/web/Demo2/lifeCircle`}
                component={LifeCircle}
              ></Route>
            </Switch>
          </Suspense>
        </App>
      </BrowserRouter>
    );
  }
}
