/*****************
 * isLading
*****************/
export const LOADING = {
  IS_LOADING: "IS_LOADING"
}

/****************
      TOKEN
*****************/
export const TOKEN = {
  GET: "GET_TOKEN"
}

export const NOTIF_ALERT = {
    SUCCESS: "Data Berhasil Disimpan",
    FAILED: "Data Gagal Disimpan",
    CHECKING : "Pengecekan Data",
    NO_DATA: "https://www.mediseller.com/front_assets/img/search.png"
}
export const HEADERS ={
  // URL: 'http://192.168.100.10:3010/',
  URL: 'http://ptnetindo.com:6701/',
  // URL: 'https://api.sangqu.id/',
  TOKEN:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwY2RiN2M5OC0wNWNmLTQ4NDgtOGM3Yy0yZTFiYTczZGUwNmYiLCJpYXQiOjE1NzAxNzM0ODYsImV4cCI6MTU3MDc3ODI4Nn0.1NiWtt2luG83am8FJSvWpL5p35Oxd8GSJJTwhFmAdgw",
  USERNAME: "netindo",
  PASSWORD: "$2b$08$hLMU6rEvNILCMaQbthARK.iCmDRO7jNbUB8CcvyRStqsHD4UQxjDO"
}

/****************
      PASSWORD MODAL ADD LOCATION
*****************/
export const LOC_VERIF ={
  password: "bmV0aW4xMjM0YSE="
}

/****************
      MODAL
*****************/
export const MODALS = {
  IS_MODAL_OPEN: 'IS_MODAL_OPEN',
  MODAL_TYPE : 'MODAL_TYPE'
}

/****************
      AUTH
*****************/
export const AUTH = {
  LOADING: 'SET_AUTH_LOADING',
  REGISTERED: 'SET_AUTH_REGISTERED',
  IS_REGISTERED: 'SET_AUTH_IS_REGISTERED',
  FETCH_DATAS:'FETCH_DATAS',
  GET_ERRORS:'GET_ERRORS',
  TEST_DISPATCH:'TEST_DISPATCH',
  SET_CURRENT_USER:'SET_CURRENT_USER',
  SET_CURRENT_OTP:'SET_CURRENT_OTP',
  SET_LOGGED_USER:'SET_LOGGED_USER',
    IS_ERROR_NO:'IS_ERROR_NO'
}
export const REGISTER = {
  PROCESS: 'SET_REGISTER_PROCESS',
  SUCCESS: 'SET_REGISTER_SUCCESS',
  FAILED: 'SET_REGISTER_FAILED',
  SETEMAIL: 'SET_EMAIL',
}

/****************
 DASHBOARD
 *****************/
export const DASHBOARD = {
  LOADING: 'SET_DASHBOARD_LOADING',
  POPUP: 'SET_DASHBOARD_POPUP',
  SUCCESS: 'SET_DASHBOARD_SUCCESS',
  SUCCESS_NEWEST: 'SET_DASHBOARD_SUCCESS_NEWEST',
  FAILED: 'SET_DASHBOARD_FAILED',
  DETAIL: 'SET_DASHBOARD_DETAIL',
  POST_LOADING: 'SET_DASHBOARD_POST_LOADING'
}

/****************
 SITE SECTION
 *****************/
export const SITE = {
  LOADING: 'SET_SITE_LOADING',
  LOADING_CONFIG: 'SET_SITE_LOADING_CONFIG',
  LOADING_PUT: 'SET_SITE_LOADING_PUT',
  SUCCESS: 'SET_SITE_SUCCESS',
  SUCCESS_CONFIG: 'SET_SITE_SUCCESS_CONFIG',
  LOADING_WALLET_CONFIG: 'SET_SITE_LOADING_WALLET_CONFIG',
  SUCCESS_WALLET_CONFIG: 'SET_SITE_SUCCESS_WALLET_CONFIG',
  LOADING_SITE_PAKET: 'SET_SITE_LOADING_SITE_PAKET',
  SUCCESS_SITE_PAKET: 'SET_SITE_SUCCESS_SITE_PAKET',
  SUCCESS_LIST: 'SET_SITE_SUCCESS_LIST',
  SUCCESS_FOLDER: 'SET_SITE_SUCCESS_FOLDER',
  SUCCESS_TABLES: 'SET_SITE_SUCCESS_TABLES',
  FAILED: 'SET_SITE_FAILED',
  DETAIL: 'SET_SITE_DETAIL',
  SUCCESS_CHECK: 'SET_SITE_SUCCESS_CHECK',
  TRIGGER_ECAPS: 'SET_TRIGGER_ECAPS',
  DOWNLOAD_TXT: 'SET_DOWNLOAD_TXT',
  TRIGGER_MOBILE_ECAPS: 'SET_TRIGGER_MOBILE_ECAPS'
}

