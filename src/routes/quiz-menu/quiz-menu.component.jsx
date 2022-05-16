import { useRef, useState } from "react";
import CustomButton from "../../components/custom-button/custom-button.component";
import Question from "../../components/question/question.component";
import "./quiz-menu.styles.scss";

const QuizMenu = () => {
  const [option, setOption] = useState();
  const numberOfQuestions = useRef([]);
  const [forceRender, setForceRender] = useState(true);
  return (
    <div className="buttons">
      <div className="quiz-menu">
        <CustomButton
          onClick={() => {
            setOption("New Question");
            numberOfQuestions.current.push({
              numberOfQuestions: "New Question",
            });

            console.log("numb", numberOfQuestions.current);
            setForceRender(!forceRender);
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
        {option === "New Question"
          ? numberOfQuestions.current.map(() => {
              return <Question />;
            })
          : option === "Save"
          ? console.log("save")
          : option === "Delete Quiz"
          ? console.log("delete quiz")
          : console.log("default")}
      </div>
    </div>
  );
};

export default QuizMenu;
