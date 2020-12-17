import React,{Component} from 'react';
import {connect} from "react-redux";
import {
    deleteBrand,
    FetchBrand,
    FetchDetailBrand,
} from "redux/actions/masterdata/brand/brand.action";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import Swal from "sweetalert2";
import FormBrand from "components/App/modals/masterdata/brand/brand_form";
import Detail from "components/App/modals/masterdata/brand/brand_detail";
import {statusQ} from "helper";
import Paginationq from 'helper';
import {
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from 'reactstrap';

class ListBrand extends Component{
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
        let any = localStorage.getItem('any_brand');
        localStorage.setItem("page_brand",pageNumber);
        if(any===''||any===null||any===undefined){
            this.props.dispatch(FetchBrand(pageNumber,''));
        }else{
            this.props.dispatch(FetchBrand(pageNumber,any));
        }
    }


    handlesearch(event){
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        let any = data.get('field_any');
        localStorage.setItem('any_brand',any);
        if(any===''||any===null||any===undefined){
            this.props.dispatch(FetchBrand(1,''));
        }else{
            this.props.dispatch(FetchBrand(1,any));
        }

    }

    toggleModal(e) {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formBrand"));
        this.setState({detail:undefined});
    }
    handleEdit(e,id,title,status,image) {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formBrand"));
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
        this.props.dispatch(ModalType("detailBrand"));
        this.props.dispatch(FetchDetailBrand(id));

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
                this.props.dispatch(deleteBrand(i,this.props.token));
            }
        })
    }
    render(){
        const columnStyle = {verticalAlign: "middle", textAlign: "center",};
        const {last_page,per_page,current_page,data} = this.props.data;
        console.log(data)
        return (
            <div>
                <form onSubmit={this.handlesearch} noValidate>
                    <div className="row">
                        <div className="col-10 col-xs-10 col-md-3">
                            <div className="form-group">
                                <label>Search</label>
                                <input type="text" className="form-control" name="field_any" defaultValue={localStorage.getItem('any_brand')}/>
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
                <div style={{overflowX: "auto"}}>
                    <table className="table table-hover table-bordered">
                        <thead className="bg-light">
                        <tr>
                            <th className="text-black" style={columnStyle}>#</th>
                            <th className="text-black" style={columnStyle}>Nama</th>
                            <th className="text-black" style={columnStyle}>Status</th>
                            <th className="text-black" style={columnStyle}>Gambar</th>
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
                                                    <div className="btn-brand">
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
                                                </td>
                                                <td style={columnStyle}>{v.title}</td>
                                                <td style={columnStyle}>{v.status===1?statusQ('success','Aktif'): statusQ('danger','Tidak Aktif')}</td>
                                                <td style={columnStyle}>
                                                    <img src={v.image==='-'||v.image===''?'https://icoconvert.com/images/noimage2.png':v.image} style={{height:"50px",objectFit:"scale-down"}} alt=""/>
                                                </td>
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

                <FormBrand detail={this.state.detail} token={this.props.token}/>
                <Detail/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Brand:state.brandReducer.data,
    }
}
export default connect(mapStateToProps) (ListBrand);