import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Result from '../components/Result';
import { MOCK_QUIZS } from '../mock/quizs.mock';

describe('Result component', () => {

  const renderResultComponent = (props) => {
    return render(
      <Result
        showResult={true}
        quizs={MOCK_QUIZS}
        marks={0}
        startOver={jest.fn()}
        {...props}
      />
    );
  };

  it('renders without errors', () => {
    renderResultComponent();
  });

  it('displays the result section when showResult prop is true', () => {
    const { container } = renderResultComponent();
    const section = container.querySelector('.bg-dark.text-white');
    expect(section).toBeInTheDocument();
  });

  it('does not display the result section when showResult prop is false', () => {
    const { container } = renderResultComponent({showResult: false});
    const section = container.querySelector('.bg-dark.text-center.text-white');
    expect(section).not.toBeInTheDocument();
  });

  it('displays "Awesome!" and a success background when marks exceed half of total possible marks', () => {
    const marks = 8; // Mock marks
    const { getByText, container } = renderResultComponent({marks});

    const heading = getByText('Awesome!');
    expect(heading).toBeInTheDocument();

    const resultSection = container.querySelector('.text-light.text-center.p-5.rounded.bg-success');
    expect(resultSection).toBeInTheDocument();
  });

  it('displays "Oops!" and a danger background when marks do not exceed half of total possible marks', () => {
    const marks = 4; // Mock marks
    const { getByText, container } = renderResultComponent({marks});

    const heading = getByText('Oops!');
    expect(heading).toBeInTheDocument();

    const resultSection = container.querySelector('.text-light.text-center.p-5.rounded.bg-danger');
    expect(resultSection).toBeInTheDocument();
  });

  it('calls the startOver function when Start Over button is clicked', () => {
    const startOverMock = jest.fn();
    const { getByText } = renderResultComponent({ startOver: startOverMock });
    const startOverButton = getByText('Start Over');
    fireEvent.click(startOverButton);
    expect(startOverMock).toHaveBeenCalledTimes(1);
  });
});