<<<<<<< HEAD
import { render, screen, fireEvent} from "@testing-library/react";
import App from "./App"
import Result from "./components/Result";

// quiz questions are displayed correctly
describe("App", () => {
  test("quiz questions are displayed correctly", () => {
    render(<App />);

    // Check if the first question is displayed
    const questionElement = screen.getByText("Which of the following is the correct name of React.js?");
    expect(questionElement).toBeInTheDocument();

    // Check if all options for the first question are displayed properly
    const options = screen.getAllByRole("button");
    expect(options.length).toBe(4);
    expect(options[0]).toHaveTextContent("React");
    expect(options[1]).toHaveTextContent("React.js");
    expect(options[2]).toHaveTextContent("ReactJS");
    expect(options[3]).toHaveTextContent("All of the above");
  });

//users can select an answer for each question

  test("users can select an answer for each question", () => {
    render(<App />);

    // Selecting answer for the first question
    const option = screen.getByText("All of the above");
    fireEvent.click(option);

    // Verifying that the answer we select is highlighted properly
    expect(option).toHaveClass("bg-success");
  });

  //preventing user cannot proceed to the next question without selecting an answer
  test("preventing user cannot proceed to the next question without selecting an answer", () => {
    render(<App />);

    // Try to proceed to the next question without selecting an answer
    const nextButton = screen.getByText("Next Question");
    fireEvent.click(nextButton);

    // Verifying that the next question is not displayed
    const questionElement = screen.queryByText(
      "Which of the following are the advantages of React.js?"
    );
    expect(questionElement).toBeNull();
  });

  //checking users score is calculated correctly after completing the quiz

  test("checking users score is calculated correctly after completing the quiz", () => {
    render(<App />);

    const options = [
      screen.getByText("All of the above"), 
      screen.getByText("All of the above"), 
      screen.getByText("React.js can render both on client and server side."), 
      screen.getByText("npx create-react-app my-app"),
      screen.getByText("Virtual DOM"),
      screen.getByText("3000"),
      screen.getByText("1"),
      screen.getByText("Using the Array.map() method"),
      screen.getByText("Internal storage of the component."),
      screen.getByText("State & Props"),
      
    ];
    // Selecting correct answers for all questions
    
  fireEvent.click(options[3]);
  fireEvent.click(options[3]); 
  fireEvent.click(options[2]); 
  fireEvent.click(options[1]); 
  fireEvent.click(options[1]); 
  fireEvent.click(options[0]); 
  fireEvent.click(options[0]); 
  fireEvent.click(options[2]); 
  fireEvent.click(options[1]); 
  fireEvent.click(options[0]); 
  
    
    // Verifying the final score of users
    const resultButton = screen.getByText("Show Result");
    fireEvent.click(resultButton);

    const scoreElement = screen.getByText("Your score is 50 out of 50");
    expect(scoreElement).toBeInTheDocument();
  });

  //displaying Awesome! message & Start Over button when marks are greater than half of the total possible marks
  test("displays Awesome! message and Start Over button when marks are greater than half of the total possible marks", () => {
    const showResult = true;
    const quizs = [
      {
        question: "Which of the following is the correct name of React.js?",
        options: ["React", "React.js", "ReactJS", "All of the above"],
      },
      {
        question: "Which of the following are the advantages of React.js?",
        options: [
          "React.js can increase the application's performance with Virtual DOM.",
          "React.js is easy to integrate with other frameworks such as Angular, BackboneJS since it is only a view library.",
          "React.js can render both on client and server side.",
          "All of the above",
        ],
      },
      {
        question: "Which of the following is not a disadvantage of React.js?",
        options: [
          "React.js has only a view layer. We have put your code for Ajax requests, events and so on.",
          "The library of React.js is pretty large.",
          "The JSX in React.js makes code easy to read and write.",
          "The learning curve can be steep in React.js.",
        ],
      },
      {
        question : "Which of the following command is used to install create-react-app?",
        options : [
            "npm install -g create-react-app",
            "npx create-react-app my-app",
            "npm install create-react-app",
            "npm install -f create-react-app"
        ],
      },
      {
        question : "What of the following is used in React.js to increase performance?",
        options: [
            "Original DOM",
            "Virtual DOM",
            "Both A and B.",
            "None of the above."
        ],
      },
      {
        question : "What is the default port where webpack-server runs?",
        options: [
            "3000",
            "8080",
            "3030",
            "6060"
        ],
      },
      {
        question : "How many numbers of elements a valid react component can return?",
        options: [
            "1",
            "2",
            "3",
            "Unlimited"
        ],
      },
      {
        question : "What is the declarative way to render a dynamic list of components based on values in an array?",
        options: [
            "Using the reduce array method",
            "Using the <Each /> component",
            "Using the Array.map() method",
            "With a for/while loop"
        ],
      },
      {
        question : "What is a state in React?",
        options: [
            "A permanent storage.",
            "Internal storage of the component.",
            "External storage of the component.",
            "None of the above."
        ],
      },
      {
        question : "What are the two ways to handle data in React?",
        options: [
            "State & Props",
            "Services & Components",
            "State & Services",
            "State & Component"
        ],
      },
    ]; 
    const marks = 30;
    const startOver = jest.fn();

    render(<Result showResult={showResult} quizs={quizs} marks={marks} startOver={startOver} />);

    const awesomeMessage = screen.getByText("Awesome!");
    expect(awesomeMessage).toBeInTheDocument();

    const startOverButton = screen.getByText("Start Over");
    expect(startOverButton).toBeInTheDocument();

    fireEvent.click(startOverButton);
    expect(startOver).toHaveBeenCalled();
  });


  //displays Oops message & Start Over button when marks are less than or equal to half of the total possible marks
  test("displays 'Oops!' message and 'Start Over' button when marks are less than or equal to half of the total possible marks", () => {
    const showResult = true;
    const quizs = [
      {
        question: "Which of the following is the correct name of React.js?",
        options: ["React", "React.js", "ReactJS", "All of the above"],
      },
      {
        question: "Which of the following are the advantages of React.js?",
        options: [
          "React.js can increase the application's performance with Virtual DOM.",
          "React.js is easy to integrate with other frameworks such as Angular, BackboneJS since it is only a view library.",
          "React.js can render both on client and server side.",
          "All of the above",
        ],
      },
      {
        question: "Which of the following is not a disadvantage of React.js?",
        options: [
          "React.js has only a view layer. We have put your code for Ajax requests, events and so on.",
          "The library of React.js is pretty large.",
          "The JSX in React.js makes code easy to read and write.",
          "The learning curve can be steep in React.js.",
        ],
      },
      {
        question : "Which of the following command is used to install create-react-app?",
        options : [
            "npm install -g create-react-app",
            "npx create-react-app my-app",
            "npm install create-react-app",
            "npm install -f create-react-app"
        ],
      },
      {
        question : "What of the following is used in React.js to increase performance?",
        options: [
            "Original DOM",
            "Virtual DOM",
            "Both A and B.",
            "None of the above."
        ],
      },
      {
        question : "What is the default port where webpack-server runs?",
        options: [
            "3000",
            "8080",
            "3030",
            "6060"
        ],
      },
      {
        question : "How many numbers of elements a valid react component can return?",
        options: [
            "1",
            "2",
            "3",
            "Unlimited"
        ],
      },
      {
        question : "What is the declarative way to render a dynamic list of components based on values in an array?",
        options: [
            "Using the reduce array method",
            "Using the <Each /> component",
            "Using the Array.map() method",
            "With a for/while loop"
        ],
      },
      {
        question : "What is a state in React?",
        options: [
            "A permanent storage.",
            "Internal storage of the component.",
            "External storage of the component.",
            "None of the above."
        ],
      },
      {
        question : "What are the two ways to handle data in React?",
        options: [
            "State & Props",
            "Services & Components",
            "State & Services",
            "State & Component"
        ],
      },
    ];
    const marks = 10; 
    const startOver = jest.fn();

    render(<Result showResult={showResult} quizs={quizs} marks={marks} startOver={startOver} />);

    const oopsMessage = screen.getByText("Oops!");
    expect(oopsMessage).toBeInTheDocument();

    const startOverButton = screen.getByText("Start Over");
    expect(startOverButton).toBeInTheDocument();

    fireEvent.click(startOverButton);
    expect(startOver).toHaveBeenCalled();
  });
=======
import { render, screen } from '@testing-library/react';
import App from './App';
//Code

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
>>>>>>> a244d949e76a611d8fe6b06cae02d11b176d17ff
});
