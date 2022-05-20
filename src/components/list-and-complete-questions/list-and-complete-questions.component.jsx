import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useContext, useRef, useState } from "react";
import { GroupContext } from "../../contexts/group-context";
import { UserContext } from "../../contexts/user.context";
import { db } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";

const ListAndCompleteQuestions = ({ title, question }) => {
  const { currentGroups } = useContext(GroupContext);
  const { currentUser } = useContext(UserContext);
  const id = useRef();

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
    } catch (e) {
      console.log(e);
    }
  };

  const handleC = (event) => {
    setQuestionInfo({ ...questionInfo, answer: event.target.value });
  };
  return (
    <div>
      <table>
        <tr>
          <th>Question: {question.question}</th>
        </tr>
        <div className="questions">
          <tr>
            <div className="question-answers">
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
            <div className="question-answers">
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
            <div className="question-answers">
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
            <div className="question-answers">
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
        </div>
        <CustomButton onClick={handleClick}>submit answer</CustomButton>
      </table>
    </div>
  );
};
export default ListAndCompleteQuestions;
