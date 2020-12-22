import { combineReducers } from 'redux';
import { modalReducer, modalTypeReducer } from './modal.reducer';
import { dashboardReducer } from './dashboard/dashboard.reducer'
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import {siteReducer} from './site.reducer';
import {productReducer} from "./product/product.reducer";
import {paketReducer} from "./product/paket.reducer";
import {cartReducer} from "./product/cart.reducer";
import {checkoutReducer} from "./product/checkout.reducer";
import {alamatReducer} from "./member/alamat.reducer";
import {provinsiReducer} from "./member/provinsi.reducer";
import {kotaReducer} from "./member/kota.reducer";
import {kecamatanReducer} from "./member/kecamatan.reducer";
import {kurirReducer} from "./member/kurir.reducer";
import {ongkirReducer} from "./product/ongkir.reducer";
import {bankReducer} from "./member/bank.reducer";


export default combineReducers({
    modalReducer,
    modalTypeReducer,
    dashboardReducer,
    siteReducer,
    productReducer,
    paketReducer,
    bankReducer,
    cartReducer,
    checkoutReducer,
    alamatReducer,
    kurirReducer,
    ongkirReducer,
    provinsiReducer,
    kotaReducer,
    kecamatanReducer,
    auth: authReducer,
    errors : errorsReducer
});