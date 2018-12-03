import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CurrentUser from './pages/CurrentUser.jsx';
import Registration from './pages/RegistrationPage.jsx';


const routes = {
  // base component (wrapper for the whole application).
  childRoutes: [

    {
      path: '/',
      component: HomePage
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/registration',
      component: Registration
    },

    {
    path : '/profile',
    component: CurrentUser
    }
  ]
};

export default routes;