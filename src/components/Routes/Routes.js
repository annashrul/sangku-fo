import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../common/PrivateRoute';
import NotFound from '../common/notfound'

import Login from '../App/Auth/Login/Landing';
import LoginProcess from '../App/Auth/Login/Login';
import Dashboard from '../App/Member/Dashboard/Dashboard';
import AddMember from '../App/Member/AddMember';
import Test from '../App/Masterdata/user';
import Testt from '../App/Masterdata/test';

const Routes = (
    <div>
        <Switch>
            <Route path="/login" exact strict component={Login} />
            <Route path="/login/process" exact strict component={LoginProcess} />

            <PrivateRoute path="/test" exact strict component={Test} />
            <PrivateRoute path="/testt" exact strict component={Testt} />
           
            {/* DASHBOARD SECTION START */}
            <PrivateRoute path="/" exact strict component={Dashboard} />
            {/* DASHBOARD SECTION END */}

            <PrivateRoute path="/member/add" exact strict component={AddMember} />

            <Route component={NotFound}/>

        </Switch>
    </div>
)

export default Routes;