/****************
 BARANG
 *****************/
export const PRODUCT = {
    LOADING: 'SET_PRODUCT_LOADING',
    LOADING_DETAIL: 'SET_DETAIL_PRODUCT_LOADING',
    LOADING_POST: 'SET_PRODUCT_LOADING_POST',
    IS_ERROR: 'SET_PRODUCT_IS_ERROR',
    SUCCESS: 'SUCCESS_PRODUCT',
    FAILED: 'FAILED_PRODUCT',
    DETAIL: 'DETAIL_PRODUCT',
}
/****************
 REDEEM
 *****************/
export const REDEEM = {
    LOADING: 'SET_REDEEM_LOADING',
    LOADING_REPORT: 'SET_REDEEM_LOADING_REPORT',
    LOADING_DETAIL: 'SET_DETAIL_REDEEM_LOADING',
    LOADING_POST: 'SET_REDEEM_LOADING_POST',
    IS_ERROR: 'SET_REDEEM_IS_ERROR',
    SUCCESS: 'SUCCESS_REDEEM',
    SUCCESS_REPORT: 'SUCCESS_REDEEM_REPORT',
    FAILED: 'FAILED_REDEEM',
    DETAIL: 'DETAIL_REDEEM',
}
/****************
 REWARD
 *****************/
export const REWARD = {
    LOADING: 'SET_REWARD_LOADING',
    LOADING_REPORT: 'SET_REWARD_LOADING_REPORT',
    LOADING_DETAIL: 'SET_DETAIL_REWARD_LOADING',
    LOADING_POST: 'SET_REWARD_LOADING_POST',
    IS_ERROR: 'SET_REWARD_IS_ERROR',
    SUCCESS: 'SUCCESS_REWARD',
    SUCCESS_REPORT: 'SUCCESS_REWARD_REPORT',
    FAILED: 'FAILED_REWARD',
    DETAIL: 'DETAIL_REWARD',
}


/****************
 PAKET
 *****************/
export const PAKET = {
    LOADING: 'SET_PAKET_LOADING',
    LOADING_POST: 'SET_PAKET_LOADING_POST',
    LOADING_DETAIL: 'SET_PAKET_LOADING_DETAIL',
    IS_ERROR: 'SET_PAKET_IS_ERROR',
    SUCCESS: 'SUCCESS_PAKET',
    FAILED: 'FAILED_PAKET',
    DETAIL: 'DETAIL_PAKET',
}


/****************
 CART
 *****************/
export const CART = {
    LOADING: 'SET_CART_LOADING',
    LOADING_POST: 'SET_CART_LOADING_POST',
    LOADING_DETAIL: 'SET_CART_LOADING_DETAIL',
    IS_ERROR: 'SET_CART_IS_ERROR',
    SUCCESS: 'SUCCESS_CART',
    FAILED: 'FAILED_CART',
    DETAIL: 'DETAIL_CART',
}
/****************
 PIN
 *****************/
export const PIN = {
  LOADING: 'SET_PIN_LOADING',
  SET_KATEGORI: 'SET_KATEGORI_PIN',
  LOADING_AVAILABLE: 'SET_PIN_LOADING_AVAILABLE',
  SUCCESS: 'SUCCESS_PIN',
  SUCCESS_AVAILABLE: 'SUCCESS_PIN_AVAILABLE',
  SUCCESS_DETAIL: 'SUCCESS_PIN_DETAIL',
  FAILED: 'FAILED_PIN',
  DETAIL: 'DETAIL_PIN'
}
/****************
 BANK
 *****************/
export const BANK = {
    LOADING: 'SET_BANK_LOADING',
    LOADING_DATA: 'SET_BANK_LOADING_DATA',
    LOADING_POST: 'SET_BANK_LOADING_POST',
    LOADING_DETAIL: 'SET_BANK_LOADING_DETAIL',
    IS_ERROR: 'SET_BANK_IS_ERROR',
    SUCCESS: 'SUCCESS_BANK',
    SUCCESS_DATA: 'SUCCESS_BANK_DATA',
    FAILED: 'FAILED_BANK',
    DETAIL: 'DETAIL_BANK',
}

/****************
 MEMBER
 *****************/
