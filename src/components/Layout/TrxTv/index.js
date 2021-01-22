import React,{Component} from 'react'
import Layout from 'components/Layout'
import connect from "react-redux/es/connect/connect";
import {FetchPulsaAll} from '../../../../redux/actions/ppob/pulsa_all/pulsa_all.action'
import Select from "react-select";
import IntlTelInput from 'react-intl-tel-input/dist/components/IntlTelInput';

class TrxTv extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.HandleChangeProvider = this.HandleChangeProvider.bind(this)
        this.state={
            provider:'',
            no_telp:'',
            number:'',
            jenis_tagihan:'',
            jenis_tagihan_data:[],
        }
    }
    componentWillReceiveProps(nextProps){
        let jenis_tagihan = [
            {kode:"desc",value: "Indovision, Top TV, Okevision (Biaya Admin Rp. 2,000)"},
            {kode:"asc",value: "SKYNINDO TV FAMILY 12 BLN (480.000) (Biaya Admin Rp. 2,000)"},
        ];
        let data_jenis_tagihan=[];
        jenis_tagihan.map((i) => {
            data_jenis_tagihan.push({
                value: i.kode,
                label: i.value
            });
            return null;
        });
        this.setState({
            jenis_tagihan_data: data_jenis_tagihan,
        })
    }
    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    HandleChangeProvider(pr) {
        console.log("provider",pr)
        this.setState({provider:pr})
        this.props.dispatch(FetchPulsaAll('provider',pr.value))
    }
    setPhone(num, number) {
        this.setState({
            no_telp:number,
            number:num
        })
        if(number.length>=4){
            this.props.dispatch(FetchPulsaAll('nohp',number))
        }
    }
    render(){
        return (
            <Layout page="Pembayaran TV" subpage="PPOB">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6 col-xs-6 col-md-12">
                                        <div className="form-group">
                                            <label>Jenis Tagihan</label>
                                            <Select
                                                defaultValue={this.state.jenis_tagihan_data[0]}
                                                placeholder="Pilih Jenis Tagihan"
                                                options={this.state.jenis_tagihan_data}
                                                onChange={this.HandleChangeProvider}
                                                value={this.state.provider}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 col-xs-6 col-md-12">
                                        <div className="form-group">
                                            <label>No. Rekening/ ID Pelanggan</label>
                                            <input className="form-control" type="text" style={{padding: '9px',fontWeight:'bolder'}} name="id_pel" value={this.state.id_pel} onChange={(e) => this.handleChange(e)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 col-xs-6 col-md-12">
                                        <div className="form-group m-0">
                                            <label>Nomor Telepon Pembeli</label>
                                            {/* <input className="form-control" type="text" style={{padding: '9px',fontWeight:'bolder'}} name="no_telp" value={this.state.no_telp} onChange={(e) => this.handleChange(e)}/> */}
                                            <IntlTelInput
                                                preferredCountries={['id']}
                                                containerClassName="intl-tel-input"
                                                inputClassName="form-control"
                                                onPhoneNumberChange={(status, value, countryData, number, id) => {
                                                    this.setPhone(value.replace(/^0+/, ''), number.replace(/[^A-Z0-9]/ig, ""))
                                                }}
                                                separateDialCode={true}
                                                format={true}
                                                formatOnInit={true}
                                                value={this.state.number}
                                                // disabled={this.state.isOtp}
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 col-xs-6 col-md-12">
                                        <div className="form-group">
                                            <label>PIN</label>
                                            <input className="form-control" type="text" style={{padding: '9px',fontWeight:'bolder'}} name="pin" value={this.state.pin} onChange={(e) => this.handleChange(e)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 col-xs-6 col-md-12">
                                        <div className="form-group">
                                            <button className="btn btn-primary btn-block" type="button">Cek Tagihan</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
            );
    }
}

const mapStateToProps = (state) => {
    console.log("state.pulsa_allReducer",state.pulsa_allReducer)
    return {
        auth:state.auth,
        pulsa_allPulsaAll:state.pulsa_allReducer.data,
        isLoading:state.pulsa_allReducer.isLoading,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(TrxTv);