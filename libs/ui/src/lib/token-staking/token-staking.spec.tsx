import React from 'react';
import { render } from '@testing-library/react';

import TokenStaking from './token-staking';

describe('TokenStaking', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TokenStaking />);
    expect(baseElement).toBeTruthy();
  });
});
