import React from 'react';
import { render } from '@testing-library/react';

import TokenSale from './token-sale';

describe('TokenSale', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TokenSale />);
    expect(baseElement).toBeTruthy();
  });
});
