import axios from "axios"
import Swal from "sweetalert2";
import {CART, HEADERS} from "../_constants";
import {ToastQ} from "helper";
// import socketIOClient from "socket.io-client";
// import Cookies from 'js-cookie'
// const socket = socketIOClient(HEADERS.URL, {
//     withCredentials: true,
//     extraHeaders: {
//         "my-custom-header": "abcd"
//     }
// });
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
                    localStorage.setItem("productType",param)
                } else {
                    ToastQ.fire({icon:'danger',title:`gagal dimasukan kedalam keranjang`});
                    dispatch(setIsError(false));
                }
                dispatch(setLoadingPost(false));
                // socket.emit('get_notif', {id_member:atob(Cookies.get('sangqu_exp'))})


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
        title: 'Silahkan tunggu..',
        html: 'Memproses permintaan anda.',
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
                        ToastQ.fire({icon:'success',title:`Produk telah dihapus.`});

                    } else {
                        ToastQ.fire({icon:'danger',title:`Produk gagal dihapus.`});
                    }
                    dispatch(setLoading(false));
                    dispatch(getCart());
                    // socket.emit('get_notif', {id_member:atob(Cookies.get('sangqu_exp'))})
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