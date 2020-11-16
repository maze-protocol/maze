import React from 'react';
import { render } from '@testing-library/react';

import CardPieChart from './card-pie-chart';

describe('CardPieChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardPieChart />);
    expect(baseElement).toBeTruthy();
  });
});
