import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Quiz from '../components/Quiz';
import { MOCK_QUESTIONS, MOCK_QUIZS } from '../mock/quizs.mock';

describe('Quiz component', () => {

  const checkAnswer = jest.fn();
  const nextQuestion = jest.fn();
  const showTheResult = jest.fn();

  const renderQuizComponent = (props) => {
    return render(
      <Quiz
        showQuiz={true}
        question={MOCK_QUESTIONS}
        quizs={MOCK_QUIZS}
        checkAnswer={checkAnswer}
        correctAnswer={null}
        selectedAnswer={null}
        questionIndex={0}
        nextQuestion={nextQuestion}
        showTheResult={showTheResult}
        {...props}
      />
    );
  };

  it('renders the Quiz component', () => {
    renderQuizComponent();
  });

  it('displays the question', () => {
    const { getByText } = renderQuizComponent();

    expect(getByText('What is the capital of France?')).toBeInTheDocument();
  });

  it('displays the options', () => {
    const { getByText } = renderQuizComponent();

    expect(getByText('London')).toBeInTheDocument();
    expect(getByText('Paris')).toBeInTheDocument();
    expect(getByText('Berlin')).toBeInTheDocument();
    expect(getByText('Rome')).toBeInTheDocument();
  });

  it('calls checkAnswer when an option is clicked', () => {
    const { getByText } = renderQuizComponent();

    fireEvent.click(getByText('Paris'));
    expect(checkAnswer).toHaveBeenCalledWith(expect.anything(), 'Paris');
  });

  it('calls nextQuestion when "Next Question" button is clicked', () => {
    const { getByText } = renderQuizComponent({ selectedAnswer: 'Paris', questionIndex: 0 });

    fireEvent.click(getByText('Next Question'));
    expect(nextQuestion).toHaveBeenCalled();
  });

  it('calls showTheResult when "Show Result" button is clicked', () => {
    const { getByText } = renderQuizComponent({ selectedAnswer: 'Paris', questionIndex: MOCK_QUIZS.length - 1 });

    fireEvent.click(getByText('Show Result'));
    expect(showTheResult).toHaveBeenCalled();
  });
});
