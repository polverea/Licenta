import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GroupContext } from "../../contexts/group-context";
import { QuizContext } from "../../contexts/quiz.context";
import { db } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";

const ShowQuiz = ({ quizzes }) => {
  const { currentGroups } = useContext(GroupContext);
  const { currentQuiz } = useContext(QuizContext);
  const docId = useRef();
  const navigate = useNavigate();
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
    console.log("aici", quiz);

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
        Object.keys(document.data().question).map((quest) => {
          setQuestions([
            {
              ...questions,
              questionText: document.data().question[quest].question,
              ans1: document.data().question[quest].ans1,
              ans2: document.data().question[quest].ans2,
              ans3: document.data().question[quest].ans3,
              ans4: document.data().question[quest].ans4,
              points: document.data().question[quest].points,
              rightAns: document.data().question[quest].rightAns,
            },
          ]);
        });
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      {Object.keys(quizzes.current).map((quiz) => {
        return (
          <CustomButton key={quiz} onClick={() => handleClick(quiz)}>
            {quizzes.current[quiz][0].title}
          </CustomButton>
        );
      })}
      {questions.map((question) => {
        console.log(question);
      })}
    </div>
  );
};

export default ShowQuiz;
