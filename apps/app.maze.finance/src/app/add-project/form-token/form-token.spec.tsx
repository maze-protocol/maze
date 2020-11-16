import React from 'react';
import { render } from '@testing-library/react';

import FormToken from './form-token';

describe('FormToken', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormToken />);
    expect(baseElement).toBeTruthy();
  });
});
