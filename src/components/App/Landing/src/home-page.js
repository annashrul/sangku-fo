import React,{Component} from 'react';
// import Iphone from './iphone.png'
// import HeadShake from 'react-reveal/HeadShake';
// import Flip from 'react-reveal/Flip';


class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            
        };
        document.title = this.props.site_title===undefined?'sangQu':this.props.site_title+' - '+this.props.title
    }

    render(){
        return(
            <section id="home-pages">
                <div className="overlay" />
                <div className="home-content" style={{
                    background:`url('${this.props.data===undefined?'':this.props.data.background}')`,backgroundPosition:'center',backgroundRepeat: 'no-repeat', backgroundSize:'cover'
                }}>        
                    <div className="row contents">                     
                        <div className="home-content-pages">
                            <h1>{this.props.title}</h1>
                        </div>
                    </div>
                </div> {/* end home-content */}
            </section>

        );
    }
}

export default Home;