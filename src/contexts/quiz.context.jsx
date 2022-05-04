import { createContext, useState } from "react";

//actual value I want to access
export const QuizContext = createContext({
  currentQuiz: [],
  setCurrentQuiz: () => [],
});

export const QuizProvider = ({ children }) => {
  const [currentQuiz, setCurrentQuiz] = useState([]);
  const value = { currentQuiz, setCurrentQuiz };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
