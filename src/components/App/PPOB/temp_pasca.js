import React,{Component} from 'react'
import Layout from 'components/Layout'
import connect from "react-redux/es/connect/connect";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {FetchPulsaAll} from '../../../redux/actions/ppob/pulsa_all/pulsa_all.action'
import Skeleton from 'react-loading-skeleton';
import IntlTelInput from 'react-intl-tel-input/dist/components/IntlTelInput';
import {Link} from "react-router-dom";
import {dataPPOB, toCurrency} from "../../../helper";

class TempPasca extends Component{
    constructor(props){
        super(props);
        this.HandleChangeProvider = this.HandleChangeProvider.bind(this)
        this.state={
            provider:'',
            no_telp:'',
            number:'',
            errorMsg:"",
            idx:10000000000,
        }
    }
    HandleChangeProvider(pr) {
        if(pr===null){
            this.setState({provider:""})
        }else{
            this.setState({provider:pr})
        }
    }
    validatePhone(num,number){
        let err='';
        if(number!=='62')
            if(number.length<10){
                err='Nomor terlalu pendek, minimal 10 karakter';
            }
        if(number.length>14){
            err='Nomor terlalu panjang, maksimal 14 karakter';
        }

        this.setState({errorMsg:err});

    }
    setPhone(num, number) {
        let err='';
        if(num!==''){
            err='';
        }
        if(number.length<3){
            this.setState({provider:'',idx:10000000000});

        }
        this.setState({
            no_telp:number,
            number:num,
            errorMsg:err,
        });
        let prov=null;
        if(number.length>=4){
            dataPPOB().forEach((v,i)=>{
                if(v.code===number.substr(0,5)||v.code===number.substr(0,4)){
                    prov=v;
                    return;
                }
            });
            this.HandleChangeProvider(prov);
            if(prov!==null){
                if(prov.code===number.substr(0,5)||prov.code===number.substr(0,4)){
                    if(number.length===5){
                        this.props.dispatch(FetchPulsaAll('nohp',number))
                    }
                }
            }

        }
    }
    handleNext(i){
        this.setState({idx:i});
        let data={
            layanan:`${this.props.pulsa_allPulsaAll.data[i].provider} - ${this.props.pulsa_allPulsaAll.data[i].note}`,
            nomor:this.state.no_telp,
            harga:this.props.pulsa_allPulsaAll.data[i].price,
            kode:this.props.pulsa_allPulsaAll.data[i].code
        };
        localStorage.setItem('dataPPOB', JSON.stringify(data));
    }
    render(){
        const {
            data
        } = this.props.pulsa_allPulsaAll;
        return (
            <Layout page={this.props.page} subpage="PPOB" link={"/ppob"}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-3">
                            <div className="card-body" style={{paddingBottom:"0"}}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Nomor Telepon</label>
                                            <IntlTelInput

                                                preferredCountries={['id']}
                                                containerClassName="intl-tel-input"
                                                inputClassName="form-control telInput"
                                                onPhoneNumberChange={(status, value, countryData, number, id) => {
                                                    this.setPhone(value.replace(/^0+/, ''), number.replace(/[^A-Z0-9]/ig, ""))
                                                }}
                                                onPhoneNumberBlur={(status, value, countryData, number, id) => {
                                                    this.validatePhone(value.replace(/^0+/, ''), number.replace(/[^A-Z0-9]/ig, ""))
                                                }}
                                                autoFocus={true}
                                                separateDialCode={true}
                                                format={true}
                                                formatOnInit={true}
                                                value={this.state.number}
                                            />
                                            <small>{this.state.errorMsg}</small>
                                            <img src={this.state.provider.icon} alt="" style={{height:'30px',float:"right",position:"relative",marginRight:"10px",marginTop:"-53px"}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 6}}>
                            <Masonry>
                                {
                                    this.state.provider!==''?!this.props.isLoading?(
                                        (
                                            typeof data === 'object' ? data.length > 0 ?
                                                data.map((v,i)=>{
                                                    return(
                                                        <div onClick={event => this.handleNext(i)} key={i} className="ribbon-vwrapper-reverse card" style={{cursor:"pointer",borderRadius:'3px'}}>
                                                            <div className={`ribbon ${this.state.idx===i?'ribbon-success':'ribbon-danger'} ribbon-vertical-r`}><i className={`fa ${this.state.idx===i?'fa-check':'fa-close'}`}/></div>
                                                            <p className="ribbon-content bold black">Rp {toCurrency(v.price)} .-<br/><span style={{color:"grey"}}>{v.note}</span></p>
                                                        </div>
                                                    )
                                                })
                                                : "" : ""
                                        )
                                    ):(() => {
                                        const rows = [];
                                        for (let i = 0; i < 18; i++) {
                                            rows.push(
                                                <div key={i} className="container" style={{borderRadius:'3px'}}>
                                                    <Skeleton width={'100%'} height={80}/>
                                                </div>
                                            );
                                        }
                                        return rows;
                                    })():""
                                }
                            </Masonry>
                        </ResponsiveMasonry>
                        <br/>

                        {
                            this.state.no_telp.length<10||this.state.no_telp.length>14||this.state.idx===10000000000||this.state.provider===''||data.length<1?(
                                <button className="btn btn-primary" disabled={true} style={{border:"1px solid rgb(250, 89, 29)",backgroundColor:"rgb(250, 89, 29)",borderRadius:"10px",width:"30%",float:"right",padding:"10px",fontSize:"20px"}}>
                                    Beli
                                </button>
                            ):(
                                <Link to={"/ppob/checkout/Pulsa-All-Operator"}>
                                    <button className="btn btn-primary" style={{border:"1px solid rgb(250, 89, 29)",backgroundColor:"rgb(250, 89, 29)",borderRadius:"10px",width:"30%",float:"right",padding:"10px",fontSize:"20px"}}>
                                        Beli
                                    </button>
                                </Link>
                            )
                        }

                    </div>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth,
        pulsa_allPulsaAll:state.pulsa_allReducer.data,
        isLoading:state.pulsa_allReducer.isLoading,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(TempPasca);