import React from 'react';
import ReactDom from 'react-dom';
import routes from './routes.js';
import Master from './components/Master.jsx';
import {renderRoutes } from 'react-router-config'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDom.render((
    
  <MuiThemeProvider muiTheme={getMuiTheme()}>
  <BrowserRouter><div>
  <Master></Master>
   {routes.childRoutes.map((route) => {
        console.log(route);
        return <Route key={route.path} {...route}/>
    })}  </div>
    </BrowserRouter></MuiThemeProvider>
), document.getElementById('root'));