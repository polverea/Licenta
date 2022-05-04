import { useContext, useState } from "react";
import CustomButton from "../custom-button/custom-button.component";
import "./group-menu.styles.scss";
import { GroupContext } from "../../contexts/group-context";
import { Members } from "../members/members.component";
import Quiz from "../quiz/quiz.component";
import { useNavigate } from "react-router-dom";

const GroupMenu = () => {
  const [prop, setProp] = useState("");
  const { currentGroups } = useContext(GroupContext);

  return (
    <div className="menu-container">
      <div className="menu">
        <div className="group-info">
          <h1> {currentGroups.name} </h1>
          <h2>
            Your join code is: <b>{currentGroups.code}</b>
          </h2>
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

        <CustomButton
          onClick={() => {
            setProp(4);
          }}
        >
          Add new quiz
        </CustomButton>
        <CustomButton
          onClick={() => {
            setProp(5);
          }}
        >
          Delete quiz
        </CustomButton>
      </div>
      <div className="content">
        {prop === 1 ? (
          console.log("Quizzes")
        ) : prop === 2 ? (
          console.log("Results")
        ) : prop === 3 ? (
          <Members key={new Date().toString} />
        ) : prop === 4 ? (
          <Quiz />
        ) : prop === 5 ? (
          console.log("Delete Quiz")
        ) : (
          console.log("Default")
        )}
      </div>
    </div>
  );
};

export default GroupMenu;