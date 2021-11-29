import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {uuid} from 'uuidv4';
import './App.css';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import Header from './components/Header';

function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) =>{
    console.log(contact);
    setContacts([...contacts, {id: uuid(), ...contact}]);
  }

  const removeContactHandler = (id) =>{
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }

  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retrieveContacts) setContacts(retrieveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>

      <Header />

      <Switch>
        <Route exact path="/add">
          <AddContact addContactHandler={addContactHandler} />
        </Route>

        <Route exact path="/">
          <ContactList contacts={contacts} getContactId={removeContactHandler}/>
        </Route>

        </Switch>
        
      </Router>
 </div>
         
  );
}

export default App;