import React,{Component} from 'react'
import Layout from 'components/Layout'
import connect from "react-redux/es/connect/connect";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {FetchPulsaAll} from '../../../redux/actions/ppob/pulsa_all/pulsa_all.action'
import Skeleton from 'react-loading-skeleton';
import IntlTelInput from 'react-intl-tel-input/dist/components/IntlTelInput';
import {Link} from "react-router-dom";
import {dataPPOB, toCurrency, ToastQ} from "../../../helper";
import {getSubKategoriPPOB} from "../../../redux/actions/ppob/kategoriPPOB.action";
import StickyBox from "react-sticky-box/dist/esnext/index";

class TempPra extends Component{
    constructor(props){
        super(props);
        this.HandleChangeProvider = this.HandleChangeProvider.bind(this)
        this.handleOtherCard = this.handleOtherCard.bind(this)
        this.state={
            provider:'',
            no_telp:'',
            number:'',
            errorMsg:"",
            idx:10000000000,
            path:this.props.location.pathname.split("/"),
            code:this.props.location.pathname.split("/")[4],
            prefix:[],
            idOperator:''
        }
    }

    componentWillMount(){
        this.props.dispatch(getSubKategoriPPOB(`${atob(this.state.code)}`))
    }

    componentWillReceiveProps(nextProps){
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
        this.setState({
            no_telp:number,
            number:num,
            errorMsg:err,
            idx:10000000000
        });

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
            idx:10000000000
        });
        let prov=null;

        if(num.length>=3){
            let rplcPrefix=number.replaceAll("62","0");
            let prefix3=rplcPrefix.substr(0,3);
            let prefix4=rplcPrefix.substr(0,4);
            let prefix5=rplcPrefix.substr(0,5);
            if(this.props.dataSub.data!==undefined){
                this.props.dataSub.data.map((v,i)=>{
                    if(v.prefix!==null){
                        let pre=v.prefix.split(",");
                        pre.forEach((val,key)=>{
                            if(val===prefix3||val===prefix4||val===prefix5){
                                prov={code:val,value:v.title, label:v.title, icon:v.logo, isDisabled: true };
                            }
                        })
                    }

                });
            }
            this.HandleChangeProvider(prov);
            if(prov!==null){
                if(prov.code===prefix3||prov.code===prefix4||prov.code===prefix5){
                    if(number.length===5){
                        this.props.dispatch(FetchPulsaAll(`nohp=${number}&kategori=${atob(this.state.code)}`))
                    }
                }
            }

        }
    }
    handleNext(i,param=''){
        this.setState({idx:i});

        let data={
            layanan:this.props.pulsa_allPulsaAll.data[i].provider,
            keterangan:this.props.pulsa_allPulsaAll.data[i].note,
            nomor:`0${this.state.number}`,
            harga:this.props.pulsa_allPulsaAll.data[i].price,
            kode:this.props.pulsa_allPulsaAll.data[i].code,
        };

        if(data['nomor']!=='0'){
            localStorage.setItem('dataPPOB', JSON.stringify(data));
            if(param!==''){
                this.props.history.push({pathname: `/ppob/checkout/${this.state.path[3].toLowerCase()}`});
            }
        }else{
            ToastQ.fire({
                icon: 'error',
                title: `Nomor masih kosong.`
            });
        }
    }
    handleOtherCard(e,kategori,id){
        e.preventDefault();
        this.setState({idOperator:id});
        if(id!==this.state.idOperator){
            this.props.dispatch(FetchPulsaAll(`operator=${kategori}&perpage=100`));
        }
    }


    render(){
        const {
            data
        } = this.props.pulsa_allPulsaAll;
        const {path}=this.state;
        return (
            <Layout page={`${path[3].toUpperCase().replace("-"," ")}`} subpage="PPOB" link={"/ppob"}>
                <div className="row">
                    {
                        path[3]==='e-money'||path[3]==='e-toll'||path[3]==='voucher-wifi-id'?(
                            <div className="col-md-12 col-sm-12 col-log-12">
                                {/* <div style={{ display: 'flex', alignItems: 'flex-start' }}> */}
                                <div className='row'>
                                    <div className="col-md-4 col-sm-12 col-lg-4">
                                        <StickyBox offsetTop={100} offsetBottom={20}  style={{marginRight:"10px"}}>
                                            <div className="card">
                                                <div className="card-body">
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

                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div class="outer">
                                                                <div class="inner" style={{display:'flex',flexWrap:'wrap'}}>
                                                                    {
                                                                        !this.props.isLoadingSub?typeof this.props.dataSub.data==='object'?this.props.dataSub.data.length>0?this.props.dataSub.data.map((v,i)=>{
                                                                            return(
                                                                                <div onClick={(e)=>this.handleOtherCard(e,v.op_id,v.id)} style={{cursor:"pointer",backgroundColor:v.id===this.state.idOperator?"#00838d":"",flex:"auto",marginRight:'5px',paddingBottom:"5px"}} class="cards card1">
                                                                                    <p style={{padding:'0',color:v.id===this.state.idOperator?"white":""}}>
                                                                                        <img style={{float:"left",height:"20px",marginRight:"5px"}} src={v.logo} alt=""/> {v.title}
                                                                                    </p>
                                                                                </div>
                                                                            );
                                                                        }):"":"":""
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </StickyBox>
                                    </div>
                                    <div className="col-md-8 col-sm-12 col-lg-8">
                                        <div className="box-margin" >
                                            <div className="card">
                                                <div className="card-body table-responsive" style={{overflowY:'auto !important'}}>
                                                    <table className="table table-hover table-bordered">
                                                        <thead className="bg-info">
                                                        <tr>
                                                            <th>OPERATOR</th>
                                                            <th>NOTE</th>
                                                            <th>#</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            this.state.idOperator!==''?!this.props.isLoading?typeof data==='object'?data.length>0?data.map((v,i)=>{
                                                                return(
                                                                    <tr key={i}>
                                                                        <td>{v.provider}</td>
                                                                        <td>{v.note}</td>
                                                                        <td>
                                                                            <button onClick={event => this.handleNext(i,'-')} className="btn btn-primary">
                                                                                Beli
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            }):"":"":(()=>{
                                                                let container =[];
                                                                for(let i=0; i<5; i++){
                                                                    container.push(
                                                                        <tr key={i}>
                                                                            <td><Skeleton/></td>
                                                                            <td><Skeleton/></td>
                                                                            <td><Skeleton/></td>
                                                                        </tr>
                                                                    )
                                                                }
                                                                return container;
                                                            })():""
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                    {/* </div> */}
                                    </div>

                                </div>

                            </div>

                        ):(
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

                                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900:4}}>
                                    <Masonry>
                                        {
                                            this.state.provider!==''?!this.props.isLoading?(
                                                (
                                                    typeof data === 'object' ? data.length > 0 ?
                                                        data.map((v,i)=>{
                                                            return(
                                                                <div onClick={event => this.handleNext(i,'')} key={i} className="ribbon-vwrapper-reverse card imgWrapper" style={{cursor:"pointer",borderRadius:'3px',marginRight:"10px",marginBottom:"10px"}}>
                                                                    <div className={`ribbon ${this.state.idx===i?'ribbon-success':''} ribbon-vertical-r`}><i className={`fa ${this.state.idx===i?'fa-check':''}`}/></div>
                                                                    <div className="row">
                                                                        <div className="col-md-4 col-sm-4 col-lg-4" style={{verticalAlign:"middle"}}>
                                                                            <img src={v.logo} alt=""/>
                                                                        </div>
                                                                        <div className="col-md-8 col-sm-8 col-lg-8">
                                                                            <p className="ribbon-content bold txtRed">
                                                                                Rp {toCurrency(v.price)} .-<br/>
                                                                                <span style={{color:"grey"}}>{v.note}</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                        : "" : ""
                                                )
                                            ):(() => {
                                                const rows = [];
                                                for (let i = 0; i < 12; i++) {
                                                    rows.push(
                                                        <div className="row" key={i}>
                                                            <div className="col-md-12">
                                                                <Skeleton width={'100%'} height={80}/>
                                                            </div>

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
                                        <Link to={`/ppob/checkout/${path[3].toLowerCase()}`}>
                                            <button className="btn btn-primary" style={{border:"1px solid rgb(250, 89, 29)",backgroundColor:"rgb(250, 89, 29)",borderRadius:"10px",width:"30%",float:"right",padding:"10px",fontSize:"20px"}}>
                                                Beli
                                            </button>
                                        </Link>
                                    )
                                }

                            </div>
                        )
                    }
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth,
        dataSub:state.kategoriPPOBReducer.dataSub,
        isLoadingSub:state.kategoriPPOBReducer.isLoadingSub,
        pulsa_allPulsaAll:state.pulsa_allReducer.data,
        isLoading:state.pulsa_allReducer.isLoading,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(TempPra);