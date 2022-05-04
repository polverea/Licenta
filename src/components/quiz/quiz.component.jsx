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
import { db } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

const Quiz = () => {
  const { currentGroups } = useContext(GroupContext);
  const navigate = useNavigate();
  const groupUid = useRef();
  const [title, setTitle] = useState("");
  const { setCurrentQuiz } = useContext(QuizContext);

  const createGroup = async () => {
    const dbQuerry = query(
      collection(db, "groups"),
      where("code", "==", currentGroups.code)
    );
    const querySnapshot = await getDocs(dbQuerry);
    querySnapshot.forEach((doc) => {
      groupUid.current = doc.id;
    });

    const ref = collection(
      doc(collection(db, "groups"), groupUid.current),
      title
    );
    try {
      await addDoc(ref, {});
      querySnapshot.forEach((doc) => {
        groupUid.current = doc.id;
        setCurrentQuiz({ uid: groupUid.current, title: title });
      });
    } catch (e) {
      console.log("error", e.message);
    }

    navigate(`/groups/${currentGroups.code}/quiz/${groupUid.current}`);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setTitle(value);
  };
  return (
    <div>
      <FormInput
        label="Quiz title"
        type="text"
        required
        onChange={handleChange}
        name="title"
        value={title}
      />
      <CustomButton onClick={createGroup}>Create quiz</CustomButton>
    </div>
  );
};

export default Quiz;
