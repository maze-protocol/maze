import React from 'react';
import { render } from '@testing-library/react';

import CardDescription from './card-description';

describe('CardDescription', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardDescription />);
    expect(baseElement).toBeTruthy();
  });
});
