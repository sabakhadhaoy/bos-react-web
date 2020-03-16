import React from 'react';
import {
   BrowserRouter,
   Route,
   Switch
} from 'react-router-dom';
import Login from '../components/Login';
import NewPrendaJewelry from '../components/NewPrendaJewelry';
import Customer from '../components/Customer';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
   <BrowserRouter>
      <Switch>
         <Route path="/" component={Login} exact={true} />
         <Route path="/Customer" component={Customer} />
         <Route path="/QCL" component={NewPrendaJewelry} />
         <Route component={NotFoundPage} />
      </Switch>
   </BrowserRouter>
);

export default AppRouter;