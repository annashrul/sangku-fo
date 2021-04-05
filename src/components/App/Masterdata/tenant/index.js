import React,{Component} from 'react';
import Layout from "../../../Layout";
import connect from "react-redux/es/connect/connect";
import {
    FetchTenant,
    FetchDetailTenant,
    FetchDelete,
    updateTenant,
    setTenantDetail
} from "redux/actions/masterdata/tenant/tenant.action";
import Paginationq from 'helper';
import List from './src/list'
import Skeleton from './src/skeleton_list'
import Filter from './src/filter'
import Details from 'components/App/modals/masterdata/tenant/detail'
import Forms from 'components/App/modals/masterdata/tenant/form'
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import PenanggungJawab from 'components/App/modals/masterdata/tenant/penanggungjawab'
import Swal from "sweetalert2";

class Tenant extends Component{
    constructor(props){
        super(props);
        this.state = {
            token:'',
            activeTab : 0,
            selectedIndex : 0,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
        this.handleForm = this.handleForm.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleStatus = this.handleStatus.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.auth.user) {
        }
    }
    componentWillMount(){
        this.props.dispatch(FetchTenant());
    }

    handlePageChange(pageNumber) {
        let any = localStorage.getItem('search_tenant');
        localStorage.setItem("page_tenant", pageNumber);
        if (any === '' || any === null || any === undefined) {
            this.props.dispatch(FetchTenant(pageNumber, ''));
        } else {
            this.props.dispatch(FetchTenant(pageNumber, any));
        }
    }

    toggleModal(type) {
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType(type));
    }

    handleDetail(e, id, isEdit=false) {
        e.preventDefault();
        this.props.dispatch(FetchDetailTenant(id));
        if(!isEdit){
            this.toggleModal('DetailTenant');
        }else{
            this.toggleModal('FormTenant');
            this.props.dispatch(setTenantDetail(''));

        }
    }

    handleForm(e) {
        e.preventDefault();
        this.toggleModal('FormTenant');
        this.props.dispatch(setTenantDetail(''));
    }

    handleSearch(e,q) {
        e.preventDefault();
        localStorage.setItem("search_tenant", q);
        this.props.dispatch(FetchTenant(1, q));
        this.props.dispatch(setTenantDetail(''));
    }

    handleDelete(e,id){
        e.preventDefault()
        Swal.fire({
            title: 'Apakah anda yakin?',
            text: "Data yang sudah dihapus tidak bisa dikembalikan.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(FetchDelete(id));
            }
        })
    }

    handleStatus(e,id,status){
        e.preventDefault()
        Swal.fire({
            title: 'Apakah anda yakin?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, ubah!'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(updateTenant(id, {status:status===0?1:0}))
            }
        })
    }

    render(){
        const columnStyle = {
            verticalAlign: "middle",
            textAlign: "center"
        };
        const {
            last_page,
            per_page,
            current_page,
            data
        }=this.props.tenant
        return (
            <Layout page="Tenant" headers="Management Tenant">
                <div className="row">
                    <div className="col-12 box-margin">
                        <div className="card">
                            <div className="card-body">
                                <Filter 
                                    handleForm={this.handleForm}
                                    handleSearch={this.handleSearch}
                                />
                                <div style={{overflowX: "auto",zoom:'90%'}}>
                                    <table className="table layout-table table-hover">
                                        <thead className="bg-purple">
                                        <tr>
                                            <th className="text-white" style={columnStyle}></th>
                                            <th className="text-white" style={columnStyle}>#</th>
                                            <th className="text-white" style={columnStyle}>Nama</th>
                                            <th className="text-white" style={columnStyle}>Email</th>
                                            <th className="text-white" style={columnStyle}>Telp.</th>
                                            <th className="text-white" style={columnStyle}>Status</th>
                                            <th className="text-white" style={columnStyle}>Tgl Join</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            (
                                                typeof data === 'object' ?
                                                    data.map((v,i)=>{
                                                        return(
                                                            <List
                                                                key={i}
                                                                data={v}
                                                                toggle={this.handleDetail}
                                                                handleDelete={this.handleDelete}
                                                                handleStatus={this.handleStatus}
                                                            />
                                                        )
                                                    })
                                                    : 
                                                    (() => {
                                                        const list=[]
                                                            for (let x = 0; x < 10; x++) {
                                                                 list.push(<Skeleton key={x} />)
                                                            }
                                                            return list
                                                        })()
                                                    
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
                        </div>
                    </div>
                </div>
                <Details/>
                <Forms/>
                <PenanggungJawab/>
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    
    return {
        tenant:state.tenantReducer.data,
        isLoading: state.tenantReducer.isLoading,
        auth: state.auth

    }
}

export default connect(mapStateToProps)(Tenant)