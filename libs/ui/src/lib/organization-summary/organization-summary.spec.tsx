import React from 'react';
import { render } from '@testing-library/react';

import OrganizationSummary from './organization-summary';

describe('OrganizationSummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrganizationSummary />);
    expect(baseElement).toBeTruthy();
  });
});
