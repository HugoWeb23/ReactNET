import { User } from 'discord.js';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { CreateUser } from './components/User/CreateUser';
import { EditUser } from './components/User/EditUser';
const AllUsers = lazy(() => import('./components/AllUsers'))

export const App = () => {
    return (
        <Router>
        <Navigation>
        <Suspense fallback={<div>Loading...</div>}>
        <Route exact path='/newuser' component={CreateUser}/>
        <Route exact path='/edituser/:id' component={EditUser}/>
        <Route exact path='/' component={AllUsers} />
        </Suspense>
        </Navigation>
        </Router>
    );
  }
