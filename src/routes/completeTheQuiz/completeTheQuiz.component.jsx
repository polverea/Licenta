import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useRef } from "react";
import ListAndCompleteQuestions from "../../components/list-and-complete-questions/list-and-complete-questions.component";
import { GroupContext } from "../../contexts/group-context";
import { QuizContext } from "../../contexts/quiz.context";
import { UserContext } from "../../contexts/user.context";
import { db } from "../../firebase/firebase.utils";

const CompleteTheQuiz = ({ questions }) => {
  const { currentQuiz } = useContext(QuizContext);
  const { currentUser } = useContext(UserContext);
  const { currentGroups } = useContext(GroupContext);
  const id = useRef();
  let result = useRef(0);
  useEffect(async () => {
    const dbQuerry = query(
      collection(db, "user-quizzes"),
      where("groupName", "==", currentGroups.name),
      where("title", "==", currentQuiz.title)
    );
    const querySnapshot = await getDocs(dbQuerry);
    querySnapshot.forEach((document) => {
      id.current = document.id;
    });
    const ref = collection(
      doc(collection(db, "user-quizzes"), id.current),
      currentUser.displayName
    );
    const refSnapshot = await getDocs(ref);
    refSnapshot.forEach((document) => {
      if (document.data().score)
        result.current += Number(document.data().score);
      console.log(result);
    });
    setDoc(
      doc(
        collection(
          doc(collection(db, "user-quizzes"), id.current),
          currentUser.displayName
        ),
        "result"
      ),
      {
        quizTitle: currentQuiz.title,
        user: currentUser.displayName,
        finalScore: result,
      }
    );
  }, []);
  return (
    <div>
      <div className="question">
        {questions.map((question) => {
          return (
            <ListAndCompleteQuestions
              title={currentQuiz.title}
              question={question}
            />
          );
        })}
      </div>
      <div className=""></div>
    </div>
  );
};

export default CompleteTheQuiz;
