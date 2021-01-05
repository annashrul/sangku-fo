import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../common/PrivateRoute';
import NotFound from '../common/notfound'

import Landing from '../App/Auth/Login/Landing';
import LoginProcess from '../App/Auth/Login/Login';
import Dashboard from '../App/Dashboard/Dashboard';
import IndexProduct from '../App/transaction/indexProduct';
import IndexCart from '../App/transaction/indexCart';
import IndexCheckout from '../App/transaction/indexCheckout';
import IndexInvoice from '../App/transaction/indexInvoice';
import AddMember from '../App/Member/AddMember';
import IndexDeposit from '../App/wallet/deposit';
import IndexPenarikan from '../App/wallet/indexPenarikan';
import IndexTransfer from '../App/wallet/indexTransfer';
import IndexAlamat from '../App/Member/Alamat/indexAlamat';
import IndexBank from '../App/Member/bank/indexBank';
import Binary from '../App/Member/Binary';
import Sponsor from '../App/Member/Sponsor';
import Testt from '../App/Masterdata/test';
import RiwayatTransaksi from '../App/transaction/riwayat'
import ReportDeposit from '../App/Report/Deposit'
import ReportPenjualan from '../App/Report/Penjualan'

const Routes = (
    <div>
        <Switch>
            <Route path="/" exact strict component={Landing} />
            <Route path="/login" exact strict component={LoginProcess} />

            <PrivateRoute path="/binary" exact strict component={Binary} />
            <PrivateRoute path="/sponsor" exact strict component={Sponsor} />
            <PrivateRoute path="/testt" exact strict component={Testt} />
           
            {/* DASHBOARD SECTION START */}
            <PrivateRoute path="/dashboard" exact strict component={Dashboard} />
            <PrivateRoute path="/alamat" exact strict component={IndexAlamat} />
            <PrivateRoute path="/bank" exact strict component={IndexBank} />
            {/* DASHBOARD SECTION END */}
            {/* TRANSACTION SECTION START */}
            <PrivateRoute path="/product" exact strict component={IndexProduct} />
            <PrivateRoute path="/cart" exact strict component={IndexCart} />
            <PrivateRoute path="/checkout" exact strict component={IndexCheckout} />
            <PrivateRoute path="/invoice" exact strict component={IndexInvoice} />
            {/* TRANSACTION SECTION END */}
            {/* WALLET SECTION START */}
            <PrivateRoute path="/deposit" exact strict component={IndexDeposit} />
            <PrivateRoute path="/penarikan" exact strict component={IndexPenarikan} />
            <PrivateRoute path="/transfer" exact strict component={IndexTransfer} />
            {/* WALLET SECTION END */}
            {/* REPORT SECTION START */}
            <PrivateRoute path="/report/deposit" exact strict component={ReportDeposit} />
            <PrivateRoute path="/report/penjualan" exact strict component={ReportPenjualan} />
            {/* REPORT SECTION END */}
            <PrivateRoute path="/transaksi/riwayat" exact strict component={RiwayatTransaksi} />



            <PrivateRoute path="/member/add" exact strict component={AddMember} />

            <Route component={NotFound}/>

        </Switch>
    </div>
)

export default Routes;