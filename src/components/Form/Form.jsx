import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { nanoid } from 'nanoid';

import {
  FormTag,
  Lable,
  Input,
  Button,
} from './Form.styled';



export default class Form extends Component {
    
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  submitHandler = e => {
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
    this.props.onSubmit(id, this.state.name, this.state.number);
    this.setState({ name: '', number: '' });
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <FormTag onSubmit={this.submitHandler}>
        <Lable>
          Name
          <Input
            type="text"
            name="name"
            value={this.state.name}
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.onInputChange}
          />
        </Lable>
        <Lable>
          Number
          <Input
            type="tel"
            name="number"
            value={this.state.number.trim()}
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.onInputChange}
          />
        </Lable>
        <Button type="submit">Add contact</Button>
      </FormTag>
    );
  }
}
