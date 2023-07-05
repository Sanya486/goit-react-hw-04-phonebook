import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { nanoid } from 'nanoid';

import {
  FormTag,
  Lable,
  Input,
  Button,
} from './Form.styled';


const Form = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    const nameExp = new RegExp(
      "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
    );
    const numberExp = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$');
    
    if (!e.target.elements.name.value.match(nameExp)) {
      Notify.warning('Oops... Unfortunatelly, something wrong with NAME. Check it and try one more time!')
      return
    }

    if (!e.target.elements.number.value.match(numberExp)) {
      Notify.warning(
        'Oops... Unfortunatelly, something wrong with NUMBER. Check it and try one more time!'
      );
      return
    }
    const id = nanoid();
    onSubmit(id, name, number);
    setName('')
    setNumber('')
  };

  const onInputChange = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value)
        break;
      case 'number':
        setNumber(e.target.value)
        break;  
      default:
        return
    };
  }

    return (
      <FormTag onSubmit={submitHandler}>
        <Lable>
          Name
          <Input
            type="text"
            name="name"
            value={name}
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={onInputChange}
          />
        </Lable>
        <Lable>
          Number
          <Input
            type="tel"
            name="number"
            value={number.trim()}
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={onInputChange}
          />
        </Lable>
        <Button type="submit">Add contact</Button>
      </FormTag>
    );
  }

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Form
