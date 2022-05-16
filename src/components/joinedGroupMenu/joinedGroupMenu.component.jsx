import { useState } from "react";
import CustomButton from "../custom-button/custom-button.component";

import { Members } from "../GroupMembers/GroupMembers.component";
import ListJoinedQuizzes from "../list-joined-quizzes/list-joined-quizzes.component";

import ListQuizzes from "../list-quizzes/list-quizzes.component";

const JoinedGroupMenu = () => {
  const [prop, setProp] = useState("");

  return (
    <div className="menu-container">
      <div className="menu">
        <div className="group-info">
          <h2>Welcome to the group!</h2>
        </div>
        <CustomButton
          onClick={() => {
            setProp(1);
          }}
        >
          Quizzes
        </CustomButton>
        <CustomButton
          onClick={() => {
            setProp(2);
          }}
        >
          Results
        </CustomButton>
        <CustomButton
          onClick={() => {
            setProp(3);
          }}
        >
          Members
        </CustomButton>
      </div>
      <div className="content">
        {prop === 1 ? (
          <ListJoinedQuizzes />
        ) : prop === 2 ? (
          console.log("Results")
        ) : prop === 3 ? (
          <Members key={new Date().toString} />
        ) : (
          console.log("Default")
        )}
      </div>
    </div>
  );
};

export default JoinedGroupMenu;
