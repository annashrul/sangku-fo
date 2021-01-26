import { combineReducers } from 'redux';
import { modalReducer, modalTypeReducer } from './modal.reducer';
import { dashboardReducer } from './dashboard/dashboard.reducer'
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import {siteReducer} from './site.reducer';
import {productReducer} from "./product/product.reducer";
import {paketReducer} from "./product/paket.reducer";
import {cartReducer} from "./product/cart.reducer";
import {pinReducer} from "./pin/pin.reducer";
import {checkoutReducer} from "./product/checkout.reducer";
import {alamatReducer} from "./member/alamat.reducer";
import {provinsiReducer} from "./member/provinsi.reducer";
import {kotaReducer} from "./member/kota.reducer";
import {kecamatanReducer} from "./member/kecamatan.reducer";
import {kurirReducer} from "./member/kurir.reducer";
import {ongkirReducer} from "./product/ongkir.reducer";
import {bankReducer} from "./member/bank.reducer";
import {memberReducer} from "./member/member.reducer";
import {networkReducer} from "./member/network.reducer";
import {depositReducer} from "./member/deposit.reducer";
import {penarikanReducer} from "./member/penarikan.reducer";
import {transferReducer} from "./member/transfer.reducer";
import {bankMemberReducer} from "./member/bankMember.reducer";
import {riwayatReducer} from './transaction/riwayat.reducer';
import {pembelianReducer} from './transaction/pembelian.reducer';
import {beritaReducer} from './konten/berita.reducer';
import {testimoniReducer} from './konten/testimoni.reducer';
import {pulsa_allReducer} from './ppob/pulsa_all/pulsa_all.reducer';
import {rekapitulasiReducer} from './member/rekapitulasi.reducer';
import {redeemReducer} from "./product/redeem.reducer";


export default combineReducers({
    modalReducer,
    modalTypeReducer,
    dashboardReducer,
    siteReducer,
    productReducer,
    paketReducer,
    bankReducer,
    bankMemberReducer,
    cartReducer,
    pinReducer,
    checkoutReducer,
    alamatReducer,
    kurirReducer,
    ongkirReducer,
    redeemReducer,
    provinsiReducer,
    kotaReducer,
    kecamatanReducer,
    networkReducer,
    depositReducer,
    penarikanReducer,
    transferReducer,
    riwayatReducer,
    pembelianReducer,
    beritaReducer,
    testimoniReducer,
    pulsa_allReducer,
    memberReducer,
    rekapitulasiReducer,
    
    auth: authReducer,
    errors : errorsReducer
});