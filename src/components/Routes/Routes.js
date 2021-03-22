import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../common/PrivateRoute';
import NotFound from '../common/notfound'
import Preloader from '../../Preloader';
import ErrorBoundary from '../../ErrorBoundary'
// import Landing from '../App/Landing';
// import Login from '../App/Auth';
// import Signup from '../App/Regist';
// import ConfirmPage from '../App/Regist/ConfirmPage';
// import Dashboard from '../App/Dashboard';
// import IndexProduct from '../App/transaction/indexProduct';
// import IndexRedeem from '../App/transaction/redeem/indexRedeem';
// import IndexCart from '../App/transaction/indexCart';
// import IndexCheckout from '../App/transaction/indexCheckout';
// import IndexInvoice from '../App/transaction/indexInvoice';
// import AddMember from '../App/Member/AddMember';
// import IndexDeposit from '../App/wallet/indexDeposit';
// import IndexPenarikan from '../App/wallet/indexPenarikan';
// import IndexTransfer from '../App/wallet/indexTransfer';
// import IndexAlamat from '../App/Member/Alamat/indexAlamat';
// import IndexBank from '../App/Member/bank/indexBank';
// import Binary from '../App/Member/Binary';
// import Sponsor from '../App/Member/Sponsor';
// import Testt from '../App/Masterdata/test';
// import RiwayatTransaksi from '../App/transaction/riwayat'
// import RiwayatPPOB from '../App/Report/PPOB'
// import ReportDeposit from '../App/Report/Deposit'
// import ReportPembelian from '../App/Report/Pembelian'
// import Berita from '../App/Konten/Berita'
// import BeritaDetail from '../App/Konten/BeritaDetail'
// import Testimoni from '../App/Konten/Testimoni'
// import TestimoniDetail from '../App/Konten/TestimoniDetail'
// import StokistAktivasi from '../App/Stokist/PinAktivasi'
// import StokistRo from '../App/Stokist/PinRo'
// // import Stokist from '../App/Report/Pin'
// import IndexPPOB from '../App/PPOB/indexPPOB'
// import DetailPPOB from '../App/PPOB/detailPPOB'
// import TempPasca from '../App/PPOB/temp_pasca'
// import TempPra from '../App/PPOB/temp_pra'
// import PulsaAll from '../App/PPOB/PulsaAll'
// import PaketData from '../App/PPOB/PaketData';
// import PulsaSmsTelp from '../App/PPOB/PulsaSmsTelp';
// import EToll from '../App/PPOB/EToll';
// import VoucherWifiid from '../App/PPOB/VoucherWifiid';
// import EMoney from '../App/PPOB/EMoney';
// import TrxPln from '../App/PPOB/TrxPln';
// import TrxPdam from '../App/PPOB/TrxPdam';
// import TrxTelpKabel from '../App/PPOB/TrxTelpKabel';
// import TrxTelpPasca from '../App/PPOB/TrxTelpPasca';
// import TrxBpjs from '../App/PPOB/TrxBpjs';
// import TrxZakat from '../App/PPOB/TrxZakat';
// import indexProfile from '../App/Member/Profile/indexProfile';
// import Rekapitulasi from '../App/Member/Rekapitulasi';
// import PagesSpace from '../App/Landing/pages';
// import PenarikanReport from '../App/Report/Wallet/reportPenarikan';
// import DepositReport from '../App/Report/Wallet/reportDeposit';
// import ReportRedeem from '../App/Report/Redeem';
// import ReportReward from '../App/Report/Reward';
// import webviewBinary from '../App/webview/Binary';
// import webviewSponsor from '../App/webview/Sponsor';
// import webviewRegister from '../App/webview/AddMember';

