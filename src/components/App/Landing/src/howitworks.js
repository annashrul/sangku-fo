import React,{Component} from 'react';
import Fade from 'react-reveal/Fade';


class About extends Component{
    constructor(props){
        super(props);
        this.state={
            
        };
    }

    render(){
        return(
            <div className="row about-how">
                <h1 className="intro-header" style={{margin:'0 auto'}}>Bagaimana Sangqu Bekerja ?</h1>           
                <div className="about-how-content">
                <div className="about-how-steps block-1-2 block-tab-full group">
                    <Fade top>
                        <div className="bgrid step">
                            <h3><i className="fa fa-newspaper-o"/> Daftar Melalui Upline anda!</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore veritatis quas ipsum est ipsa inventore quaerat architecto neque. Odit, amet harum. Nihil unde error veritatis omnis velit, ab perspiciatis nobis!
                            </p> 
                            </div>
                            <div className="bgrid step">
                            <h3><i className="fa fa-newspaper-o"/> Login melalui website atau aplikasi Sangqu</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore veritatis quas ipsum est ipsa inventore quaerat architecto neque. Odit, amet harum. Nihil unde error veritatis omnis velit, ab perspiciatis nobis!
                            </p> 
                            </div>               
                            <div className="bgrid step">
                            <h3><i className="fa fa-newspaper-o"/> Mulai bangun jaringan anda!</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore veritatis quas ipsum est ipsa inventore quaerat architecto neque. Odit, amet harum. Nihil unde error veritatis omnis velit, ab perspiciatis nobis!
                            </p> 
                            </div>
                            <div className="bgrid step">
                            <h3><i className="fa fa-newspaper-o"/> Pasif income mengunggu anda.</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore veritatis quas ipsum est ipsa inventore quaerat architecto neque. Odit, amet harum. Nihil unde error veritatis omnis velit, ab perspiciatis nobis!
                            </p> 
                        </div>  
                    </Fade>
                </div>           
                </div> {/* end about-how-content */}
            </div>
        );
    }
}

export default About;