export const MEMBER = {
  LOADING_POST: 'SET_MEMBER_LOADING_POST',
  LOADING_AVAIL: 'SET_MEMBER_LOADING_AVAIL',
  SUCCESS_AVAIL: 'SUCCESS_MEMBER_AVAIL',
  LOADING_DETAIL_MEMBER: 'SET_MEMBER_LOADING_DETAIL_MEMBER',
  SUCCESS_DETAIL_MEMBER: 'SUCCESS_MEMBER_DETAIL_MEMBER',
}

/****************
 CHECKOUT
 *****************/
export const CHECKOUT = {
    LOADING: 'SET_CHECKOUT_LOADING',
    LOADING_POST: 'SET_CART_LOADING_POST',
    IS_ERROR: 'SET_CART_IS_ERROR',
    SUCCESS: 'SUCCESS_CHECKOUT',

}


/****************
 ALAMAT
 *****************/
export const ALAMAT = {
    LOADING: 'SET_ALAMAT_LOADING',
    LOADING_POST: 'SET_ALAMAT_LOADING_POST',
    LOADING_DETAIL: 'SET_ALAMAT_LOADING_DETAIL',
    IS_ERROR: 'SET_ALAMAT_IS_ERROR',
    SUCCESS: 'SUCCESS_ALAMAT',
    FAILED: 'FAILED_ALAMAT',
    DETAIL: 'DETAIL_ALAMAT',
}


/****************
 KURIR
 *****************/
export const KURIR = {
    LOADING: 'SET_KURIR_LOADING',
    SUCCESS: 'SUCCESS_KURIR',
    SUCCESS_RESI: 'SUCCESS_RESI',
}

/****************
 ONGKIR
 *****************/
export const ONGKIR = {
    LOADING: 'SET_ONGKIR_LOADING',
    LOADING_POST: 'SET_ONGKIR_LOADING_POST',
    IS_ERROR: 'SET_ONGKIR_IS_ERROR',
    SUCCESS: 'SUCCESS_ONGKIR',
}
/****************
 VOUCHER
 *****************/
export const VOUCHER = {
    SUCCESS: 'SUCCESS_VOUCHER',
    LOADING_VOUCHER: 'SET_VOUCHER_LOADING',
}

/****************
 PROVINSI
 *****************/
export const PROVINSI = {
    LOADING: 'SET_PROVINSI_LOADING',
    SUCCESS: 'SUCCESS_PROVINSI',
}

/****************
 KOTA
 *****************/
export const KOTA = {
    LOADING: 'SET_KOTA_LOADING',
    SUCCESS: 'SUCCESS_KOTA',
}

/****************
 KECAMATAN
 *****************/
export const KECAMATAN = {
    LOADING: 'SET_KECAMATAN_LOADING',
    SUCCESS: 'SUCCESS_KECAMATAN',
}

/****************
 NETWORK
 *****************/
export const NETWORK = {
    LOADING: 'SET_NETWORK_LOADING',
    SUCCESS: 'SUCCESS_NETWORK',
    UPLINE: 'SUCCESS_UPLINEs',
}
/****************
 DEPOSIT
 *****************/
export const DEPOSIT = {
    LOADING: 'SET_DEPOSIT_LOADING',
    LOADING_POST: 'SET_DEPOSIT_LOADING_POST',
    LOADING_DETAIL: 'SET_DEPOSIT_LOADING_DETAIL',
    IS_ERROR: 'SET_DEPOSIT_IS_ERROR',
    SUCCESS: 'SUCCESS_DEPOSIT',
    FAILED: 'FAILED_DEPOSIT',
    DETAIL: 'DETAIL_DEPOSIT',
    LOADING_REPORT: 'SET_DEPOSIT_REPORT',
    SUCCESS_REPORT: 'SUCCESS_DEPOSIT_REPORT',
    SUCCESS_PERSEN: 'SUCCESS_DEPOSIT_REPORT_PERSEN',
    SUCCESS_REPORT_EXCEL: 'SUCCESS_DEPOSIT_REPORT_EXCEL',
}
/****************
 PENARIKAN
 *****************/
export const PENARIKAN = {
    LOADING: 'SET_PENARIKAN_LOADING',
    LOADING_POST: 'SET_PENARIKAN_LOADING_POST',
    LOADING_DETAIL: 'SET_PENARIKAN_LOADING_DETAIL',
    IS_ERROR: 'SET_PENARIKAN_IS_ERROR',
    SUCCESS: 'SUCCESS_PENARIKAN',
    FAILED: 'FAILED_PENARIKAN',
    DETAIL: 'DETAIL_PENARIKAN',
    LOADING_REPORT: 'SET_PENARIKAN_REPORT',
    SUCCESS_REPORT: 'SUCCESS_PENARIKAN_REPORT',
    SUCCESS_PERSEN: 'SUCCESS_PENARIKAN_REPORT_PERSEN',
    SUCCESS_REPORT_EXCEL: 'SUCCESS_PENARIKAN_REPORT_EXCEL',
}
/****************
 TRANSFER
 *****************/
