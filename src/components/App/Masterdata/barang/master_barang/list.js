import React,{Component} from 'react';
import {connect} from "react-redux";
import {
    deleteBarang,
    FetchBarang,
    FetchDetailBarang,
} from "redux/actions/masterdata/barang/barang.action";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import Swal from "sweetalert2";
// import FormBarang from "components/App/modals/masterdata/barang/barang_form";
// import Detail from "components/App/modals/masterdata/barang/barang_detail";
import Paginationq from 'helper';
import {
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from 'reactstrap';
import FormBarang from '../../../modals/masterdata/barang/barang_form'
import DetailBarang from '../../../modals/masterdata/barang/barang_detail'
import { FetchKelompokBarang } from 'redux/actions/masterdata/barang/kelompok.action';
import {FetchBrand} from "redux/actions/masterdata/brand/brand.action";
import { FetchKategoriBarang } from '../../../../../redux/actions/masterdata/barang/kategori.action';
import FormBertingkat from '../../../modals/masterdata/barang/barang_form_bertingkat';

class ListBarang extends Component{
    constructor(props){
        super(props);
        this.handlesearch = this.handlesearch.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.state={
            detail:{}
        }
    }
    
    handleChange(event){
        let column=event.target.name;
        let value=event.target.value;
        this.setState({
            [column]: value,
        });


    }
    handlePageChange(pageNumber){
        let any = localStorage.getItem('any');
        localStorage.setItem("page",pageNumber);
        if(any===''||any===null||any===undefined){
            this.props.dispatch(FetchBarang(pageNumber,''));
        }else{
            this.props.dispatch(FetchBarang(pageNumber,any));
        }
    }


    handlesearch(event){
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        let any = data.get('field_any');
        localStorage.setItem('any',any);
        if(any===''||any===null||any===undefined){
            this.props.dispatch(FetchBarang(1,''));
        }else{
            this.props.dispatch(FetchBarang(1,`&q=${any}`));
        }

    }

    toggleModal(e) {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formBarang"));
        this.props.dispatch(FetchKategoriBarang(1,'','999999'));
        this.props.dispatch(FetchKelompokBarang(1,'','999999'));
        this.props.dispatch(FetchBrand(1,'','999999'));
        this.setState({detail:undefined});
    }
    handleEnter(column){
        localStorage.setItem('column_search',`${column}`);
        let where='';
        let que = 'any_master';
        let sku=this.state.any_sku;
        let nama=this.state.any_nama;
        let kelompok=this.state.any_kelompok;
        let brand=this.state.any_brand;
        let tenant=this.state.any_tenant;
        if(sku!==''||nama!==''||kelompok!==''||brand!==''||tenant!==''){
            if(column==='any_sku'){
                if(where!==''){where+='&';}
                where+=`searchby=kode&q=${sku}`;
                localStorage.setItem(`${que}_sku`,sku);
            }
            if(column==='any_nama'){
                if(where!==''){where+='&';}
                where+=`searchby=title&q=${nama}`;
                localStorage.setItem(`${que}_nama`,nama);
            }
            if(column==='any_kelompok'){
                if(where!==''){where+='&';}
                where+=`searchby=kelompok&q=${kelompok}`;
                localStorage.setItem(`${que}_kelompok`,kelompok);
            }
            if(column==='any_brand'){
                if(where!==''){where+='&';}
                where+=`searchby=brand&q=${brand}`;
                localStorage.setItem(`${que}_brand`,brand);
            }
            if(column==='any_tenant'){
                if(where!==''){where+='&';}
                where+=`searchby=tenant&q=${tenant}`;
                localStorage.setItem(`${que}_tenant`,tenant);
            }
            
            this.props.dispatch(FetchBarang(1,where));
        }else{
            localStorage.removeItem(`${que}_sku`);
            localStorage.removeItem(`${que}_nama`);
            localStorage.removeItem(`${que}_kelompok`);
            localStorage.removeItem(`${que}_brand`);
            localStorage.removeItem(`${que}_tenant`);
            this.props.dispatch(FetchBarang(1,''));
        }
    }
    handleEdit(e,id) {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formBarang"));
        this.props.dispatch(FetchKategoriBarang(1,'','999'));
        this.props.dispatch(FetchKelompokBarang(1,'','999'));
        this.props.dispatch(FetchBrand(1,'','999'));
        this.props.dispatch(FetchDetailBarang(id));
        this.setState({
            detail:{
                "id":id
            }
        });
    }
    handleEditBertingkat(e,id) {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formBertingkat"));
        this.props.dispatch(FetchDetailBarang(id));
        this.setState({
            detail:{
                "id":id
            }
        });
    }
    handleDetail(e,id) {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("detailBarang"));
        this.props.dispatch(FetchDetailBarang(id));

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
                this.props.dispatch(deleteBarang(i,this.props.token));
            }
        })
    }
    render(){
        const {last_page,per_page,current_page,data} = this.props.data;
        const columnStyle = {verticalAlign: "middle", textAlign: "center",};
        return (
            <div>
                <form onSubmit={this.handlesearch} noValidate>
                    <div className="row">
                        <div className="col-10 col-xs-10 col-md-3">
                            <div className="form-group">
                                <label>Search</label>
                                <input type="text" className="form-control" name="field_any" defaultValue={localStorage.getItem('any')}/>
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
                        <thead className="bg-primary">
                        <tr>
                            <td/>
                            <td><input name="any_sku" value={this.state.any_sku} onChange={this.handleChange} onKeyPress={event=>{if(event.key==='Enter'){this.handleEnter('any_sku');}}} style={{width:"-webkit-fill-available"}} type="text" className="form-control" placeholder="SKU"/></td>
                            <td><input name="any_nama" value={this.state.any_nama} onChange={this.handleChange} onKeyPress={event=>{if(event.key==='Enter'){this.handleEnter('any_nama');}}} style={{width:"-webkit-fill-available"}} type="text" className="form-control" placeholder="Nama Barang"/></td>
                            {
                                this.props.auth.user.level!=='tenant'?
                            <td><input name="any_tenant" value={this.state.any_tenant} onChange={this.handleChange} onKeyPress={event=>{if(event.key==='Enter'){this.handleEnter('any_tenant');}}} style={{width:"-webkit-fill-available"}} type="text" className="form-control" placeholder="Tenant"/></td>:''
                            }
                            <td><input name="any_brand" value={this.state.any_brand} onChange={this.handleChange} onKeyPress={event=>{if(event.key==='Enter'){this.handleEnter('any_brand');}}} style={{width:"-webkit-fill-available"}} type="text" className="form-control" placeholder="Brand"/></td>
                            <td><input name="any_kelompok" value={this.state.any_kelompok} onChange={this.handleChange} onKeyPress={event=>{if(event.key==='Enter'){this.handleEnter('any_kelompok');}}} style={{width:"-webkit-fill-available"}} type="text" className="form-control" placeholder="Kelompok"/></td>
                            <td/>
                        </tr>
                        <tr>
                            <th className="text-light font-18" style={columnStyle}>#</th>
                            <th className="text-light font-18" style={columnStyle}>SKU</th>
                            <th className="text-light font-18" style={columnStyle}>Nama Barang</th>
                            {
                                this.props.auth.user.level!=='tenant'?
                                <th className="text-light font-18" style={columnStyle}>Tenant</th>:''
                            }
                            <th className="text-light font-18" style={columnStyle}>Brand</th>
                            <th className="text-light font-18" style={columnStyle}>Kelompok</th>
                            <th className="text-light font-18" style={columnStyle}>Stock</th>
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
                                                    <div className="btn-barang">
                                                        <UncontrolledButtonDropdown>
                                                            <DropdownToggle caret>
                                                                Aksi
                                                            </DropdownToggle>
                                                            <DropdownMenu>
                                                                <DropdownItem onClick={(e)=>this.handleDetail(e,v.id)}>Detail</DropdownItem>
                                                                <DropdownItem onClick={(e)=>this.handleEdit(e,v.id)}>Edit</DropdownItem>
                                                                <DropdownItem onClick={(e)=>this.handleEditBertingkat(e,v.id)}>Edit Harga Bertingkat</DropdownItem>
                                                                <DropdownItem onClick={(e)=>this.handleDelete(e,v.id)}>Delete</DropdownItem>
                                                            </DropdownMenu>
                                                            </UncontrolledButtonDropdown>
                                                    </div>
                                                </td>
                                                <td style={columnStyle}>{v.kode}</td>
                                                <td style={columnStyle}>{v.title}</td>
                                                {
                                                    this.props.auth.user.level!=='tenant'?
                                                    <td style={columnStyle}>{v.tenant}</td> : ''
                                                }
                                                <td style={columnStyle}>{v.brand}</td>
                                                <td style={columnStyle}>{v.kelompok}</td>
                                                <td style={columnStyle}>{v.stock}</td>
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

                <FormBarang detail={this.state.detail} data_detail={this.props.data_detail}/>
                <FormBertingkat detail={this.state.detail} data_detail={this.props.data_detail}/>
                <DetailBarang detail={this.state.detail}/>
                {/* <Detail/> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth,
        data_detail:state.barangReducer.data_detail,
    }
}
export default connect(mapStateToProps) (ListBarang);