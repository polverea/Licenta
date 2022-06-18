import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GroupContext } from "../../contexts/group.context";
import { QuizContext } from "../../contexts/quiz.context";
import { UserContext } from "../../contexts/user.context";
import { db } from "../../firebase/firebase.utils";

const DeleteQuiz = () => {
  const { currentQuiz } = useContext(QuizContext);
  const { currentGroups } = useContext(GroupContext);
  const navigate = useNavigate();

  useEffect(async () => {
    const dbQuerry = query(
      collection(db, "user-quizzes"),
      where("title", "==", currentQuiz.title)
    );
    const querySnapshot = await getDocs(dbQuerry);
    try {
      querySnapshot.forEach(async (document) => {
        const ref = doc(collection(db, "user-quizzes"), document.id);
        console.log("asda", ref);
        await deleteDoc(ref);
      });
    } catch (e) {
      console.log(e);
    }

    const dbQuerry2 = query(
      collection(db, "groups"),
      where("code", "==", currentGroups.code)
    );
    const querySnapshot2 = await getDocs(dbQuerry2);
    try {
      querySnapshot2.forEach(async (document) => {
        const ref = doc(
          collection(
            doc(collection(db, "groups"), document.id),
            currentQuiz.title
          ),
          currentQuiz.uid
        );
        await deleteDoc(ref);
        alert("Quiz has been deleted");
        navigate(`/groups/${currentGroups.code}`);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const deleteFromGroups = async () => {};

  return <div>{deleteFromGroups}</div>;
};

export default DeleteQuiz;
