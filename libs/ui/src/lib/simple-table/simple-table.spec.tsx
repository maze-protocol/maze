import React from 'react';
import { render } from '@testing-library/react';

import SimpleTable from './simple-table';

describe('SimpleTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SimpleTable />);
    expect(baseElement).toBeTruthy();
  });
});
