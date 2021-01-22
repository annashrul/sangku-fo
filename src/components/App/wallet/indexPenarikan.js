import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import Skeleton from 'react-loading-skeleton';
import {rmComma, ToastQ, toCurrency} from "helper";
import {postPenarikan} from "redux/actions/member/penarikan.action";
import {getBankMember} from "redux/actions/member/bankMember.action";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class IndexPenarikan extends Component{
    constructor(props){
        super(props);
        this.state={
            amount:"0",
            bank:0,
            idBank:"",
            arrAmount:[
                {id:0,amount:'100,000'},
                {id:1,amount:'200,000'},
                {id:2,amount:'300,000'},
                {id:3,amount:'400,000'},
                {id:4,amount:'500,000'},
                {id:5,amount:'1,000,000'},
            ],
        };
        this.handleChange   = this.handleChange.bind(this);
        this.handleClickPrice   = this.handleClickPrice.bind(this);
        this.handleClickBank   = this.handleClickBank.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);

    }

    componentWillMount(){
        this.props.dispatch(getBankMember());
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleClickPrice(e,i){
        e.preventDefault();
        this.setState({
            amount:this.state.arrAmount[i].amount
        })
    }

    handleClickBank(e,i,id,name){
        e.preventDefault();
        ToastQ.fire({icon:'info',title:`${name} dipilih.`});
        this.setState({bank:i,idBank:id});
    }


    handleSubmit(e){
        e.preventDefault();
        let data={};
        data['id_bank'] = this.state.idBank;
        data['amount'] = rmComma(this.state.amount);
        if(isNaN(data['amount'])){
            ToastQ.fire({icon:'error',title:`silahkan masukan nominal anda`});
        }
        else{
            this.props.dispatch(postPenarikan(data));
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isError===true){
            this.setState({amount:"0"});
        }
    }

    render(){
        const settings = {
            className: "center",
              dots: true,
            focusOnSelect: true,
            // adaptiveHeight: true,
            infinite: false,
            centerMode: true,
            // centerPadding: "60px",
            slidesToShow: 1,
            slidesToScroll: 1,
            // variableWidth: true,
            vertical:false,
            verticalSwiping:false,
            // beforeChange: (current, next) => {
            //     const data = this.props.resBank.data;
            //     ToastQ.fire({icon:'info',title:data[next].bank_name+' dipilih'});
            //     this.setState({bank:next,idBank:data[next].id});
            //     // this.setState({ activeSlide: next })
            // },
            afterChange: current => {
                // this.setState({ activeSlide2: current })
                const data = this.props.resBank.data;
                ToastQ.fire({icon:'info',title:data[current].bank_name+' dipilih'});
                this.setState({bank:current,idBank:data[current].id});
                // this.setState({ activeSlide: next })
            }
        };
        return(
            <Layout page={"Penarikan"}>
                <div className="row align-items-center">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="dashboard-header-title mb-3 d-flex justify-content-center">
                            <h5 className="mb-0 text-center font-weight-bold">Penarikan</h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card bg-dark pr-3 pl-3 pb-3 pt-0">
                            <div className="card-body">
                                <h5 className="text-light">Pilih Bank</h5>
                                <div style={{width:'auto', display:'block'}}>
                                    <Slider {...settings}>
                                    {
                                        typeof this.props.resBank.data==='object'?this.props.resBank.data.length>0?this.props.resBank.data.map((v,i)=>{
                                            return (
                                                <div key={i}>
                                                    <div className="card mr-2" onClick={(event)=>this.handleClickBank(event,i,v.id,v.bank_name)} style={this.state.bank===i?{backgroundColor:'#EEEEEE'}:{backgroundColor:'#FFFFFF'}}>
                                                        <div className="card-body">
                                                            <div className="single-smart-card d-flex justify-content-between">
                                                                <div className="text">
                                                                    <h5 style={{color:"green"}}>{v.bank_name}</h5>
                                                                    <p style={{fontSize:"12px"}}>{v.acc_name} <br/> {v.acc_no}</p>
                                                                </div>
                                                                <div className="icon">
                                                                    <i className={`fa ${this.state.bank===i?'fa-check':'fa-angle-double-right'} font-30`} style={{color:`${this.state.bank===i?'green':''}`}}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }):"":(()=>{
                                            let container =[];
                                            for(let x=0; x<4; x++){
                                                container.push(
                                                    <div className={"card"} style={{borderBottom:"1px solid #EEEEEE"}}>
                                                        <div className="card-body">
                                                            <div><Skeleton width={100}/></div>
                                                            <div><Skeleton width={200}/></div>
                                                            <div><Skeleton width={300}/></div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            return container;
                                        })()
                                    }
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Pilih nominal cepat</label>
                                    </div>
                                    {
                                        this.state.arrAmount.map((v,i)=>{
                                            return (
                                                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4" key={i} style={{marginBottom:"10px"}}>
                                                    <button onClick={(event)=>this.handleClickPrice(event,i)} className={`btn ${this.state.amount===v.amount?'btn-success':'btn-default'} btn-block btn-lg`} style={{border:"2px solid green",borderRadius:"10px",color:`${this.state.amount===v.amount?'white':'green'}`,fontWeight:"bold"}}>{v.amount}</button>
                                                </div>
                                            );
                                        })
                                    }
                                    <div className="col-md-12" style={{borderTop:"1px solid #EEEEEE"}}>
                                        {/* <div className="form-group" style={{marginTop:"10px"}}>
                                            <label>Masukan Nominal</label>
                                            <input type="text" className={"form-control"} name={"amount"} value={toCurrency(this.state.amount)} onChange={this.handleChange}/>
                                        </div> */}
                                        <div className="form-group mt-2">
                                            <label>Masukan Nominal</label>
                                            <div className="input-group">
                                                {/* <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" /> */}
                                                <input type="text" className={"form-control"} name={"amount"} value={toCurrency(this.state.amount)} onChange={this.handleChange}/>
                                                <div className="input-group-append">
                                                    {/* <button className="btn btn-primary" type="button">Button</button> */}
                                                    <button onClick={this.handleSubmit} className={"btn btn-primary"}>{!this.props.isLoadingPost?'Tarik':'Loading ...'}</button>
                                                </div>
                                            </div>
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
    return {
        auth: state.auth,
        resBank:state.bankMemberReducer.data,
        isLoadingBank:state.bankMemberReducer.isLoading,
        isLoadingPost:state.penarikanReducer.isLoadingPost,
        isError:state.penarikanReducer.isError,
    }
}


export default connect(mapStateToProps)(IndexPenarikan);