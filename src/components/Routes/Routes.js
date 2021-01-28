import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../common/PrivateRoute';
import NotFound from '../common/notfound'

import Landing from '../App/Landing';
import Login from '../App/Auth';
import Signup from '../App/Regist';
import ConfirmPage from '../App/Regist/ConfirmPage';
import Dashboard from '../App/Dashboard';
import IndexProduct from '../App/transaction/indexProduct';
import IndexRedeem from '../App/transaction/redeem/indexRedeem';
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
import ReportPembelian from '../App/Report/Pembelian'
import Berita from '../App/Konten/Berita'
import BeritaDetail from '../App/Konten/BeritaDetail'
import Testimoni from '../App/Konten/Testimoni'
import TestimoniDetail from '../App/Konten/TestimoniDetail'
import StokistAktivasi from '../App/Stokist/PinAktivasi'
import StokistRo from '../App/Stokist/PinRo'
// import Stokist from '../App/Report/Pin'
import IndexPPOB from '../App/PPOB/indexPPOB'
import DetailPPOB from '../App/PPOB/detailPPOB'
import PulsaAll from '../App/PPOB/PulsaAll'
import PaketData from '../App/PPOB/PaketData';
import PulsaSmsTelp from '../App/PPOB/PulsaSmsTelp';
import EToll from '../App/PPOB/EToll';
import VoucherWifiid from '../App/PPOB/VoucherWifiid';
import EMoney from '../App/PPOB/EMoney';
import TrxPln from '../App/PPOB/TrxPln';
import TrxPdam from '../App/PPOB/TrxPdam';
import TrxTelpKabel from '../App/PPOB/TrxTelpKabel';
import TrxTelpPasca from '../App/PPOB/TrxTelpPasca';
import TrxBpjs from '../App/PPOB/TrxBpjs';
import TrxZakat from '../App/PPOB/TrxZakat';
import indexProfile from '../App/Member/Profile/indexProfile';
import Rekapitulasi from '../App/Member/Rekapitulasi';
import PagesSpace from '../App/Landing/pages';

const Routes = (
    <div>
        <Switch>
            <Route path="/" exact strict component={Landing} />
            <Route path="/privacy-policy" exact strict component={PagesSpace} />
            <Route path="/terms-and-condition" exact strict component={PagesSpace} />
            <Route path="/login" exact strict component={Login} />
            <Route path="/signup" exact strict component={Signup} />
            <Route path="/profile" exact strict component={indexProfile} />
            <Route path="/confirm" exact strict component={ConfirmPage} />

            <PrivateRoute path="/binary" exact strict component={Binary} />
            <PrivateRoute path="/sponsor" exact strict component={Sponsor} />
            <PrivateRoute path="/testt" exact strict component={Testt} />
            
            <PrivateRoute path="/stokist/pin-aktivasi" exact strict component={StokistAktivasi} />
            <PrivateRoute path="/stokist/pin-ro" exact strict component={StokistRo} />
            <PrivateRoute path="/rekapitulasi" exact strict component={Rekapitulasi} />
           
            {/* DASHBOARD SECTION START */}
            <PrivateRoute path="/dashboard" exact strict component={Dashboard} />
            <PrivateRoute path="/alamat" exact strict component={IndexAlamat} />
            <PrivateRoute path="/bank" exact strict component={IndexBank} />
            {/* DASHBOARD SECTION END */}
            {/* TRANSACTION SECTION START */}
            <PrivateRoute path="/product" exact strict component={IndexProduct} />
            <PrivateRoute path="/cart" exact strict component={IndexCart} />
            <PrivateRoute path="/checkout" exact strict component={IndexCheckout} />
            <PrivateRoute path="/redeem" exact strict component={IndexRedeem} />
            <PrivateRoute path="/invoice/:kdtrx" exact strict component={IndexInvoice} />
            {/* TRANSACTION SECTION END */}
            {/* PPOB SECTION START */}
            <PrivateRoute path="/ppob" exact strict component={IndexPPOB} />
            <PrivateRoute path="/ppob/checkout/:page" exact strict component={DetailPPOB} />
            <PrivateRoute path="/ppob/pulsa-all-operator" exact strict component={PulsaAll} />
            <PrivateRoute path="/ppob/paket-data" exact strict component={PaketData} />
            <PrivateRoute path="/ppob/pulsa-sms-telpon" exact strict component={PulsaSmsTelp} />
            <PrivateRoute path="/ppob/e-toll" exact strict component={EToll} />
            <PrivateRoute path="/ppob/voucher-wifiid" exact strict component={VoucherWifiid} />
            <PrivateRoute path="/ppob/e-money" exact strict component={EMoney} />
            <PrivateRoute path="/ppob/pembayaran-pln" exact strict component={TrxPln} />
            <PrivateRoute path="/ppob/pembayaran-pdam" exact strict component={TrxPdam} />
            <PrivateRoute path="/ppob/pembayaran-telpon-kabel" exact strict component={TrxTelpKabel} />
            <PrivateRoute path="/ppob/pembayaran-telpon-pascabayar" exact strict component={TrxTelpPasca} />
            <PrivateRoute path="/ppob/pembayaran-bpjs" exact strict component={TrxBpjs} />
            <PrivateRoute path="/ppob/pembayaran-zakat" exact strict component={TrxZakat} />
            {/* PPOB SECTION END */}
            {/* WALLET SECTION START */}
            <PrivateRoute path="/deposit" exact strict component={IndexDeposit} />
            <PrivateRoute path="/penarikan" exact strict component={IndexPenarikan} />
            <PrivateRoute path="/transfer" exact strict component={IndexTransfer} />
            {/* WALLET SECTION END */}
            {/* REPORT SECTION START */}
            <PrivateRoute path="/report/deposit" exact strict component={ReportDeposit} />
            <PrivateRoute path="/report/pembelian" exact strict component={ReportPembelian} />
            {/* REPORT SECTION END */}
            {/* KONTEN SECTION START */}
            <PrivateRoute path="/konten/berita" exact strict component={Berita} />
            <PrivateRoute path="/konten/berita/:id" exact strict component={BeritaDetail} />
            <PrivateRoute path="/konten/testimoni" exact strict component={Testimoni} />
            <PrivateRoute path="/konten/testimoni/:id" exact strict component={TestimoniDetail} />
            {/* KONTEN SECTION END */}
            <PrivateRoute path="/transaksi/riwayat" exact strict component={RiwayatTransaksi} />



            <PrivateRoute path="/downline/add" exact strict component={AddMember} />

            <Route component={NotFound}/>

        </Switch>
    </div>
)

export default Routes;