import React from 'react'
import user from "../images/Person.png"

const ContactCard = (props) => {
    const {id, name, email} = props.contact;
    return (
        <div className="ui items">
        <div className="item">
            <div className="ui tiny image">
            <img className="ui avatar image" src={user} alt="" />
            </div>
            <div className="middle aligned content">
            <div className="header">{name}</div>
            <div className="description"><p>{email}</p></div>
            <div className="ui right floated" style={{marginTop: "-19px"}}>
                <i className="big trash alternate outline icon red" onClick={() => props.clickHandler(id)}></i>
            </div>
            </div>
        </div>
        </div>

    )
}

export default ContactCard