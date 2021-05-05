import React,{Component} from 'react';
import connect from "react-redux/es/connect/connect";
import moment from 'moment'
// import { HEADERS } from '../../../../../redux/actions/_constants';
// import noUser from 'assets/no-user.png';

import { ModalToggle, ModalType } from "redux/actions/modal.action";
import Default from 'assets/default.png'
import FormRiwayatPin from '../../../modals/member/form_riwayat_pin';
import { FetchMutasiPin } from '../../../../../redux/actions/pin/pin.action';
class Sponsor extends Component{
    constructor(props){
        super(props);
        this.state = {
            token:'',
            activeTab : 0,
            selectedIndex : 0,
            numChildren: 0,
            loading:false,
            arrs:[],
        };
    }
    
    componentWillMount(){
        this.setState({arrs:this.props.dataList})
        // this.getProps(this.props);
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.dataList!==this.props.dataList){
            this.setState({arrs:this.props.dataList})
        }
        if (this.state.arrs.length !== prevState.arrs.length){
            // this.getProps(this.props);
        }
    }
    componentDidMount(){
        this.setState({arrs:this.props.dataList})
        // this.getProps(this.props);
    }

    handleList(e, data) {
    // e.preventDefault()
        this.props.dispatch(FetchMutasiPin(this.props.auth.user.id, '', 1));
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("FormRiwayatPin"));
  }

    render(){
        
        return (
            <>
            <table className="table table-hover table-striped" style={{tableLayout:'fixed',zoom:'85%'}}>
                <thead style={{backgroundColor:'#732044'}}>
                    <tr>
                        <td width="10%" className="text-light text-center">NO</td>
                        <td width="30%" className="text-light text-center">NAMA</td>
                        <td width="20%" className="text-light text-center">FOTO</td>
                        <td width="20%" className="text-light text-center">ID</td>
                        <td width="20%" className="text-light text-center">Tanggal Gabung</td>
                        <td width="20%" className="text-light text-center">AKSI</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        (
                            typeof this.state.arrs === 'object' ? this.state.arrs.length>0?
                                this.state.arrs.map((v,i)=>{
                                    return(
                                        <tr key={i}>
                                            <td className="text-center">{i+1}</td>
                                            <td className="text-center">{v.name}</td>
                                            <td className="text-center"><img src={v.picture} className="img-fluid" onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} style={{width:'50px', height:'auto'}} alt={v.name} /></td>
                                            <td className="text-center">{v.id}</td>
                                            <td className="text-center">{moment(v.join_date).format('YYYY-MM-DD')}</td>
                                            <td className="text-center"><button className="btn btn-primary" onClick={(e)=>this.handleList(e,v)}>RIWAYAT PIN</button> </td>
                                        </tr>
                                    )
                                })
                                : <tr><td colSpan="11">NO DATA</td></tr> : <tr><td colSpan="11">NO DATA</td></tr>
                        )
                    }
                </tbody>
            </table>
            <FormRiwayatPin/>
            </>
        );
    }
}


const mapStateToProps = (state) => {
    // 
    return {
        isLoading:state.networkReducer.isLoading,
        list:state.networkReducer.data,
        auth: state.auth

    }
}

export default connect(mapStateToProps)(Sponsor)