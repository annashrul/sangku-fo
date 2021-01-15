import React,{Component} from 'react'
import Layout from 'components/Layout'
import Paginationq from "helper";
import connect from "react-redux/es/connect/connect";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import moment from "moment";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {FetchPulsaAll} from '../../../../redux/actions/ppob/pulsa_all/pulsa_all.action'
import {toRp, statusQ} from 'helper'
import Skeleton from 'react-loading-skeleton';
import Select, { components } from "react-select";
import IntlTelInput from 'react-intl-tel-input/dist/components/IntlTelInput';

const options = [
  { value: "AXIS", label: "AXIS", icon: "https://tripay.co.id/assets/images/provider/axis.png" },
  { value: "INDOSAT", label: "INDOSAT", icon: "https://tripay.co.id/assets/images/provider/indosat.png" }
];

const { Option } = components;
const IconOption = props => (
  <Option {...props}>
    <img className="mr-2"
      src={props.data.icon}
      style={{ width: 36 }}
      alt={props.data.label}
    />
    {props.data.label}
  </Option>
);
class VoucherWifiid extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.HandleChangeProvider = this.HandleChangeProvider.bind(this)
        this.state={
            provider:'',
            no_telp:'',
            number:'',
        }
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
        const {
            per_page,
            last_page,
            current_page,
            data
        } = this.props.pulsa_allPulsaAll;
        return (
            <Layout page="Voucher WIFI.ID" subpage="PPOB">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12" style={{zoom:"100%"}}>
                                        <div className="row">
                                            <div className="col-6 col-xs-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Nomor Telepon</label>
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
                                            <div className="col-6 col-xs-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Pilih Provider</label>
                                                    <Select
                                                        defaultValue={options[0]}
                                                        options={options}
                                                        components={{ Option: IconOption }}
                                                        onChange={this.HandleChangeProvider}
                                                        value={this.state.provider}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                                
                        <div className="card">
                            <div className="card-body">
                                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                                    <Masonry>
                                        {
                                            !this.props.isLoading?(
                                                (
                                                    typeof data === 'object' ? data.length>0?
                                                        data.map((v,i)=>{
                                                            return(
                                                                <div className="card widget-new-content p-3 mr-2 mb-2 bg-white">
                                                                    <div className="widget---stats d-flex align-items-center justify-content-between mb-15">
                                                                        <div className="widget---content-text">
                                                                        <h6 className="text-mute">Nama</h6>
                                                                        <p className="mb-0">{v.note}</p>
                                                                        </div>
                                                                        <h6 className="mb-0 text-success">Rp. {toRp(v.price)}</h6>
                                                                    </div>
                                                                    <div className="row" style={{marginTop:'-25px'}}>
                                                                        <div className="col-md-8">
                                                                            <div className="progress h-5 mt-3">
                                                                                <div className="progress-bar w-100 bg-success" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <button type="button" className="btn btn-primary btn-block">BELI</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                        : "No data." : "No data."
                                                )
                                            ):(() => {
                                                    const rows = [];
                                                    for (let i = 0; i < 9; i++) {
                                                        rows.push(
                                                            <div className="card widget-new-content p-3 mr-2 mb-2 bg-white">
                                                                <div className="widget---stats d-flex align-items-center justify-content-between mb-15">
                                                                    <div className="widget---content-text">
                                                                        <Skeleton width={140} height={20}/><br/>
                                                                        <Skeleton width={140} height={20}/>
                                                                    </div>
                                                                    <Skeleton width={60} />
                                                                </div>
                                                                <div className="row" style={{marginTop:'-20px'}} >
                                                                    <div className="col-md-8">
                                                                        <div className="progress h-5 mt-3">
                                                                            <div className="progress-bar w-100 bg-success" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <Skeleton style={{width:'100%', height:'40px'}} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                    return rows;
                                                })()
                                        }
                                    </Masonry>
                                </ResponsiveMasonry>
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
export default connect(mapStateToProps)(VoucherWifiid);