export const TRANSFER = {
    LOADING: 'SET_TRANSFER_LOADING',
    LOADING_POST: 'SET_TRANSFER_LOADING_POST',
    LOADING_DETAIL: 'SET_TRANSFER_LOADING_DETAIL',
    IS_ERROR: 'SET_TRANSFER_IS_ERROR',
    SUCCESS: 'SUCCESS_TRANSFER',
    FAILED: 'FAILED_TRANSFER',
    DETAIL: 'DETAIL_TRANSFER',
}
/****************
 BANK MEMBER
 *****************/
export const BANK_MEMBER = {
    LOADING: 'SET_BANK_MEMBER_LOADING',
    LOADING_POST: 'SET_BANK_MEMBER_LOADING_POST',
    LOADING_DETAIL: 'SET_BANK_MEMBER_LOADING_DETAIL',
    IS_ERROR: 'SET_BANK_MEMBER_IS_ERROR',
    SUCCESS: 'SUCCESS_BANK_MEMBER',
    FAILED: 'FAILED_BANK_MEMBER',
    DETAIL: 'DETAIL_BANK_MEMBER',
}

/****************
 RIWAYAT TRANSAKSI
 *****************/
export const RIWAYAT_TRANSAKSI = {
  LOADING: 'SET_RIWAYAT_TRX_LOADING',
  LOADING_POST: 'SET_RIWAYAT_TRX_LOADING_POST',
  LOADING_DETAIL: 'SET_RIWAYAT_TRX_LOADING_DETAIL',
  IS_ERROR: 'SET_RIWAYAT_TRX_IS_ERROR',
  SUCCESS: 'SUCCESS_RIWAYAT_TRX',
  FAILED: 'FAILED_RIWAYAT_TRX',
  DETAIL: 'DETAIL_RIWAYAT_TRX',
}
/****************
 SANGQUOTA TRANSAKSI
 *****************/
export const SANGQUOTA_TRANSAKSI = {
  LOADING: 'SET_SANGQUOTA_TRX_LOADING',
  LOADING_POST: 'SET_SANGQUOTA_TRX_LOADING_POST',
  LOADING_DETAIL: 'SET_SANGQUOTA_TRX_LOADING_DETAIL',
  IS_ERROR: 'SET_SANGQUOTA_TRX_IS_ERROR',
  SUCCESS: 'SUCCESS_SANGQUOTA_TRX',
  FAILED: 'FAILED_SANGQUOTA_TRX',
  DETAIL: 'DETAIL_SANGQUOTA_TRX',
}

/****************
PEMBELIAN
 *****************/
export const PEMBELIAN = {
  LOADING: 'SET_PEMBELIAN_LOADING',
  LOADING_REPORT: 'SET_PEMBELIAN_LOADING_REPORT',
  LOADING_REPORT_EXCEL: 'SET_PEMBELIAN_LOADING_REPORT_EXCEL',
  LOADING_REPORT_DETAIL: 'SET_PEMBELIAN_LOADING_REPORT_DETAIL',
  LOADING_DETAIL_REPORT: 'SET_PEMBELIAN_LOADING_DETAIL_REPORT',
  IS_ERROR: 'SET_PEMBELIAN_IS_ERROR',
  SUCCESS_REPORT: 'SUCCESS_PEMBELIAN_REPORT',
  SUCCESS_REPORT_EXCEL: 'SUCCESS_PEMBELIAN_REPORT_EXCEL',
  SUCCESS_REPORT_DETAIL: 'SUCCESS_PEMBELIAN_REPORT_DETAIL',
  FAILED: 'FAILED_PEMBELIAN',
  DETAIL_REPORT: 'DETAIL_PEMBELIAN_REPORT',
}

/****************
BERITA
 *****************/
export const BERITA = {
  LOADING_BERITA: 'SET_LOADING_BERITA',
  LOADING_BERITA_KATEGORI: 'SET_LOADING_BERITA_KATEGORI',
  LOADING_BERITA_DETAIL: 'SET_LOADING_BERITA_DETAIL',
  IS_ERROR: 'SET_IS_ERROR',
  SUCCESS_BERITA: 'SUCCESS_BERITA',
  SUCCESS_BERITA_KATEGORI: 'SUCCESS_BERITA_KATEGORI',
  SUCCESS_BERITA_DETAIL: 'SUCCESS_BERITA_DETAIL',
  FAILED: 'FAILED_BERITA',
  DETAIL_BERITA: 'DETAIL_BERITA',
}

