import React, {Component} from 'react'
import Chart from "react-apexcharts";

class Charts extends Component {
    render(){
        return(
             <div className="col-md-12">
                <div className="card text-center">
                    <div className="card-body">
                        <h4 className="card-title">{this.props.title}</h4>
                        <Chart
                            options={this.props.data.options}
                            series={this.props.data.series}
                            type={this.props.type}
                            height="353"
                            />
                    </div>
                </div>
            </div>
        )
    }
}

export default Charts;