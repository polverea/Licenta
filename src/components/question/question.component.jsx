import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { GroupContext } from "../../contexts/group-context";
import { QuizContext } from "../../contexts/quiz.context";
import { db } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./question.styles.scss";

const Question = () => {
  const defaultValues = {
    questionText: "",
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
    points: 0,
    rightAns: 0,
  };
  const [quizInfo, setQuizInfo] = useState(defaultValues);
  const { currentGroups } = useContext(GroupContext);
  const { currentQuiz } = useContext(QuizContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuizInfo({ ...quizInfo, [name]: value });
  };

  const handleSubmit = async () => {
    const dbQuerry = query(
      collection(db, "groups"),
      where("code", "==", currentGroups.code)
    );
    const querySnapshot = await getDocs(dbQuerry);
    try {
      querySnapshot.forEach((document) => {
        const ref = doc(
          collection(
            doc(collection(db, "groups"), document.id),
            currentQuiz.title
          ),
          currentQuiz.uid
        );
        updateDoc(ref, {
          question: arrayUnion({
            question: quizInfo.questionText,
            ans1: quizInfo.ans1,
            ans2: quizInfo.ans2,
            ans3: quizInfo.ans3,
            ans4: quizInfo.ans4,
            points: quizInfo.points,
            rightAns: quizInfo.rightAns,
          }),
        });
        alert(`Question has been added`);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleC = (event) => {
    setQuizInfo({ ...quizInfo, rightAns: event.target.value });
  };

  return (
    <div className="question">
      <h2>Add new question</h2>

      <FormInput
        label="question"
        type="text"
        required
        onChange={handleChange}
        name="questionText"
        value={quizInfo.questionText}
      />

      <div className="question-answers">
        <div className="answer">
          <span> a: </span>
          <input
            type="radio"
            name="ans1"
            value={1}
            checked={quizInfo.rightAns == 1}
            onChange={handleC}
          />
          <input
            type="text"
            value={quizInfo.ans1}
            onChange={handleChange}
            name="ans1"
          />
        </div>
        <div className="answer">
          <span> b: </span>
          <input
            type="radio"
            name="ans2"
            value={2}
            checked={quizInfo.rightAns == 2}
            onChange={handleC}
          />
          <input
            type="text"
            value={quizInfo.ans2}
            onChange={handleChange}
            name="ans2"
          />
        </div>
        <div className="answer">
          <span> c: </span>
          <input
            type="radio"
            name="ans3"
            value={3}
            checked={quizInfo.rightAns == 3}
            onChange={handleC}
          />
          <input
            type="text"
            value={quizInfo.ans3}
            onChange={handleChange}
            name="ans3"
          />
        </div>
        <div className="answer">
          <span> d: </span>
          <input
            type="radio"
            name="ans4"
            value={4}
            onChange={handleC}
            checked={quizInfo.rightAns == 4}
          />
          <input
            type="text"
            value={quizInfo.ans4}
            onChange={handleChange}
            name="ans4"
          />
        </div>
        <div className="points">
          <span>{quizInfo.points} points</span>
          <input
            className="points-input"
            type="number"
            onChange={handleChange}
            value={quizInfo.points}
            name="points"
          />
        </div>
        <CustomButton onClick={handleSubmit}>Next</CustomButton>
      </div>
    </div>
  );
};

export default Question;
