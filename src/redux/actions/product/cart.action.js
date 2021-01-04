import axios from "axios"
import Swal from "sweetalert2";
import {CART, HEADERS, NOTIF_ALERT} from "../_constants";
import {ToastQ} from "helper";

export function setLoading(load) {
    return {
        type: CART.LOADING,
        load
    }
}

export function setLoadingDetail(load) {
    return {
        type: CART.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: CART.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: CART.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: CART.SUCCESS,
        data
    }
}

export function setDataDetail(data = []) {
    return {
        type: CART.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: CART.FAILED,
        data
    }
}

export const getCart = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'transaction/cart';
        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
                localStorage.setItem("totCart",`${data.result.length}`);
                dispatch(setData(data));
                dispatch(setLoading(false));
            })
            .catch(function (error) {
                dispatch(setLoading(false));
                if (error.message === 'Network Error') {
                    Swal.fire(
                        'Network Failed!.',
                        'Please check your connection',
                        'error'
                    );
                }
            })

    }
};

export const postCart = (data,param="") => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        dispatch(setIsError(false));
        const url = HEADERS.URL + `transaction/cart`;
        axios.post(url,data)
            .then(function (response) {
                const data = (response.data);
                if (data.status === 'success') {
                    if(param!=="") ToastQ.fire({icon:'success',title:`berhasil dimasukan kedalam keranjang`});
                    dispatch(setIsError(true));

                    dispatch(getCart('page=1'));
                } else {
                    ToastQ.fire({icon:'danger',title:`gagal dimasukan kedalam keranjang`});
                    dispatch(setIsError(false));
                }
                dispatch(setLoadingPost(false));


            })
            .catch(function (error) {
                dispatch(setLoadingPost(false));
                dispatch(setIsError(false));
                if (error.message === 'Network Error') {
                    Swal.fire(
                        'Network Failed!.',
                        'Please check your connection',
                        'error'
                    );
                }
                else{
                    Swal.fire({
                        title: 'failed',
                        icon: 'error',
                        text: error.response.data.msg,
                    });

                    if (error.response) {

                    }
                }

            })
    }
}

export const deleteCart = (id) => async dispatch =>{
    Swal.fire({
        title: 'Please Wait.',
        html: NOTIF_ALERT.CHECKING,
        onBeforeOpen: () => {
            Swal.showLoading()
        },
        onClose: () => {}
    })

    axios.delete(HEADERS.URL+`transaction/cart/${id}`)
        .then(response=>{
            setTimeout(
                function () {
                    Swal.close() ;
                    const data = (response.data);
                    if (data.status === 'success') {
                        Swal.fire({
                            title: 'Success',
                            icon: 'success',
                            text: NOTIF_ALERT.SUCCESS,
                        });
                    } else {
                        Swal.fire({
                            title: 'failed',
                            icon: 'error',
                            text: NOTIF_ALERT.FAILED,
                        });
                    }
                    dispatch(setLoading(false));
                    dispatch(getCart());
                },800)

        }).catch(error =>{
        Swal.close()
        dispatch(setLoading(false));
        if (error.message === 'Network Error') {
            Swal.fire(
                'Network Failed!.',
                'Please check your connection',
                'error'
            );
        }
        else {
            Swal.fire({
                title: 'failed',
                icon: 'error',
                text: error.response.data.msg,
            });
            if (error.response) {

            }
        }

    });
}