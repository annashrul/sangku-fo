import React,{Component} from 'react';
import {
    statusQ
} from "helper";

import moment from 'moment'
import {
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from 'reactstrap';
class ListBrand extends Component{
    render(){
        const columnStyle = {verticalAlign: "middle", textAlign: "center",};
        const v = this.props.data
        return (
            <tr >
            <td style={columnStyle}>{/* Example split danger button */}
                <div className="btn-brand">
                    <UncontrolledButtonDropdown>
                        <DropdownToggle caret color="primary">
                            Aksi
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={(e)=>this.props.toggle(e,v.id)}><i className="fa fa-eye"/> Detail</DropdownItem>
                            <DropdownItem onClick={(e)=>this.props.toggle(e,v.id,true)}><i className="fa fa-edit"/> Edit</DropdownItem>
                            <a target="_blank" href={'https://maps.google.com/?q='+v.lat+','+v.long}><DropdownItem><i className="fa fa-map-marker"/> Lokasi</DropdownItem></a>
                            {
                                v.status === 1 ? (
                                    <DropdownItem onClick={(e)=>this.props.handleStatus(e,v.id,1)}><i className="fa fa-close"/> Non-aktifkan</DropdownItem>
                                ):(
                                    <DropdownItem onClick={(e)=>this.props.handleStatus(e,v.id,0)}><i className="fa fa-check"/> Aktifkan</DropdownItem>
                                )
                            }
                            <DropdownItem onClick={(e)=>this.props.handleDelete(e,v.id)}><i className="fa fa-trash"/> Hapus</DropdownItem>

                        </DropdownMenu>
                        </UncontrolledButtonDropdown>
                </div>
            </td>
            <td style={columnStyle}>{/* Example split danger button */}
                <img alt="logos" src={v.logo} width="60px"/>
            </td>
            <td style={columnStyle}>{v.nama}</td>
            <td style={columnStyle}><a href={'mailto:'+v.email}>{v.email}</a></td>
            <td style={columnStyle}><a href={'tel:'+v.telp}><i className="fa fa-phone"/> {v.telp}</a></td>
            <td style={columnStyle}>{v.status===1?statusQ('success','Aktif'): statusQ('danger','Tidak Aktif')}</td>
            
            <td style={columnStyle}>{moment(v.created_at).format('llll')}</td>

        </tr>
        )
    }
}

export default (ListBrand);