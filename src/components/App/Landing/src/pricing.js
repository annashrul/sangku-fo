import React,{Component} from 'react';
// import Shake from 'react-reveal/Shake';
import Fade from 'react-reveal/Fade';

class Pricing extends Component{
    constructor(props){
        super(props);
        this.state={
            
        };
    }

    render(){
        const paket = this.props.data === undefined ? '' : this.props.data.data;
        return(
            <section id="pricing">
                <div className="row pricing-content">
                    <div className="col-four pricing-intro">
                    <Fade top>
                        <h1 className="intro-header" data-aos="fade-up">{this.props.data===undefined?'':this.props.data.title}</h1>
                        <p data-aos="fade-up" dangerouslySetInnerHTML={{ __html: this.props.data===undefined?'':this.props.data.deskripsi }}>
                        </p>
                    </Fade>
                    </div>
                    <div className="col-eight pricing-table">
                    <div className="row">
                        {/* <Shake> */}
                            <div className="col-md-4 p-md-0">
                            {/* BEGIN TABLE */}
                            <div className="table-default table2 blue">
                                {/* BEGIN TABLE HEADER */}
                                <div className="table__header">
                                <h2 className="table__header--title">{paket[0]===undefined?'':paket[0].title!=='-'?paket[0].title:''}</h2>
                                <img className="table__header--icon" src={paket[0]===undefined?'':paket[0].image} alt={paket[0]===undefined?'':paket[0].title} />
                                <p data-price={120} className="table__header--price">
                                   {paket[0]===undefined?'':paket[0].price}
                                </p>
                                </div>
                                {/* END TABLE HEADER */}
                                <div className="table__content">
                                {/* BEGIN TABLE LIST */}
                                <ul className="table__content--list" dangerouslySetInnerHTML={{ __html: paket[0]===undefined?'':paket[0].deskripsi }}>
                                </ul>
                                {/* END TABLE LIST */}
                                </div>
                                {/* BEGIN TABLE FOOTER */}
                                <div className="table__footer">
                                <a href={paket[0]===undefined?'':paket[0].link} className="button">Get Started</a>
                                </div>
                                {/* END TABLE FOOTER */}
                            </div>
                            {/* END TABLE */}
                            </div>
                            <div className="col-md-4 p-md-0" style={{zIndex:1}}>
                            {/* BEGIN TABLE */}
                            <div className="table-default table2 recommended cyan" >
                                {/* BEGIN TABLE HEADER */}
                                <div className="table__header">
                                <h2 className="table__header--title">{paket[1]===undefined?'':paket[1].title!=='-'?paket[1].title:''}</h2>
                                <img className="table__header--icon" src={paket[1]===undefined?'':paket[1].image} alt={paket[1]===undefined?'':paket[1].title} />
                                <p data-price={250} className="table__header--price">
                                    {paket[1]===undefined?'':paket[1].price}
                                </p>
                                </div>
                                {/* END TABLE HEADER */}
                                <div className="table__content">
                                {/* BEGIN TABLE LIST */}
                                <ul className="table__content--list" dangerouslySetInnerHTML={{ __html: paket[1]===undefined?'':paket[1].deskripsi }}>
                                </ul>
                                {/* END TABLE LIST */}
                                </div>
                                {/* BEGIN TABLE FOOTER */}
                                <div className="table__footer">
                                <a href={paket[1]===undefined?'':paket[1].link} className="button">Get Started</a>
                                </div>
                                {/* END TABLE FOOTER */}
                            </div>
                            {/* END TABLE */}
                            </div>
                            <div className="col-md-4 p-md-0">
                            {/* BEGIN TABLE */}
                            <div className="table-default table2 yellow">
                                {/* BEGIN TABLE HEADER */}
                                <div className="table__header">
                                <h2 className="table__header--title">{paket[2]===undefined?'': paket[2].title!=='-'?paket[2].title:''}</h2>
                                <img className="table__header--icon" src={paket[2]===undefined?'':paket[2].image} alt={paket[2]===undefined?'':paket[2].title} />
                                <p data-price={520} className="table__header--price">
                                    {paket[2]===undefined?'':paket[2].price}
                                </p>
                                </div>
                                {/* END TABLE HEADER */}
                                <div className="table__content">
                                {/* BEGIN TABLE LIST */}
                                <ul className="table__content--list" dangerouslySetInnerHTML={{ __html: paket[2]===undefined?'':paket[2].deskripsi }}>
                                </ul>
                                {/* END TABLE LIST */}
                                </div>
                                {/* BEGIN TABLE FOOTER */}
                                <div className="table__footer">
                                <a href={paket[2]===undefined?'':paket[2].link} className="button">Get Started</a>
                                </div>
                                {/* END TABLE FOOTER */}
                            </div>
                            {/* END TABLE */}
                            </div>
                        {/* </Shake> */}
                       
                    </div>             
                    </div> {/* end pricing-table */}
                </div> {/* end pricing-content */}
                </section>

        );
    }
}

export default Pricing;