import React from 'react';
import { withRouter } from 'react-router';

class EditContact extends React.Component {
    
    constructor (props) {
        super(props)
        const {id, name, email} = props.location.state.contact;
        this.state = {
            id, name, email,
        };
    }
    // state = { name: "", email: "",};

    update = (e) => {
        e.preventDefault();
        if (this.state.name === "" || this.state.email === "") {
            alert("All fields are mandatory");
            return;
        }
        this.props.updateContactHandler(this.state);
        this.setState({name: "", email: ""});
        this.props.history.push("/");
        
    };

    render(){
    return (
        <div className="ui main" style={{paddingTop: "50px"}}>
            <h2>Update Contact</h2>
            <form className="ui form" onSubmit={this.update}>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="" value={this.state.name}
                    onChange={(e) => this.setState({name: e.target.value})} />
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" value={this.state.email}
                    onChange={(e) => this.setState({email: e.target.value})} />
                </div>

                <button className="ui button blue">Update</button>

            </form>
        </div>
    );
    }
}

export default withRouter(EditContact);