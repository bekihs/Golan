import React from 'react';
import ReactDom from 'react-dom';
import routes from './routes.js';
import Master from './components/Master.jsx';
import {renderRoutes } from 'react-router-config'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as serviceWorker from './serviceWorker';
import userStore from './store/userStore';
import entitiesStore from './store/entitiesStore';
import { Provider } from 'mobx-react';

ReactDom.render((
    
  <MuiThemeProvider muiTheme={getMuiTheme()}>
  <BrowserRouter>
  <Provider userStore={userStore} entitiesStore={entitiesStore}>
  <div>
  <Master></Master>
   {routes.childRoutes.map((route) => {
        console.log(route);
        return <Route key={route.path} {...route}/>
    })}  </div></Provider>
    </BrowserRouter></MuiThemeProvider>
), document.getElementById('root'));

serviceWorker.unregister();
