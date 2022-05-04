import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import { GroupProvider } from "./contexts/group-context";
import { QuizProvider } from "./contexts/quiz.context";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <GroupProvider>
          <QuizProvider>
            <App />
          </QuizProvider>
        </GroupProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
