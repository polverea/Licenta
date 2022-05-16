import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { db } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import ToTheGroup from "../toTheGroup/toTheGroup.component";
import StartQuiz from "../toTheGroup/toTheGroup.component";

const JoinGroup = () => {
  const { currentUser } = useContext(UserContext);
  const [code, setCode] = useState({
    code: "",
  });
  const [loading, setLoading] = useState(true);
  const joinedGroups = useRef([]);

  useEffect(async () => {
    const dbQuerry2 = query(
      collection(db, "groups"),
      where("members", "array-contains", currentUser.displayName)
    );
    const querySnapshot2 = await getDocs(dbQuerry2);
    querySnapshot2.forEach((document) => {
      joinedGroups.current.push({ name: document.data().name });
    });
    setLoading(false);
  }, [currentUser]);

  const handleChange = (event) => {
    const { value } = event.target;
    setCode((prev) => {
      return {
        ...prev,
        code: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dbQuerry = query(
      collection(db, "groups"),
      where("code", "==", code.code)
    );
    const querySnapshot = await getDocs(dbQuerry);
    try {
      querySnapshot.forEach((document) => {
        const ref = doc(db, "groups", document.id);
        updateDoc(ref, {
          members: arrayUnion(currentUser.displayName),
        });
        alert(`Congrats! You join a new group`);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="join-group">
      <form onSubmit={handleSubmit}>
        <h2>Join a group</h2>
        <FormInput
          label="group name"
          type="text"
          name="groupCode"
          value={code.code}
          onChange={handleChange}
        />
        <CustomButton type="submit"> Join a group </CustomButton>
      </form>
      {!loading ? (
        <ToTheGroup joinedGroups={joinedGroups} />
      ) : (
        console.log("still loading....")
      )}
    </div>
  );
};

export default JoinGroup;
