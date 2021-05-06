import React, {Component} from 'react'
// import {toRp} from "helper";
// import Chart from "react-apexcharts";
import { Pie } from "react-chartjs-2";

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: { 
                responsive: false, 
                maintainAspectRatio: false, 
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: "white"
                        },
                        position:'right'
                    }
                }
            },
            dataPie: {
            labels: [`${this.props.pv_kiri} Kiri`,`${this.props.pv_kanan} Kanan`],
            datasets: [
                {
                data: this.props.pie_series,
                backgroundColor: [
                    "#008ffb",
                    "#00e396",
                ],
                hoverBackgroundColor: [
                    "#57b7ff",
                    "#64ffca",
                ],
                hoverOffset: 2
                }
            ]
            }
        };
    }
    render(){
        return(
            <div className="card h-100">
                <div className="card-header heading-footer" style={{background:`url('https://image.freepik.com/free-vector/abstract-realistic-technology-particle-background_52683-33063.jpg')`,backgroundSize:'cover'}}>
                    <h6>Pertumbuhan Anda</h6>
                </div>
                <div className="card-block text-center">
                    <div className="panel-team-profile-img">
                          {/* <Chart options={this.state.options} series={this.props.pie_series} type="pie" width={250} height="125.7px" /> */}
                          <Pie data={this.state.dataPie} options={this.state.options} redraw={true} width={250} height={130}/>
                    </div>
                    {/* <div className="saldo-aktif-title">
                        <h1>Saldo Aktif</h1>
                    </div> */}
                    <div className="content-widget-dashboard" style={{paddingTop:0}}>
                        <div className="row">
                            <div className='col-md-6 col-6'>
                                <div className="card">
                                    <div className="card-body" style={{padding:'10px'}}>
                                        <div className="row">
                                            <div className="col-12">
                                                <h5>{this.props.reward_kiri}</h5>
                                                <p className="title-widget-team mb-0">Reward Kiri</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 col-6'>
                                <div className="card">
                                    <div className="card-body" style={{padding:'10px'}}>
                                        <div className="row">
                                            <div className="col-12">
                                                <h5>{this.props.reward_kanan}</h5>
                                                <p className="title-widget-team mb-0">Reward Kanan</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3 mb-4">
                            <div className='col-md-6 col-6'>
                                <div className="card">
                                    <div className="card-body" style={{padding:'10px'}}>
                                        <div className="row">
                                            <div className="col-12">
                                                <h5>{this.props.point_ro}</h5>
                                                <p className="title-widget-team mb-0">Poin Blanza</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 col-6'>
                                <div className="card">
                                    <div className="card-body" style={{padding:'10px'}}>
                                        <div className="row">
                                            <div className="col-12">
                                                <h5>{this.props.sponsor}</h5>
                                                <p className="title-widget-team mb-0">Sponsor</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                         {/* <div className="row mt-3 mb-4">
                            <div className='col-md-12'>
                                <div className="card">
                                    <div className="card-body" style={{padding:'10px'}}>
                                        <div className="row">
                                            <div className="col-12">
                                                <h5><small>Rp</small> {toRp(this.props.plafon)}</h5>
                                                <p className="title-widget-team mb-0">SangQuota</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

        )
    }
}

export default Overview;