import React from 'react';
import { render } from '@testing-library/react';

import FormSlider from './form-slider';

describe('FormSlider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormSlider />);
    expect(baseElement).toBeTruthy();
  });
});
