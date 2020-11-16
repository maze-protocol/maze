import React from 'react';
import { render } from '@testing-library/react';

import FormAbout from './form-about';

describe('FormAbout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormAbout />);
    expect(baseElement).toBeTruthy();
  });
});
