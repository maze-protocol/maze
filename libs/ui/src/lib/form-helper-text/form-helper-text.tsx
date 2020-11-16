import React from 'react';

import BaseFormHelperText from "@material-ui/core/FormHelperText";

export const FormHelperText = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <BaseFormHelperText>{touched && error}</BaseFormHelperText>
  }
};

export default FormHelperText;
