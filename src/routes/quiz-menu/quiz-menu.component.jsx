import { useState } from "react";
import CustomButton from "../../components/custom-button/custom-button.component";
import Question from "../../components/question/question.component";
import "./quiz-menu.styles.scss";

const QuizMenu = () => {
  const [option, setOption] = useState();

  return (
    <div className="buttons">
      <div className="quiz-menu">
        <CustomButton
          onClick={() => {
            setOption("New Question");
          }}
        >
          New question
        </CustomButton>
        <CustomButton
          onClick={() => {
            setOption("Save");
          }}
        >
          Save
        </CustomButton>
        <CustomButton
          onClick={() => {
            setOption("Delete Quiz");
          }}
        >
          Delete Quiz
        </CustomButton>
      </div>
      <div className="content">
        {option === "New Question" ? (
          <Question />
        ) : option === "Save" ? (
          console.log("save")
        ) : option === "Delete Quiz" ? (
          console.log("delete quiz")
        ) : (
          console.log("default")
        )}
      </div>
    </div>
  );
};

export default QuizMenu;
