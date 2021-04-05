import React,{Component} from 'react';
import {ModalBody, ModalHeader} from "reactstrap";
import connect from "react-redux/es/connect/connect";
import WrapperModal from "../../_wrapper.modal";
import {ModalToggle} from "redux/actions/modal.action";
import {cekResi} from "../../../../../redux/actions/product/kurir.action";
import Skeleton from 'react-loading-skeleton';

class PembelianCekResi extends Component{
    constructor(props){
        super(props);
        this.state = {
            list_pin:[]
        }
        this.toggle = this.toggle.bind(this);
        this.getListPin = this.getListPin.bind(this);
    }

    componentWillMount(){
        // 
        this.props.dispatch(cekResi(this.props.detailResi))
    }
    componentWillReceiveProps(nextProps){
        

    }

    toggle(e){
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        localStorage.removeItem("modalResi");
        localStorage.removeItem("code");
        localStorage.removeItem("barcode");
        localStorage.removeItem("name");
    };
    getListPin(e,data){
        e.preventDefault();
        this.setState({list_pin:data});
    }

    render(){
        const data = this.props.pembelianCekResi===undefined?{}:this.props.pembelianCekResi;
        return (
            <div>
                <WrapperModal isOpen={this.props.isOpen && this.props.type === "pembelianCekResi"} size="lg">
                    <ModalHeader toggle={this.toggle}>Status Pengiriman {this.props.detailResi.resi}</ModalHeader>
                    <ModalBody>
                        {
                            !this.props.isLoadingResi?Object.keys(this.props.pembelianCekResi).length!==0? typeof data.ongkir.manifest === 'object' ? data.ongkir.manifest.length > 0 ?data.ongkir.manifest.map((v,i)=>{
                                return(
                                    (
                                        <div className="ibox-content" id="ibox-content">
                                            <div id="vertical-timeline" className="vertical-container light--timeline">
                                                <div className="vertical-timeline-block">
                                                    <div className={`vertical-timeline-icon ${i%2===0?'bg-info':'bg-success'} btn-floating pulse`}/>
                                                    <div className="vertical-timeline-content" style={{border:`3px solid ${i%2===0?'#5d78ff':'green'}`}}>
                                                        <div className="media">
                                                            <div className="media-body text-center mr-2" style={{maxWidth:'100px',minWidth:'100px'}}>
                                                                <h5 className="mb-1">{v.manifest_time}</h5>
                                                                <p className="mb-0 text-muted">
                                                                    {v.manifest_date}
                                                                </p>
                                                            </div>
                                                            <div className="media-body text-left" style={{marginLeft:'20px'}}>
                                                                <p className="mb-2 text-mute">{v.city_name}</p>
                                                                <h6 className="mb-1 text-black">{v.manifest_description}</h6>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                );
                            }):"No Data.":"No Data.":"No Data.":(() => {
                                const rows = [];
                                for (let i = 0; i < 10; i++) {
                                    rows.push(
                                        <div className="ibox-content" id="ibox-content">
                                            <div id="vertical-timeline" className="vertical-container light--timeline">
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon bg-info btn-floating pulse"/>
                                                    <div className="vertical-timeline-content" style={{border:"1px solid transparent",padding:"0px"}}>
                                                        <div className="media">
                                                            <div className="media-body text-center mr-2" style={{maxWidth:'100px',minWidth:'100px'}}>
                                                                <h5 className="mb-1"><Skeleton width={'100%'}/></h5>
                                                                <p className="mb-0 text-muted">
                                                                    <Skeleton width={'100%'}/>
                                                                </p>
                                                            </div>
                                                            <div className="media-body text-left" style={{marginLeft:'20px'}}>
                                                                <p className="mb-2 text-mute"><Skeleton width={'40%'}/></p>
                                                                <h6 className="mb-1 text-black"><Skeleton width={'40%'}/></h6>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return rows;
                            })()
                        }
                    </ModalBody>
                </WrapperModal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        pembelianCekResi:state.kurirReducer.data_resi,
        isLoadingResi:state.kurirReducer.isLoading,

        // stockReportCekResiTransaction:state.stockReportReducer.dataCekResiTransaksi,
        // isLoading: state.stockReportReducer.isLoading,
    }
}
// const mapDispatch
export default connect(mapStateToProps)(PembelianCekResi);