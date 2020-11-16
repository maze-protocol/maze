import React from 'react';
import { render } from '@testing-library/react';

import FormInputCheckbox from './form-input-checkbox';

describe('FormInputCheckbox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormInputCheckbox />);
    expect(baseElement).toBeTruthy();
  });
});
