import React from 'react'
import { Redirect, useHistory } from 'react-router';

const AddContact = () => {

    state = {
        name: "",
        email: ""
    }

    const history = useHistory();

    add = (e) => {
        e.preventDefault();
        if (this.state.name === "" && this.state.email === "") {
            alert("All fields are mandatory");
            return
        }
        this.props.addContactHandler(this.state);
        this.setState({name: "", email: ""});
        history.push("/");
        // console.log(this.state);
    }

    return (
        <div className="ui main">
            <h2>Add Contact</h2>
            <form className="ui form" onSubmit={this.add}>
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

                <button className="ui button blue">Add</button>

            </form>
        </div>
    )
};

export default AddContact;