/****************
TESTIMONI
 *****************/
export const TESTIMONI = {
  LOADING_TESTIMONI: 'SET_LOADING_TESTIMONI',
  LOADING_TESTIMONI_KATEGORI: 'SET_LOADING_TESTIMONI_KATEGORI',
  LOADING_TESTIMONI_DETAIL: 'SET_LOADING_TESTIMONI_DETAIL',
  LOADING_POST: 'SET_LOADING_TESTIMONI_POST',
  IS_ERROR: 'SET_IS_ERROR',
  SUCCESS_TESTIMONI: 'SUCCESS_TESTIMONI',
  SUCCESS_TESTIMONI_KATEGORI: 'SUCCESS_TESTIMONI_KATEGORI',
  SUCCESS_TESTIMONI_DETAIL: 'SUCCESS_TESTIMONI_DETAIL',
  FAILED: 'FAILED_TESTIMONI',
  DETAIL_TESTIMONI: 'DETAIL_TESTIMONI',
}

/****************
 REKAPITULASI
 *****************/
export const REKAPITULASI = {
  LOADING: 'SET_REKAPITULASI_LOADING',
  LOADING_POST: 'SET_REKAPITULASI_LOADING_POST',
  LOADING_DETAIL: 'SET_REKAPITULASI_LOADING_DETAIL',
  IS_ERROR: 'SET_REKAPITULASI_IS_ERROR',
  SUCCESS: 'SUCCESS_REKAPITULASI',
  FAILED: 'FAILED_REKAPITULASI',
  DETAIL: 'DETAIL_REKAPITULASI',
}

/****************
 PULSA_ALL
 *****************/
export const PULSA_ALL = {
  LOADING: 'SET_PULSA_ALL_LOADING',
  SUCCESS: 'SUCCESS_PULSA_ALL',
  SUCCESS_AVAILABLE: 'SUCCESS_PULSA_ALL_AVAILABLE',
  SUCCESS_DETAIL: 'SUCCESS_PULSA_ALL_DETAIL',
  FAILED: 'FAILED_PULSA_ALL',
  DETAIL: 'DETAIL_PULSA_ALL',
    LOADING_POST: 'SET_PULSA_ALL_LOADING_POST',
    IS_ERROR: 'SET_PULSA_ALL_IS_ERROR',
}

/****************
 PASCABAYAR
 *****************/
export const PASCABAYAR = {
    LOADING_SUCCESS: 'SET_PASCABAYAR_LOADING',
    LOADING_DETAIL: 'SET_PASCABAYAR_LOADING_DETAIL',
    LOADING_POST: 'SET_PASCABAYAR_LOADING_POST',
    SUCCESS: 'SUCCESS_PASCABAYAR',
    DETAIL: 'SUCCESS_PASCABAYAR_DETAIL',
    FAILED: 'FAILED_PASCABAYAR',
    IS_ERROR: 'SET_PASCABAYAR_IS_ERROR',
    IS_ERROR_CHECKOUT: 'SET_PASCABAYAR_IS_ERROR_CHECKOUT',
}
/****************
 PRABAYAR
 *****************/
export const PRABAYAR = {
    LOADING_SUCCESS: 'SET_PRABAYAR_LOADING',
    LOADING_DETAIL: 'SET_PRABAYAR_LOADING_DETAIL',
    LOADING_POST: 'SET_PRABAYAR_LOADING_POST',
    SUCCESS: 'SUCCESS_PRABAYAR',
    DETAIL: 'SUCCESS_PRABAYAR_DETAIL',
    FAILED: 'FAILED_PRABAYAR',
    IS_ERROR: 'SET_PRABAYAR_IS_ERROR',
}


/****************
 KATEGORI_PPOB
 *****************/
export const KATEGORI_PPOB = {
    LOADING: 'SET_KATEGORI_PPOB_LOADING',
    SUCCESS: 'SUCCESS_KATEGORI_PPOB',
}
/****************
 SUB_KATEGORI_PPOB
 *****************/
export const SUB_KATEGORI_PPOB = {
    LOADING: 'SET_SUB_KATEGORI_PPOB_LOADING',
    SUCCESS: 'SUCCESS_SUB_KATEGORI_PPOB',
}
/****************
 REPORT_PPOB
 *****************/
export const REPORT_PPOB = {
    LOADING: 'SET_REPORT_PPOB_LOADING',
    SUCCESS: 'SUCCESS_REPORT_PPOB',
    DETAIL: 'SET_DETAIL_PPOB_REPORT',
    LOAD_DETAIL: 'SET_LOADING_PPOB_REPORT'
}