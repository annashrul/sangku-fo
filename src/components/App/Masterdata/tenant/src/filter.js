import React,{Component} from 'react';
class Filter extends Component{
    constructor(props){
        super(props);
       this.state={
           search:''
       }
       this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        this.setState({
            search: localStorage.getItem('search_tenant')
        })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render(){
        return (
            <div className="row">
                <div className="col-10 col-xs-10 col-md-3">
                    <div className="form-group">
                        <label>Search</label>
                        < input type = "text"
                        className = "form-control"
                        onChange = {
                            this.handleChange
                        }
                        onKeyPress = {
                            event => {
                                if (event.key === 'Enter') {
                                    this.props.handleSearch(event, this.state.search)
                                }
                            }
                        }
                        name = "search"
                        value = {
                            this.state.search
                        }
                        />
                    </div>
                </div>
                <div className="col-2 col-xs-2 col-md-3">
                    <div className="form-group">
                        <button style={{marginTop:"27px",marginRight:"2px"}} type="submit" onClick={(e)=>this.props.handleSearch(e, this.state.search)}  className="btn btn-primary"><i className="fa fa-search"/></button>
                        <button style={{marginTop:"27px"}} type="button" onClick={(e)=>this.props.handleForm(e)} className="btn btn-primary"><i className="fa fa-plus"/></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default (Filter);