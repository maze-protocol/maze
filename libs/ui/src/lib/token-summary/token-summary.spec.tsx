import React from 'react';
import { render } from '@testing-library/react';

import TokenSummary from './token-summary';

describe('TokenSummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TokenSummary />);
    expect(baseElement).toBeTruthy();
  });
});
