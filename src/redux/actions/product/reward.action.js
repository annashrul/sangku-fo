import axios from "axios"
import Swal from "sweetalert2";
import {REWARD, HEADERS} from "../_constants";
import {ModalToggle, ModalType} from "../modal.action";
export function setLoading(load) {
    return {
        type: REWARD.LOADING,
        load
    }
}
export function setLoadingReport(load) {
    return {
        type: REWARD.LOADING_REPORT,
        load
    }
}

export function setLoadingDetail(load) {
    return {
        type: REWARD.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: REWARD.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: REWARD.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: REWARD.SUCCESS,
        data
    }
}

export function setDataReport(data = []) {
    return {
        type: REWARD.SUCCESS_REPORT,
        data
    }
}

export function setDataDetail(data = []) {
    return {
        type: REWARD.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: REWARD.FAILED,
        data
    }
}

export const getReward = (where) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'reward/barang';
        if(where){
            url+=`?${where}`;
        }

        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
                console.log(data);
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


export const postReward = (data) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        dispatch(setIsError(false));

        const url = HEADERS.URL + `transaction/reward`;
        axios.post(url,data)
            .then(function (response) {
                const data = (response.data);
                console.log(data.status);
                if(data.status ==='success'){
                    dispatch(getReward('page=1'));
                    Swal.fire({
                        title: 'Berhasil',
                        text: "reward berhasil dilakukan",
                        icon: 'success',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Oke'
                    }).then((result) => {
                        if (result.value) {
                            dispatch(ModalType("detailReward"));
                            dispatch(ModalToggle(false));
                        }else{
                            dispatch(ModalType("detailReward"));
                            dispatch(ModalToggle(false));

                        }
                    })
                    dispatch(setIsError(false));
                }else{
                    dispatch(setIsError(true));
                    Swal.fire(
                        'Terjadi Kesalahan!.',
                        data.msg,
                        'error'
                    );
                }
                // ToastQ.fire({icon:'success',title:`reward berhasil`});
                dispatch(setLoadingPost(false));
            })
            .catch(function (error) {
                console.log("ERROR",error);
                dispatch(setLoadingPost(false));
                dispatch(setIsError(true));
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

export const getRewardReport = (page=1,where,perpage=10) => {
    return (dispatch) => {
        dispatch(setLoadingReport(true));
        let url = `transaction/reward/report?page=${page}`;
        if(where){
            url+=`${where}`;
        }

        axios.get(HEADERS.URL + `${url}&perpage=${perpage}`)
            .then(function (response) {
                const data = response.data;
                console.log(data);
                dispatch(setDataReport(data));
                dispatch(setLoadingReport(false));
            })
            .catch(function (error) {
                dispatch(setLoadingReport(false));
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