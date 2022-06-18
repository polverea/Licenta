import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GroupContext } from "../../contexts/group.context";
import { QuizContext } from "../../contexts/quiz.context";
import { UserContext } from "../../contexts/user.context";
import { db } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import "./list-joined-quizzes.styles.scss";

const ListJoinedQuizzes = () => {
  const quizzes = useRef([]);
  const navigate = useNavigate();
  const { currentGroups } = useContext(GroupContext);
  const { currentUser } = useContext(UserContext);
  const { currentQuiz, setCurrentQuiz } = useContext(QuizContext);
  const [loading, setLoading] = useState(true);
  const [isQuizCompleted, setIsQuizCompleted] = useState(true);
  useEffect(async () => {
    const dbQuerry = query(
      collection(db, "user-quizzes"),
      where("groupName", "==", currentGroups.name)
    );

    const querySnapshot = await getDocs(dbQuerry);
    try {
      querySnapshot.forEach(async (document) => {
        console.log("finishh", document.data());
        const ref = doc(
          collection(
            doc(collection(db, "user-quizzes"), document.id),
            currentUser.displayName
          ),
          "result"
        );
        const refSnapshot = await getDoc(ref);
        if (!refSnapshot.exists()) {
          console.log("da", refSnapshot.exists());
          quizzes.current.push({
            title: document.data().title,
          });
          setIsQuizCompleted(false);
        }
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [quizzes]);

  const handleClick = (quiz) => {
    setCurrentQuiz({ title: quizzes.current[quiz].title });
    navigate(`${quizzes.current[quiz].title}`, quizzes.current[quiz].title);
  };

  return (
    <div className="quizzes">
      <h2>Your quizzes </h2>
      {!loading
        ? Object.keys(quizzes.current).map((quiz) => {
            return (
              <div className="button">
                <CustomButton key={quiz} onClick={() => handleClick(quiz)}>
                  {quizzes.current[quiz].title}
                </CustomButton>
              </div>
            );
          })
        : console.log("123")}
    </div>
  );
};
export default ListJoinedQuizzes;
