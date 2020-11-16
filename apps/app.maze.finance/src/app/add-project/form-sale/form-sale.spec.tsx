import React from 'react';
import { render } from '@testing-library/react';

import FormSale from './form-sale';

describe('FormSale', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormSale />);
    expect(baseElement).toBeTruthy();
  });
});
