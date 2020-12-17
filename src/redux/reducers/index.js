import { combineReducers } from 'redux';
import { modalReducer, modalTypeReducer } from './modal.reducer';
import { dashboardReducer } from './dashboard/dashboard.reducer'
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import {siteReducer} from './site.reducer';


export default combineReducers({
    modalReducer,
    modalTypeReducer,
    dashboardReducer,
    siteReducer,
    
    auth: authReducer,
    errors : errorsReducer
});