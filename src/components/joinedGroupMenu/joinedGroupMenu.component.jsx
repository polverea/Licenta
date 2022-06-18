import { useState } from "react";
import CustomButton from "../custom-button/custom-button.component";

import { Members } from "../GroupMembers/GroupMembers.component";
import ListJoinedQuizzes from "../list-joined-quizzes/list-joined-quizzes.component";

import ShowJoinedQuizResults from "../showJoinedQuizResults/showJoinedQuizResults.component";

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
          <ListJoinedQuizzes key={prop} />
        ) : prop === 2 ? (
          <ShowJoinedQuizResults />
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
