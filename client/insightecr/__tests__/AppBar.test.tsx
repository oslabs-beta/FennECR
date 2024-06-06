import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppBar from '../src/Components/AppBar';

describe('AppBar Component', () => {
  const mockToggleDrawer = jest.fn();

  test('renders the AppBar component', () => {
    render(
      <AppBar
        open={false}
        toggleDrawer={mockToggleDrawer}
        darkMode={false}
        handleThemeChange={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );

    const titleElement = screen.getByText(/InSightECR/i);
    expect(titleElement).toBeInTheDocument();
  });
});