const Landing = React.lazy(() => import('../App/Landing'));
const Login = React.lazy(() => import('../App/Auth'));
const Signup = React.lazy(() => import('../App/Regist'));
const ConfirmPage = React.lazy(() => import('../App/Regist/ConfirmPage'));
const Dashboard = React.lazy(() => import('../App/Dashboard'));
const IndexProduct = React.lazy(() => import('../App/transaction/indexProduct'));
const IndexRedeem = React.lazy(() => import('../App/transaction/redeem/indexRedeem'));
const IndexCart = React.lazy(() => import('../App/transaction/indexCart'));
const IndexCheckout = React.lazy(() => import('../App/transaction/indexCheckout'));
const IndexInvoice = React.lazy(() => import('../App/transaction/indexInvoice'));
const AddMember = React.lazy(() => import('../App/Member/AddMember'));
const IndexDeposit = React.lazy(() => import('../App/wallet/indexDeposit'));
const IndexPenarikan = React.lazy(() => import('../App/wallet/indexPenarikan'));
const IndexTransfer = React.lazy(() => import('../App/wallet/indexTransfer'));
const IndexAlamat = React.lazy(() => import('../App/Member/Alamat/indexAlamat'));
const IndexBank = React.lazy(() => import('../App/Member/bank/indexBank'));
const Binary = React.lazy(() => import('../App/Member/Binary'));
const Sponsor = React.lazy(() => import('../App/Member/Sponsor'));
const Testt = React.lazy(() => import('../App/Masterdata/test'));
const RiwayatTransaksi = React.lazy(() => import('../App/transaction/riwayat'));
const RiwayatPPOB = React.lazy(() => import('../App/Report/PPOB'));
const ReportDeposit = React.lazy(() => import('../App/Report/Deposit'));
const ReportPembelian = React.lazy(() => import('../App/Report/Pembelian'));
const Berita = React.lazy(() => import('../App/Konten/Berita'));
const BeritaDetail = React.lazy(() => import('../App/Konten/BeritaDetail'));
const Testimoni = React.lazy(() => import('../App/Konten/Testimoni'));
const TestimoniDetail = React.lazy(() => import('../App/Konten/TestimoniDetail'));
const StokistAktivasi = React.lazy(() => import('../App/Stokist/PinAktivasi'));
const StokistRo = React.lazy(() => import('../App/Stokist/PinRo'));
const IndexPPOB = React.lazy(() => import('../App/PPOB/indexPPOB'));
const DetailPPOB = React.lazy(() => import('../App/PPOB/detailPPOB'));
const TempPasca = React.lazy(() => import('../App/PPOB/temp_pasca'));
const TempPra = React.lazy(() => import('../App/PPOB/temp_pra'));
const PulsaAll = React.lazy(() => import('../App/PPOB/PulsaAll'));
const PaketData = React.lazy(() => import('../App/PPOB/PaketData'));
const PulsaSmsTelp = React.lazy(() => import('../App/PPOB/PulsaSmsTelp'));
const EToll = React.lazy(() => import('../App/PPOB/EToll'));
const VoucherWifiid = React.lazy(() => import('../App/PPOB/VoucherWifiid'));
const EMoney = React.lazy(() => import('../App/PPOB/EMoney'));
const TrxPln = React.lazy(() => import('../App/PPOB/TrxPln'));
const TrxPdam = React.lazy(() => import('../App/PPOB/TrxPdam'));
const TrxTelpKabel = React.lazy(() => import('../App/PPOB/TrxTelpKabel'));
const TrxTelpPasca = React.lazy(() => import('../App/PPOB/TrxTelpPasca'));
const TrxBpjs = React.lazy(() => import('../App/PPOB/TrxBpjs'));
const TrxZakat = React.lazy(() => import('../App/PPOB/TrxZakat'));
const indexProfile = React.lazy(() => import('../App/Member/Profile/indexProfile'));
const Rekapitulasi = React.lazy(() => import('../App/Member/Rekapitulasi'));
const PagesSpace = React.lazy(() => import('../App/Landing/pages'));
const PenarikanReport = React.lazy(() => import('../App/Report/Wallet/reportPenarikan'));
const DepositReport = React.lazy(() => import('../App/Report/Wallet/reportDeposit'));
const ReportRedeem = React.lazy(() => import('../App/Report/Redeem'));
const ReportReward = React.lazy(() => import('../App/Report/Reward'));
const webviewBinary = React.lazy(() => import('../App/webview/Binary'));
const webviewSponsor = React.lazy(() => import('../App/webview/Sponsor'));
const webviewRegister = React.lazy(() => import('../App/webview/AddMember'));

const Routes = (
    <div>
        <ErrorBoundary>
        <Suspense fallback={<Preloader/>}>
        <Switch>
            <Route path="/" exact strict component={Landing} />
            <Route path="/privacy-policy" exact strict component={PagesSpace} />
            <Route path="/terms-and-condition" exact strict component={PagesSpace} />
            <Route path="/login" exact strict component={Login} />
            <Route path="/signup" exact strict component={Signup} />
            <Route path="/confirm" exact strict component={ConfirmPage} />
            <Route path="/web_view/binary/:id" exact strict component={webviewBinary} />
            <Route path="/web_view/sponsor/:id" exact strict component={webviewSponsor} />
            <Route path="/web_view/regist/:id" exact strict component={webviewRegister} />

            <PrivateRoute path="/profile" exact strict component={indexProfile} />
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
            <PrivateRoute path="/ppob/pascabayar/:kategori/:code" exact strict component={TempPasca} />
            <PrivateRoute path="/ppob/prabayar/:kategori/:code" exact strict component={TempPra} />
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
            {/* REPORT WALLET SECTION START */}
            <PrivateRoute path="/report/wallet/deposit" exact strict component={DepositReport} />
            <PrivateRoute path="/report/wallet/penarikan" exact strict component={PenarikanReport} />
            <PrivateRoute path="/report/wallet/transfer" exact strict component={IndexTransfer} />
            <PrivateRoute path="/report/redeem" exact strict component={ReportRedeem} />
            <PrivateRoute path="/report/reward" exact strict component={ReportReward} />
            {/* REPORT WALLET SECTION END */}
            <PrivateRoute path="/report/deposit" exact strict component={ReportDeposit} />
            <PrivateRoute path="/report/pembelian" exact strict component={ReportPembelian} />
            {/* REPORT SECTION END */}
            {/* KONTEN SECTION START */}
            <PrivateRoute path="/konten/berita" exact strict component={Berita} />
            <PrivateRoute path="/konten/berita/:id" exact strict component={BeritaDetail} />
            <PrivateRoute path="/konten/testimoni" exact strict component={Testimoni} />
            <PrivateRoute path="/konten/testimoni/:id" exact strict component={TestimoniDetail} />
            {/* KONTEN SECTION END */}
            <PrivateRoute path="/report/riwayat" exact strict component={RiwayatTransaksi} />
            <PrivateRoute path="/report/ppob" exact strict component={RiwayatPPOB} />



            <PrivateRoute path="/downline/add" exact strict component={AddMember} />

            <Route component={NotFound}/>

        </Switch>
        </Suspense>
        </ErrorBoundary>
    </div>
)

export default Routes;