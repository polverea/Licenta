import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useRef, useState } from "react";
import { GroupContext } from "../../contexts/group-context";
import { QuizContext } from "../../contexts/quiz.context";
import { db } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./question.styles.scss";

const Question = () => {
  const defaultValues = {
    questionId: 0,
    questionText: "",
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
    points: 0,
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
        console.log(document.id, " => ", document.data().owner);
        const ref = doc(
          collection(
            doc(collection(db, "groups"), document.id),
            currentQuiz.title
          ),
          currentQuiz.uid
        );
        console.log("crt", currentGroups.uid);
        updateDoc(ref, {
          question: arrayUnion({
            question: quizInfo.questionText,
            ans1: quizInfo.ans1,
            ans2: quizInfo.ans2,
            ans3: quizInfo.ans3,
            ans4: quizInfo.ans4,
          }),
        });
        alert(`Congrats! You join to  group`);
      });
    } catch (e) {
      console.log(e);
    }
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
        <span> a: </span>
        <input type="radio" name="ans1" />
        <input
          type="text"
          value={quizInfo.ans1}
          onChange={handleChange}
          name="ans1"
        />

        <div className="answer">
          <span> b: </span>
          <input type="radio" name="ans1" />
          <input
            type="text"
            value={quizInfo.ans2}
            onChange={handleChange}
            name="ans2"
          />
        </div>
        <div className="answer">
          <span> c: </span>
          <input type="radio" name="ans1" />
          <input
            type="text"
            value={quizInfo.ans3}
            onChange={handleChange}
            name="ans3"
          />
        </div>
        <div className="answer">
          <span> d: </span>
          <input type="radio" name="ans1" />
          <input
            type="text"
            value={quizInfo.ans4}
            onChange={handleChange}
            name="ans4"
          />
        </div>
        <div className="points">
          <span>{quizInfo.points} points</span>
        </div>
        <CustomButton onClick={handleSubmit}>Next</CustomButton>
      </div>
    </div>
  );
};

export default Question;
