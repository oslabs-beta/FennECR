import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../src/Components/Header';

describe ('Header Component', () => {
    it ('should render the header with the provided title', () => {
        const { getByText } = render (<Header title="Test Title" />);
        expect (getByText('Test Title')).toBeInTheDocument();
    });
    it('should render the header with a different title', () => {
        const { getByText } = render(<Header title="Another Title" />);
        expect(getByText('Another Title')).toBeInTheDocument();
      });
})