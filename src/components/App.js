import { useState, useEffect } from "react"
import { ContactForm } from "./ContactForm"
import { nanoid } from "nanoid"
import { ContactList } from "./ContactList"
import { Filter } from "./Filter"
import { AppWrapper } from "./App.styled"

const storageKey = 'storage-key';

const getContacts = () => {
  const savedContacts = localStorage.getItem(storageKey);
  return savedContacts !== null ? JSON.parse(savedContacts) : 
  [{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'}]
}

export const App = () => {

  const [contacts, setContacts] = useState(getContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {}, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(contacts))
  }, [contacts]);

  const updateFilter = newFilter => {
    setFilter(newFilter)
  }

  const addContact = newContact => {
    const isNameExists = contacts.some(contact => contact.name.toLowerCase()===newContact.name.toLowerCase());

    if(isNameExists){
      alert(`${newContact.name} is already in contacts!`);
    } else{
      const contact = {
        ...newContact,
        id: nanoid()
      };
      setContacts(prevContacts => [...prevContacts, contact])
    }
  }

  const deleteContact = (contactId) => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== contactId))
  }

      const visibleContacts = contacts.filter(contact => {
      const hasContact = contact.name.toLowerCase().includes(filter.toLowerCase());

      return hasContact;
    })

    return(
      <AppWrapper>
        <h1>Phonebook</h1>
        <ContactForm onAdd={addContact}/>
        <h2>Contacts</h2>
        <Filter filter={filter} onUpdate={updateFilter}/>
        {contacts.length>0 && <ContactList items={visibleContacts} onDelete={deleteContact}/>}
      </AppWrapper>
    )
  }