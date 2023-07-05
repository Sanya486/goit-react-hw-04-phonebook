import React from 'react'
import PropTypes from 'prop-types'

import { Lable, Input } from './Filter.styled';

const Filter = ({text, onChange}) => {
  return (
    <div>
          <Lable style={{ width: 200 }}>
        Find contacts by name
        <Input type="text" value={text} onChange={onChange} />
      </Lable>
    </div>
  );
}

Filter.propTypes = {
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter
