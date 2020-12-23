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


export default combineReducers({
    modalReducer,
    modalTypeReducer,
    dashboardReducer,
    siteReducer,
    productReducer,
    paketReducer,
    cartReducer,
    pinReducer,
    auth: authReducer,
    errors : errorsReducer
});