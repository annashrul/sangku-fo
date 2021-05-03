import React,{Component} from 'react';
import {connect} from "react-redux";
import imgMt from './img/Wavy_Tech-08_Single-04.png'
import Ellipse_7 from './img/animate_icon/Ellipse_7.png'
import Ellipse_8 from './img/animate_icon/Ellipse_8.png'
import Ellipse_1 from './img/animate_icon/Ellipse_1.png'
import Ellipse_2 from './img/animate_icon/Ellipse_2.png'
import Ellipse_3 from './img/animate_icon/Ellipse_3.png'
import Ellipse_4 from './img/animate_icon/Ellipse_4.png'
// <!doctype html>
// <html lang="zxx">


// <head>
//     <!-- Required meta tags -->
//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
//     <title>ecobit</title>
//     <link rel="icon" href="img/favicon.png">
//     <!-- Bootstrap CSS -->
//     <link rel="stylesheet" href="css/bootstrap.min.css">
//     <!-- animate CSS -->
//     <link rel="stylesheet" href="css/animate.css">
//     <!-- owl carousel CSS -->
//     <link rel="stylesheet" href="css/owl.carousel.min.css">
//     <!-- font awesome CSS -->
//     <link rel="stylesheet" href="css/all.css">
//     <!-- flaticon CSS -->
//     <link rel="stylesheet" href="css/flaticon.css">
//     <link rel="stylesheet" href="css/themify-icons.css">
//     <!-- font awesome CSS -->
//     <link rel="stylesheet" href="css/magnific-popup.css">
//     <!-- swiper CSS -->
//     <link rel="stylesheet" href="css/slick.css">
//     <!-- style CSS -->
//     <link rel="stylesheet" href="css/style.css">
// </head>
class Maintenance extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            load:true
        }
        
    }

    componentDidMount(){
        this.initFetch(false);
    }

    initFetch(check){
        document.getElementsByTagName('body')[0].style.zoom = '100%';
        document.getElementsByTagName('body')[0].style.background = '#fff';
        var head = document.getElementsByTagName('head')[0];
        var cssnode = document.createElement('link');

        cssnode.type = 'text/css';
        cssnode.rel = 'stylesheet';
        cssnode.href = 'maintenance/css/owl.carousel.min.css';
        head.appendChild(cssnode);

        var cssnode2 = document.createElement('link');

        cssnode2.type = 'text/css';
        cssnode2.rel = 'stylesheet';
        cssnode2.href = 'maintenance/css/all.css';
        head.appendChild(cssnode2);

        var cssnode3 = document.createElement('link');

        cssnode3.type = 'text/css';
        cssnode3.rel = 'stylesheet';
        cssnode3.href = 'maintenance/css/flaticon.css';
        head.appendChild(cssnode3);

        var cssnode4 = document.createElement('link');

        cssnode4.type = 'text/css';
        cssnode4.rel = 'stylesheet';
        cssnode4.href = 'maintenance/css/themify-icons.css';
        head.appendChild(cssnode4);

        var cssnode5 = document.createElement('link');

        cssnode5.type = 'text/css';
        cssnode5.rel = 'stylesheet';
        cssnode5.href = 'maintenance/css/magnific-popup.css';
        head.appendChild(cssnode5);

        var cssnode6 = document.createElement('link');

        cssnode6.type = 'text/css';
        cssnode6.rel = 'stylesheet';
        cssnode6.href = 'maintenance/css/slick.css';
        head.appendChild(cssnode6);

        var cssnode7 = document.createElement('link');

        cssnode7.type = 'text/css';
        cssnode7.rel = 'stylesheet';
        cssnode7.href = 'maintenance/css/style.css';
        head.appendChild(cssnode7);
        
    }
    componentWillUnmount(){
        document.getElementsByTagName('body')[0].style.zoom='90%';
        document.getElementsByTagName('body')[0].style.background = '#f9fafb';

        document.querySelector("link[href='maintenance/css/owl.carousel.min.css']").remove()
        document.querySelector("link[href='maintenance/css/all.css']").remove()
        document.querySelector("link[href='maintenance/css/flaticon.css']").remove()
        document.querySelector("link[href='maintenance/css/themify-icons.css']").remove()
        document.querySelector("link[href='maintenance/css/magnific-popup.css']").remove()
        document.querySelector("link[href='maintenance/css/slick.css']").remove()
        document.querySelector("link[href='maintenance/css/style.css']").remove()
    }
    render(){
        return(
            <section className="banner_part">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                    <div className="col-lg-5">
                        <div className="banner_img d-none d-lg-block" style={{marginTop: '-180px'}}>
                        <img src={imgMt} alt="img" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="banner_text">
                        <div className="banner_text_iner">
                            <h1>Kami saat ini sedang Maintenance.</h1>
                            <p> Kami akan segera terhubung kembali secepatnya.</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <img src={Ellipse_7} alt="img" className="feature_icon_1 custom-animation1" />
                <img src={Ellipse_8} alt="img" className="feature_icon_2 custom-animation2" />
                <img src={Ellipse_1} alt="img" className="feature_icon_3 custom-animation3" />
                <img src={Ellipse_2} alt="img" className="feature_icon_4 custom-animation4" />
                <img src={Ellipse_3} alt="img" className="feature_icon_5 custom-animation5" />
                <img src={Ellipse_4} alt="img" className="feature_icon_6 custom-animation6" />
            </section>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        sites: state.siteReducer.data,
        isloading: state.siteReducer.isLoading
    }
}


export default connect(mapStateToProps)(Maintenance);