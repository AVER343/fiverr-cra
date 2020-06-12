import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default function Checkboxes({checked ,handleChange}) {

  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        onClick={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </div>
  );
}