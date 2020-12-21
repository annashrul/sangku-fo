import React, { Component } from 'react';
import {connect} from "react-redux";
import {Card, CardBody, CardHeader} from "reactstrap";
import Layout from 'components/Layout';
import Skeleton from 'react-loading-skeleton';
import {toRp} from "../../../helper";
import {deleteCart, getCart, postCart} from "../../../redux/actions/product/cart.action";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import {NOTIF_ALERT} from "../../../redux/actions/_constants";

class IndexCheckout extends Component{
    constructor(props){
        super(props);

    }
    componentWillMount(){
        this.props.dispatch(getCart());
    }

    render(){

        return(
            <Layout page="Checkout">
                <Card>
                    <CardBody>
                        <div className="row">
                            <div className="col-md-8  box-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="check-out-area">
                                            <h4 className="card-title">Billing address</h4>
                                            <form className="needs-validation">
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label className="font-15 text-dark">First name</label>
                                                        <input type="text" className="form-control" id="firstName" placeholder="" value="" required=""/>
                                                        <div className="invalid-feedback">
                                                            Valid first name is required.
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label className="font-15 text-dark">Last name</label>
                                                        <input type="text" className="form-control" id="lastName" placeholder="" value="" required=""/>
                                                        <div className="invalid-feedback">
                                                            Valid last name is required.
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="font-15 text-dark">Username</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">@</span>
                                                        </div>
                                                        <input type="text" className="form-control" id="username" placeholder="Username" required=""/>
                                                        <div className="invalid-feedback" style={{width:" 100%"}}>
                                                            Your username is required.
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="font-15 text-dark">Email <span className="text-muted">(Optional)</span></label>
                                                    <input type="email" className="form-control" id="email" placeholder="you@example.com"/>
                                                    <div className="invalid-feedback">
                                                        Please enter a valid email address for shipping updates.
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="font-15 text-dark">Address</label>
                                                    <input type="text" className="form-control" id="address" placeholder="1234 Main St" required=""/>
                                                    <div className="invalid-feedback">
                                                        Please enter your shipping address.
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="font-15 text-dark">Address 2 <span className="text-muted font-14">(Optional)</span></label>
                                                    <input type="text" className="form-control" id="address2" placeholder="Apartment or suite"/>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-5 mb-3">
                                                        <label className="font-15 text-dark">Country</label>
                                                        <select className="custom-select d-block w-100" id="country" required="">
                                                            <option value="">Choose...</option>
                                                            <option>United States</option>
                                                        </select>
                                                        <div className="invalid-feedback">
                                                            Please select a valid country.
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mb-3">
                                                        <label className="font-15 text-dark">State</label>
                                                        <select className="custom-select d-block w-100" id="state" required="">
                                                            <option className="font-14" value="">Choose...</option>
                                                            <option className="font-14">California</option>
                                                        </select>
                                                        <div className="invalid-feedback">
                                                            Please provide a valid state.
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 mb-3">
                                                        <label className="text-dark">Zip</label>
                                                        <input type="text" className="form-control" id="zip" placeholder="" required=""/>
                                                        <div className="invalid-feedback font-14">
                                                            Zip code required.
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="mb-4"/>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="same-address"/>
                                                    <label className="custom-control-label font-14">Shipping address is the same as my billing address</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="save-info"/>
                                                    <label className="custom-control-label font-14">Save this information for next time</label>
                                                </div>
                                                <hr className="mb-4"/>

                                                <h4 className="mb-3 font-18">Payment</h4>

                                                <div className="d-block my-3">
                                                    <div className="custom-control custom-radio">
                                                        <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked="" required=""/>
                                                        <label className="custom-control-label font-14">Credit card</label>
                                                    </div>
                                                    <div className="custom-control custom-radio">
                                                        <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required=""/>
                                                        <label className="custom-control-label font-14">Debit card</label>
                                                    </div>
                                                    <div className="custom-control custom-radio">
                                                        <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required=""/>
                                                        <label className="custom-control-label font-14">PayPal</label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label className="font-15">Name on card</label>
                                                        <input type="text" className="form-control" id="cc-name" placeholder="" required=""/>
                                                        <small className="text-muted font-14">Full name as displayed on card</small>
                                                        <div className="invalid-feedback font-14">
                                                            Name on card is required
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label className="font-15">Credit card number</label>
                                                        <input type="text" className="form-control" id="cc-number" placeholder="" required=""/>
                                                        <div className="invalid-feedback font-14">
                                                            Credit card number is required
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 mb-3">
                                                        <label className="font-15">Expiration</label>
                                                        <input type="text" className="form-control" id="cc-expiration" placeholder="" required=""/>
                                                        <div className="invalid-feedback font-14">
                                                            Expiration date required
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 mb-3">
                                                        <label className="font-15">CVV</label>
                                                        <input type="text" className="form-control" id="cc-cvv" placeholder="" required=""/>
                                                        <div className="invalid-feedback font-14">
                                                            Security code required
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="mb-4"/>
                                                <button className="btn btn-primary font-14" type="submit">Continue to checkout</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 box-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="card-title mb-0">Your cart</span>
                                            <span className="badge badge-primary font-14 badge-pill">{this.props.resCart.length}</span>
                                        </h4>
                                        <ul className="list-group mb-3">
                                            {
                                                this.props.resCart.map((v,i)=>{
                                                    return (
                                                        <li key={i} className="list-group-item d-flex justify-content-between lh-condensed">
                                                            <div>
                                                                <div className="checkout-thumb mb-10">
                                                                    <img src={"https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png"} alt="Product"/>
                                                                </div>
                                                                <h6 className="mb-0 font-14">{v.title}</h6>
                                                            </div>
                                                            <span className="font-weight-bold text-success text-right">{v.qty} X {toRp(v.harga)}
                                                                <hr/> {toRp(parseInt(v.qty)*parseInt(v.harga))}
                                                            </span>
                                                        </li>
                                                    );
                                                })
                                            }

                                        </ul>

                                        <form className="card p-2">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Promo code"/>
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-primary">Redeem</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </CardBody>
                </Card>
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        auth: state.auth,
        resCart:state.cartReducer.data,
        isLoading: state.cartReducer.isLoading,
    }
}
export default connect(mapStateToProps)(IndexCheckout);