import React, {Component} from 'react'
import {noImage} from "helper";
import Chart from "react-apexcharts";

class Overview extends Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [1500000, 3000000],
            options: {
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: ['Kiri','Kanan'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },


        };
    }
    render(){
        return(
            <div className="card">
                <div className="card-header heading-footer" style={{background:`url('https://image.freepik.com/free-vector/abstract-realistic-technology-particle-background_52683-33063.jpg')`,backgroundSize:'cover'}}>
                    <h6>Pertumbuhan Anda</h6>
                </div>
                <div className="card-block text-center">
                    <div className="panel-team-profile-img">
                          <Chart options={this.state.options} series={this.state.series} type="pie" width={250} />
                    </div>
                    {/* <div className="saldo-aktif-title">
                        <h1>Saldo Aktif</h1>
                    </div> */}
                    <div className="content-widget-dashboard" style={{paddingTop:0}}>
                        <div className="row">
                            <div className='col-md-6'>
                                <div className="card">
                                    <div className="card-body" style={{padding:'10px'}}>
                                        <div className="row">
                                            <div className="col-12">
                                                <h5>40</h5>
                                                <p className="title-widget-team mb-0">PV Kiri</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="card">
                                    <div className="card-body" style={{padding:'10px'}}>
                                        <div className="row">
                                            <div className="col-12">
                                                <h5>40</h5>
                                                <p className="title-widget-team mb-0">PV Kanan</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3 mb-4">
                            <div className='col-md-6'>
                                <div className="card">
                                    <div className="card-body" style={{padding:'10px'}}>
                                        <div className="row">
                                            <div className="col-12">
                                                <h5>5000</h5>
                                                <p className="title-widget-team mb-0">Poin Repeat Order</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="card">
                                    <div className="card-body" style={{padding:'10px'}}>
                                        <div className="row">
                                            <div className="col-12">
                                                <h5>70</h5>
                                                <p className="title-widget-team mb-0">Sponsor</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div className="row mt-3 mb-4">
                            <div className='col-md-12'>
                                <div className="card">
                                    <div className="card-body" style={{padding:'10px'}}>
                                        <div className="row">
                                            <div className="col-12">
                                                <h5><small>Rp</small> 3.000.000</h5>
                                                <p className="title-widget-team mb-0">SangQuota</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Overview;