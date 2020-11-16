import React from 'react';
import { render } from '@testing-library/react';

import FormStaking from './form-staking';

describe('FormStaking', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormStaking />);
    expect(baseElement).toBeTruthy();
  });
});
