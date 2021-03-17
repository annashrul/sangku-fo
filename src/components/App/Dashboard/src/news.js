import React, {Component} from 'react'
// import Chart from "react-apexcharts";
import { Link } from 'react-router-dom';

class Charts extends Component {
    render(){
        return(
             <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title">Berita Terbaru</h5>
                    <div className="row" style={{overflowX:'auto', height:'300px'}}>
                        {
                            typeof this.props.list.data === 'object' ? this.props.list.data.length>0?
                                this.props.list.data.map((v,i)=>{
                                return(
                                    <div className="col-12">
                                        <div className="single-widget-timeline mb-15  border-bottom zoom-hover">
                                            <Link to={`/konten/berita/${v.id}`}>
                                                <div className="d-flex">
                                                    <div className="mr-2 w-auto">
                                                    <a href="#!"><img className="rounded" style={{width: '40px', height:'40px'}} src={v.picture} alt="chat-user" /></a>
                                                    </div>
                                                    <div className="media-body w-75">
                                                    <h6 className="d-inline-block">{v.title}</h6>
                                                    {/* <p className="mb-0">Lorem Ipsum is simply…</p> */}
                                                    <div dangerouslySetInnerHTML={{__html: String(v.caption).replace(/(<([^>]+)>)/ig,'').substr(0,80)+' ...'}} />
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                            : "No data." : "No data."
                        }
                        <div className="col-12 text-center mt-2">
                            <Link to={'/konten/berita'} className="btn btn-outline-primary border-none btn-block bg-transparent text-primary">SEMUA BERITA</Link>
                        </div>
                    </div>
                </div>
                </div>

        )
    }
}

export default Charts;