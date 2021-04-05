import React,{Component} from 'react';
import {connect} from "react-redux";
import {
    deleteKurir,
    FetchKurir,
    FetchDetailKurir,
} from "redux/actions/masterdata/kurir/kurir.action";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import Swal from "sweetalert2";
// import FormKurir from "components/App/modals/masterdata/kurir/kurir_form";
// import Detail from "components/App/modals/masterdata/kurir/kurir_detail";
import {statusQ} from "helper";
import Paginationq from 'helper';
import {
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from 'reactstrap';

class ListKurir extends Component{
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
        let any = localStorage.getItem('any_kurir');
        localStorage.setItem("page_kurir",pageNumber);
        if(any===''||any===null||any===undefined){
            this.props.dispatch(FetchKurir(pageNumber,''));
        }else{
            this.props.dispatch(FetchKurir(pageNumber,any));
        }
    }


    handlesearch(event){
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        let any = data.get('field_any');
        localStorage.setItem('any_kurir',any);
        if(any===''||any===null||any===undefined){
            this.props.dispatch(FetchKurir(1,''));
        }else{
            this.props.dispatch(FetchKurir(1,any));
        }

    }

    toggleModal(e) {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formKurir"));
        this.setState({detail:undefined});
    }
    handleEdit(e,id,title,status,image) {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formKurir"));
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
        this.props.dispatch(ModalType("detailKurir"));
        this.props.dispatch(FetchDetailKurir(id));

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
                this.props.dispatch(deleteKurir(i,this.props.token));
            }
        })
    }
    render(){
        const columnStyle = {verticalAlign: "middle", textAlign: "center",};
        const {last_page,per_page,current_page} = this.props.data;
        let data = [];
        if(this.props.data.data===undefined){
            data = this.props.data
        } else {
            data = this.props.data.data
        }
        
        return (
            <div>
                <form onSubmit={this.handlesearch} noValidate>
                    <div className="row">
                        <div className="col-10 col-xs-10 col-md-3">
                            <div className="form-group">
                                <label>Search</label>
                                <input type="text" className="form-control" name="field_any" defaultValue={localStorage.getItem('any_kurir')}/>
                            </div>
                        </div>
                        <div className="col-2 col-xs-2 col-md-3">
                            <div className="form-group">
                                <button style={{marginTop:"27px",marginRight:"2px"}} type="submit" className="btn btn-primary"><i className="fa fa-search"/></button>
                                {/* <button style={{marginTop:"27px"}} type="button" onClick={(e)=>this.toggleModal(e)} className="btn btn-primary"><i className="fa fa-plus"/></button> */}
                            </div>
                        </div>
                    </div>

                </form>
                <div style={{overflowX: "auto"}}>
                    <table className="table table-hover table-bordered">
                        <thead className="bg-light">
                        <tr>
                            <th className="text-black" style={columnStyle}>#</th>
                            <th className="text-black" style={columnStyle}>Nama</th>
                            <th className="text-black" style={columnStyle}>Gambar</th>
                            <th className="text-black" style={columnStyle}>Status</th>
                            <th className="text-black" style={columnStyle}>Deskripsi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            (
                                typeof data === 'object' ?
                                    data.map((v,i)=>{
                                        return(
                                            <tr key={i}>
                                                <td style={columnStyle}>{/* Example split danger button */}
                                                    <div className="btn-kurir">
                                                        <UncontrolledButtonDropdown>
                                                            <DropdownToggle caret>
                                                                Aksi
                                                            </DropdownToggle>
                                                            <DropdownMenu>
                                                    
                                                                {/* <DropdownItem onClick={(e)=>this.handleDetail(e,v.id)}>Detail</DropdownItem> */}
                                                                <DropdownItem onClick={(e)=>this.handleEdit(e,v.id,v.title,v.status,'-')}>Ubah Status</DropdownItem>
                                                                {/* <DropdownItem onClick={(e)=>this.handleDelete(e,v.id)}>Delete</DropdownItem> */}
                                                            </DropdownMenu>
                                                            </UncontrolledButtonDropdown>
                                                    </div>
                                                </td>
                                                <td style={columnStyle}>{v.title}</td>
                                                <td style={columnStyle}>
                                                    <img src={v.gambar==='-'||v.gambar===''?'https://icoconvert.com/images/noimage2.png':v.gambar} style={{height:"50px",objectFit:"scale-down"}} alt=""/>
                                                </td>
                                                <td style={columnStyle}>{v.status===1?statusQ('success','Aktif'): statusQ('danger','Tidak Aktif')}</td>
                                                <td style={columnStyle}>{v.deskripsi}</td>
                                            </tr>
                                        )
                                    })
                                    : "No data."
                            )
                        }
                        </tbody>
                    </table>
                    <div style={{"marginTop":"20px","marginBottom":"20px","float":"right"}}>
                        <Paginationq
                            current_page={current_page}
                            per_page={per_page}
                            total={per_page*last_page}
                            callback={this.handlePageChange.bind(this)}
                        />
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Kurir:state.kurirReducer.data,
    }
}
export default connect(mapStateToProps) (ListKurir);