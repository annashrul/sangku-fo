import React, {Component} from 'react'

class Cards extends Component {
    render(){
        return(
            <div className={this.props.className===undefined?'col-md-6 col-xl-6 box-margin':this.props.className}>
                <div className={this.props.bg===undefined?"card":"card "+this.props.bg}>
                    <div className="card-header bg-transparent border-bottom-0">{this.props.title}</div>
                    <div className="card-body">
                        <div className="row justify-content-between" style={{paddingLeft:12,paddingRight:12}}>
                            <h2><i className={this.props.icon}></i></h2>
                            <h2 style={{paddingLeft:5}} className="font-20">{this.props.data}</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cards;