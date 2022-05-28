import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GroupContext } from "../../contexts/group-context";
import { QuizContext } from "../../contexts/quiz.context";
import { UserContext } from "../../contexts/user.context";
import { db } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./quiz.styles.scss";

const Quiz = () => {
  const { currentGroups } = useContext(GroupContext);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const id = useRef();
  const [info, setInfo] = useState({
    title: "",
    time: "",
  });
  const { setCurrentQuiz } = useContext(QuizContext);

  const createQuiz = async () => {
    const dbQuerry = query(
      collection(db, "groups"),
      where("code", "==", currentGroups.code)
    );
    const querySnapshot = await getDocs(dbQuerry);
    querySnapshot.forEach((doc) => {
      id.current = doc.id;
    });

    const ref = collection(
      doc(collection(db, "groups"), id.current),
      info.title
    );
    try {
      await addDoc(ref, {});
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        id.current = doc.id;
        setCurrentQuiz({ uid: id.current, title: info.title });
      });
      const ref2 = collection(db, "user-quizzes");
      await addDoc(ref2, {
        groupName: currentGroups.name,
        user: currentUser.displayName,
        title: info.title,
        code: currentGroups.code,
        time: info.time,
      });
    } catch (e) {
      console.log("error", e.message);
    }

    navigate(`/groups/${currentGroups.code}/quiz/${id.current}`);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  };
  return (
    <div className="quiz-title">
      <FormInput
        label="Quiz title"
        type="text"
        required
        onChange={handleChange}
        name="title"
        value={info.title}
      />

      <CustomButton onClick={createQuiz}>Create quiz</CustomButton>
    </div>
  );
};

export default Quiz;
