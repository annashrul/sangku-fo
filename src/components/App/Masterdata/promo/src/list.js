import React,{Component} from 'react';
import {connect} from "react-redux";
import {
    deletePromo,
    FetchPromo,
    FetchDetailPromo,
} from "redux/actions/masterdata/promo/promo.action";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import Swal from "sweetalert2";
// import FormPromo from "components/App/modals/masterdata/promo/promo_form";
// import Detail from "components/App/modals/masterdata/promo/promo_detail";
// import {statusQ} from "helper";
import Paginationq from 'helper';
import {
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from 'reactstrap';
import moment from 'moment'
import Default from 'assets/default.png'

class ListPromo extends Component{
    constructor(props){
        super(props);
        this.handlesearch = this.handlesearch.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
        this.state={
            detail:{}
        }
    }
    handlePageChange(pageNumber){
        let any = localStorage.getItem('any_promo');
        localStorage.setItem("page_promo",pageNumber);
        if(any===''||any===null||any===undefined){
            this.props.dispatch(FetchPromo(pageNumber,''));
        }else{
            this.props.dispatch(FetchPromo(pageNumber,any));
        }
    }


    handlesearch(event){
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        let any = data.get('field_any');
        localStorage.setItem('any_promo',any);
        if(any===''||any===null||any===undefined){
            this.props.dispatch(FetchPromo(1,''));
        }else{
            this.props.dispatch(FetchPromo(1,any));
        }

    }

    toggleModal(e) {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formPromo"));
        this.setState({detail:undefined});
    }
    handleEdit(e,id,title,status,image) {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formPromo"));
        this.setState({
            detail:{
                "id":id,
                "title":title,
                "status":status,
                "image":image,
            }
        });

    }
    handleDetail(e,id) {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("detailPromo"));
        this.props.dispatch(FetchDetailPromo(id));

    }
    handleDelete(e,i){
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(deletePromo(i,this.props.token));
            }
        })
    }
    render(){
        // const columnStyle = {verticalAlign: "middle", textAlign: "center",};
        const {last_page,per_page,current_page,data} = this.props.data;
        console.log(data)
        return (
            <div>
                <form onSubmit={this.handlesearch} noValidate>
                    <div className="row">
                        <div className="col-10 col-xs-10 col-md-3">
                            <div className="form-group">
                                <label>Search</label>
                                <input type="text" className="form-control" name="field_any" defaultValue={localStorage.getItem('any_promo')}/>
                            </div>
                        </div>
                        <div className="col-2 col-xs-2 col-md-3">
                            <div className="form-group">
                                <button style={{marginTop:"27px",marginRight:"2px"}} type="submit" className="btn btn-primary"><i className="fa fa-search"/></button>
                                <button style={{marginTop:"27px"}} type="button" onClick={(e)=>this.toggleModal(e)} className="btn btn-primary"><i className="fa fa-plus"/></button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="row">
                        {
                            (
                                typeof data === 'object' ?
                                    data.map((v,i)=>{
                                        return(
                                        <div className="col-md-4" key={i}>
                                            <div className="card">
                                                <img src={v.gambar} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} alt="..." className="card-img-top" />
                                                <div className="card-body text-center">
                                                    <h5 className="mt-20">
                                                    <a className="text-dark" href={null}>{v.title}</a>
                                                    </h5>
                                                    <p className="card-text text-muted">{moment(v.periode_start).format('YYYY-MM-DD')+' s/d '+moment(v.periode_end).format('YYYY-MM-DD')}</p>
                                                    <p className="card-text">
                                                    <span className="badge badge-success">
                                                        {v.is_voucher}
                                                    </span>
                                                    <span className="badge badge-success">
                                                        {v.type}
                                                    </span>
                                                    </p>
                                                    <hr />
                                                    <div className="row align-items-center justify-content-between">
                                                    <div className="col-auto">
                                                        {v.status===1?<div><span className="text-success font-30">●</span> Aktif</div>:<div><span className="text-danger font-30">●</span> Tidak Aktif</div>}
                                                    </div>
                                                    <div className="col-auto">
                                                        <div className="btn-promo">
                                                            <UncontrolledButtonDropdown>
                                                                <DropdownToggle caret>
                                                                    Aksi
                                                                </DropdownToggle>
                                                                <DropdownMenu>
                                                                    <DropdownItem onClick={(e)=>this.handleDetail(e,v.id)}>Detail</DropdownItem>
                                                                    <DropdownItem onClick={(e)=>this.handleEdit(e,v.id,v.title,v.status,'-')}>Edit</DropdownItem>
                                                                    <DropdownItem onClick={(e)=>this.handleDelete(e,v.id)}>Delete</DropdownItem>
                                                                </DropdownMenu>
                                                                </UncontrolledButtonDropdown>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    })
                                    : "No data."
                            )
                        }
                        </div>
                    <div style={{"marginTop":"20px","marginBottom":"20px","float":"right"}}>
                        <Paginationq
                            current_page={current_page}
                            per_page={per_page}
                            total={per_page*last_page}
                            callback={this.handlePageChange.bind(this)}
                        />
                    </div>

                {/* <FormPromo detail={this.state.detail} token={this.props.token}/>
                <Detail/> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Promo:state.promoReducer.data,
    }
}
export default connect(mapStateToProps) (ListPromo);