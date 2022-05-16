import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { GroupContext } from "../../contexts/group-context";
import { db } from "../../firebase/firebase.utils";
import ShowQuiz from "../show-quiz/show-quiz.component";

const ListQuizzes = () => {
  const quizzes = useRef([]);

  const { currentGroups } = useContext(GroupContext);

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
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [quizzes]);
  return (
    <div>
      {!loading ? (
        <ShowQuiz quizzes={quizzes} title={quizzes.current.title} />
      ) : (
        console.log("123")
      )}
    </div>
  );
};
export default ListQuizzes;
