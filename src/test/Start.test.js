import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Start from '../components/Start';

describe('Start component', () => {

  const renderStartComponent = (props) => {
    return render(
      <Start
        showStart={true}
        startQuiz={jest.fn()}
        {...props}
      />
    );
  };

  it('renders without errors', () => {
    renderStartComponent();
  });

  it('displays the start section when showStart prop is true', () => {
    const { container } = renderStartComponent();
    const section = container.querySelector('.bg-dark.text-white');
    expect(section).toBeInTheDocument();
  });

  it('does not display the start section when showStart prop is false', () => {
    const { queryByRole } = renderStartComponent({ showStart: false });
    const section = queryByRole('section', { hidden: true });
    expect(section).not.toBeInTheDocument();
  });
  

  it('calls the startQuiz function when Start Quiz button is clicked', () => {
    const startQuizMock = jest.fn();
    const { getByText } = renderStartComponent({ startQuiz: startQuizMock });
    const startButton = getByText('Start Quiz');
    fireEvent.click(startButton);
    expect(startQuizMock).toHaveBeenCalledTimes(1);
  });
});