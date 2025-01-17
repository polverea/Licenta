import { useRef, useState } from "react";
import CustomButton from "../../components/custom-button/custom-button.component";
import DeleteQuiz from "../../components/delete-quiz/deleteQuiz.component";
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
            setForceRender(!forceRender);
          }}
        >
          New question
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
          numberOfQuestions.current.map(() => {
            return <Question />;
          })
        ) : option === "Delete Quiz" ? (
          <DeleteQuiz />
        ) : (
          console.log("default")
        )}
      </div>
    </div>
  );
};

export default QuizMenu;
