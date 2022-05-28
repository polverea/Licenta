import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { GroupContext } from "../../contexts/group-context";
import { QuizContext } from "../../contexts/quiz.context";
import { db } from "../../firebase/firebase.utils";
import CompleteTheQuiz from "../completeTheQuiz/completeTheQuiz.component";

const StartQuiz = () => {
  const { currentGroups } = useContext(GroupContext);
  const { currentQuiz } = useContext(QuizContext);
  const docId = useRef();
  const [questions, setQuestions] = useState([
    {
      questionId: 0,
      question: "",
      ans1: "",
      ans2: "",
      ans3: "",
      ans4: "",
      points: 0,
    },
  ]);

  useEffect(async () => {
    const dbQuerry = query(
      collection(db, "groups"),
      where("name", "==", currentGroups.name)
    );
    const querySnapshot = await getDocs(dbQuerry);
    try {
      querySnapshot.forEach((document) => {
        docId.current = document.id;
      });
      const ref = collection(
        doc(collection(db, "groups"), docId.current),
        currentQuiz.title
      );

      const refSnapshot = await getDocs(ref);
      refSnapshot.forEach((document) => {
        setQuestions(document.data().question);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div>
      <CompleteTheQuiz questions={questions} />
    </div>
  );
};
export default StartQuiz;
