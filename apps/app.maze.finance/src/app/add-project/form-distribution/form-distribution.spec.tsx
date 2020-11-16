import React from 'react';
import { render } from '@testing-library/react';

import FormDistribution from './form-distribution';

describe('FormDistribution', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormDistribution />);
    expect(baseElement).toBeTruthy();
  });
});
