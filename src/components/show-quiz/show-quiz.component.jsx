import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GroupContext } from "../../contexts/group-context";
import "./show-quiz.styles.scss";
import { db } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import ShowQuestions from "../show-questions/show-questions.component";

const ShowQuiz = ({ quizzes }) => {
  const { currentGroups } = useContext(GroupContext);
  const docId = useRef();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      ans1: "",
      ans2: "",
      ans3: "",
      ans4: "",
      points: 0,
      rightAns: 0,
    },
  ]);
  const handleClick = async (quiz) => {
    const dbQuerry = query(
      collection(db, "groups"),
      where("code", "==", currentGroups.code)
    );
    const querySnapshot = await getDocs(dbQuerry);
    try {
      querySnapshot.forEach((document) => {
        docId.current = document.id;
      });
      const ref = collection(
        doc(collection(db, "groups"), docId.current),
        quizzes.current[quiz][0].title
      );

      const refSnapshot = await getDocs(ref);
      refSnapshot.forEach((document) => {
        if (!document.data().final) {
          setQuestions(document.data().question);
        }
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div className="quiz-buttons">
        {Object.keys(quizzes.current).map((quiz) => {
          return (
            <div className="button">
              <CustomButton key={quiz} onClick={() => handleClick(quiz)}>
                {quizzes.current[quiz][0].title}
              </CustomButton>
            </div>
          );
        })}
      </div>
      {questions.questionText != "" ? (
        <ShowQuestions questions={questions} />
      ) : (
        console.log("No questions yet")
      )}
    </div>
  );
};

export default ShowQuiz;
