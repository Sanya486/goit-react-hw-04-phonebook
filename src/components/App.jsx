import React, { useEffect, useRef, useState } from 'react';

import { Container, Ul } from './App.styled';

import Title from './Title/Title';
import Form from './Form/Form';
import Contact from './Contact/Contact';
import Filter from './Filter/Filter';

const App = props => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true)

  useEffect(() => {
    setContacts(JSON.parse(localStorage.getItem('contacts')) || []);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = (id, name, number) => {
    const isContactExist = contacts.some(
      contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );
    if (!isContactExist) {
      setContacts(prev => [{ id, name, number },  ...prev]);
    }
  };

  const onFilterChange = e => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
  };

  const onActiveFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const deleteContact = id => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== id);
    });
  };

  return (
    <Container>
      <Title text="Phonebook"></Title>
      <Form onSubmit={addNewContact}>\</Form>
      <Title text="Contacts"></Title>
      <Filter text={filter} onChange={onFilterChange} />
      <Ul>
        <Contact
          contacts={
            filter === ''
              ? contacts
              : onActiveFilter()
          }
          deleteContact={deleteContact}
        />
      </Ul>
    </Container>
  ); ;
};

export default App;