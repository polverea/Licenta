import { useContext } from "react";

import ListAndCompleteQuestions from "../../components/list-and-complete-questions/list-and-complete-questions.component";

import { QuizContext } from "../../contexts/quiz.context";

import "./completeTheQuiz.styles.scss";

const CompleteTheQuiz = ({ questions }) => {
  const { currentQuiz } = useContext(QuizContext);

  // const handleFinish = async () => {
  //   const ref = doc(
  //     collection(
  //       doc(collection(db, "user-quizzes"), id.current),
  //       currentUser.displayName
  //     ),
  //     "finish"
  //   );
  //   console.log("da", ref);
  //   setDoc(ref, {
  //     finish: 1,
  //   });
  // };
  return (
    <div className="complete-questions">
      {questions.map((question, key) => {
        return (
          <ListAndCompleteQuestions
            key={key}
            title={currentQuiz.title}
            question={question}
          />
        );
      })}
      {/* <CustomButton onClick={handleFinish}>Finish</CustomButton> */}
    </div>
  );
};

export default CompleteTheQuiz;
