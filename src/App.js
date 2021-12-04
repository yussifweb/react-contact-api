import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {uuid} from 'uuidv4';
import api from './api/contacts';
import './App.css';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import ContactList from './components/ContactList';
import Header from './components/Header';

function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  // get contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  const addContactHandler = async (contact) =>{
    console.log(contact);
    const request = {...contact};

    const response = await api.post("/contacts", request)
    // setContacts([...contacts, {id: uuid(), ...contact}]);
    setContacts([...contacts, response.data]);
  }

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const {id, name, email} = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? {...response.data} : contact;
      })
    );
  };

  const removeContactHandler = async (id) =>{
    await api.delete(`contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }

  useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if(retrieveContacts) setContacts(retrieveContacts);

    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
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

        <Route exact path="/edit">
          <EditContact updateContactHandler={updateContactHandler} />
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