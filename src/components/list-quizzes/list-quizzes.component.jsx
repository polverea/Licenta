import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { GroupContext } from "../../contexts/group-context";
import { QuizContext } from "../../contexts/quiz.context";
import { db } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import ShowQuiz from "../show-quiz/show-quiz.component";

const ListQuizzes = () => {
  const quizzes = useRef([]);

  const { currentGroups } = useContext(GroupContext);
  const { currentQuiz } = useContext(QuizContext);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const dbQuerry = query(
      collection(db, "user-quizzes"),
      where("code", "==", currentGroups.code)
    );
    const querySnapshot = await getDocs(dbQuerry);
    try {
      querySnapshot.forEach((document) => {
        quizzes.current.push([
          {
            title: document.data().title,
          },
        ]);
        console.log("daaaa", quizzes.current.title);
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [quizzes]);
  return (
    <div>
      LIST QUIZZZES
      {!loading ? (
        <ShowQuiz quizzes={quizzes} title={quizzes.current.title} />
      ) : (
        console.log("123")
      )}
    </div>
  );
};
export default ListQuizzes;
