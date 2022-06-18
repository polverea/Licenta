import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { GroupContext } from "../../contexts/group.context";
import { QuizContext } from "../../contexts/quiz.context";
import { UserContext } from "../../contexts/user.context";
import { db } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import "./list-and-complete-questions.styles.scss";

const ListAndCompleteQuestions = ({ title, question }) => {
  const { currentGroups } = useContext(GroupContext);
  const { currentUser } = useContext(UserContext);
  const { currentQuiz } = useContext(QuizContext);
  const id = useRef();
  let result = useRef(0);
  const [questionInfo, setQuestionInfo] = useState({
    answer: "",
  });

  const handleClick = async (event) => {
    setQuestionInfo({ answer: event.target.value });
    const dbQuerry = query(
      collection(db, "user-quizzes"),
      where("groupName", "==", currentGroups.name),
      where("title", "==", title)
    );
    const querySnapshot = await getDocs(dbQuerry);
    querySnapshot.forEach((document) => {
      id.current = document.id;
    });
    const ref = collection(
      doc(collection(db, "user-quizzes"), id.current),
      currentUser.displayName
    );

    try {
      if (question.rightAns == questionInfo.answer) {
        addDoc(ref, {
          question: question.question,
          answer: questionInfo.answer,
          CorrectAnswer: question.rightAns,
          score: question.points,
        });
      } else {
        addDoc(ref, {
          question: question.question,
          answer: questionInfo.answer,
          CorrectAnswer: question.rightAns,
          score: 0,
        });
      }
      question = null;
    } catch (e) {
      console.log(e);
    }

    alert("Your answer has been recorded");
    const dbQuerryForResult = query(
      collection(db, "user-quizzes"),
      where("groupName", "==", currentGroups.name),
      where("title", "==", currentQuiz.title)
    );
    const querySnapshotForResult = await getDocs(dbQuerryForResult);
    querySnapshotForResult.forEach((document) => {
      id.current = document.id;
    });
    const refForResult = collection(
      doc(collection(db, "user-quizzes"), id.current),
      currentUser.displayName
    );
    const refSnapshotForResult = await getDocs(refForResult);
    refSnapshotForResult.forEach((document) => {
      if (document.data().score)
        result.current += Number(document.data().score);
      console.log(result.current);
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
  };

  const handleC = (event) => {
    setQuestionInfo({ ...questionInfo, answer: event.target.value });
  };
  return (
    <div className="question-container">
      <div className="quest">
        <table>
          <tr>
            <th>
              {" "}
              <h3>{question.question}</h3>
            </th>
          </tr>

          <tr>
            <div className="answer">
              <input
                type="radio"
                name="ans1"
                value={1}
                checked={questionInfo.answer == 1}
                onChange={handleC}
              />
              <span> a:{question.ans1} </span>
            </div>
          </tr>
          <tr>
            <div className="answer">
              <input
                type="radio"
                name="ans1"
                value={2}
                checked={questionInfo.answer == 2}
                onChange={handleC}
              />
              <span> b:{question.ans2} </span>
            </div>
          </tr>
          <tr>
            <div className="answer">
              <input
                type="radio"
                name="ans1"
                value={3}
                checked={questionInfo.answer == 3}
                onChange={handleC}
              />
              <span> c:{question.ans3} </span>
            </div>
          </tr>
          <tr>
            <div className="answer">
              <input
                type="radio"
                name="ans1"
                value={4}
                checked={questionInfo.answer == 4}
                onChange={handleC}
              />
              <span> d:{question.ans4} </span>
            </div>
          </tr>
          <div className="points-correct">
            <tr>
              <td>
                <b> Points: {question.points} </b>
              </td>
            </tr>
          </div>

          <CustomButton onClick={handleClick}>Submit question</CustomButton>
        </table>
      </div>
    </div>
  );
};
export default ListAndCompleteQuestions;
