import axios from "axios"
import Swal from "sweetalert2";
import {REKAPITULASI, HEADERS} from "../_constants";
import {store} from "components/model/app.model";


export function setLoading(load) {
    return {
        type: REKAPITULASI.LOADING,
        load
    }
}

export function setData(data = []) {
    return {
        type: REKAPITULASI.SUCCESS,
        data
    }
}

export const FetchRekapitulasi = (where) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'member/rekapitulasi_daily';
        if(where){
            url+=`?${where}`;
        }
        Swal.fire({
            allowOutsideClick:false,
            title: 'Tunggu sebentar.',
            html: 'Sedang mengambil data..',
            onBeforeOpen: () => {
                Swal.showLoading()
            },
            onClose: () => {}
        })
        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
                let tgl = new URL(HEADERS.URL+url).searchParams.get("tgl");
                let obj = {
                    "id": tgl,
                    "badge": data.result.badge,
                    "balance_kanan": data.result.balance_kanan,
                    "balance_kiri": data.result.balance_kiri,
                    "hak_bonus": data.result.hak_bonus,
                    "membership": data.result.membership,
                    "nominal_bonus": data.result.nominal_bonus,
                    "pairing_bonus": data.result.pairing_bonus,
                    "pertumbuhan_kanan": data.result.pertumbuhan_kanan,
                    "pertumbuhan_kiri": data.result.pertumbuhan_kiri,
                    "sisa_plafon": data.result.sisa_plafon,
                    "tabungan_kanan": data.result.tabungan_kanan,
                    "tabungan_kiri": data.result.tabungan_kiri,
                };
                store('rekapitulasi', obj)
                dispatch(setData(data));
                dispatch(setLoading(false));
                Swal.close()
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
