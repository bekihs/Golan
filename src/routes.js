import HomePage from './pages/HomePage.jsx';
import Entities from './pages/entities/Entities';
import LoginPage from './pages/LoginPage.jsx';
import CurrentUser from './pages/CurrentUser.jsx';
// import Registration from './pages/RegistrationPage.jsx';
import DeliveryPage from './pages/delivery/DeliveryPage.jsx';
import DeliverisesPage from './pages/delivery/DeliveriesPage';


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

    // {
    //   path: '/registration',
    //   component: Registration
    // },

    {
      path : '/profile',
      component: CurrentUser
      },
      {
      path : '/delivery',
      component: DeliveryPage
      },
      {
      path : '/deliveries',
      component: DeliverisesPage
      },

    {
    path : '/entities/:name',
    component: Entities
    }
  ]
};

export default routes;