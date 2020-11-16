import React from 'react';
import { render } from '@testing-library/react';

import Validators from './validators';

describe('Validators', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Validators />);
    expect(baseElement).toBeTruthy();
  });
});
