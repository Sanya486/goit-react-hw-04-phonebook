import React from 'react'
import PropTypes from 'prop-types'

import { Button, Li } from './Contact.styled';

const Contact = ({ contacts, deleteContact }) => {
  return (
    <>
      {contacts.map(({ id, name, number }) => (
        <Li key={id}>
          <p>
            {name}: {number}
          </p>
          <Button type="button" onClick={() => deleteContact(id)}>
            Delete
          </Button>
        </Li>
      ))}
    </>
  );
};

Contact.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};

export default Contact
