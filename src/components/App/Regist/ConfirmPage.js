import React,{Component} from 'react';
import {connect} from "react-redux";

class ConfirmPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="jumbotron text-center">
                        <h1 className="display-3">Thank You!</h1>
                        <p className="lead"><strong>Please upload your transaction proof</strong> for further instructions on how to complete your account setup.</p>
                        <hr />
                        <p>
                            Having trouble? <a href>Contact us</a>
                        </p>
                        <p className="lead">
                            <a className="btn btn-primary btn-sm" href="https://sangqu.id/" role="button">Continue to homepage</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}


export default connect(mapStateToProps)(ConfirmPage);