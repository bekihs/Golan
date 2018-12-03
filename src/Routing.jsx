import React from 'react';
import ReactDom from 'react-dom';
import routes from './routes.js';
import {BrowserRouter, Route, Link} from 'react-router-dom'


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = (props) => (
  <div>
    <Route path={`${props.match.url}/:topicId`} component={Topic}/>
    <h2>{props.match.url}</h2>
    <ul>
      <li>
        <Link to={`${props.match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${props.match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${props.match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route exact path={props.match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const routes = {
  // base component (wrapper for the whole application).
  childRoutes: [

    {
      path: '/',
      exact:true,
      component: Home
    },

    {
      path: '/about',
      component: About
    },

    {
      path: '/topics',
      component: Topics
    }

  ]
};

const App = () => (
  <BrowserRouter childRoutes={routes.childRoutes}>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>
    {routes.childRoutes.map((route) => {
        console.log(route);
        return <Route key={route.path} {...route}/>
    })}
    </div>
  </BrowserRouter>
)

ReactDom.render((
  < App/>
), document.getElementById('react-app'));