import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { db } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

const JoinGroup = () => {
  const { currentUser } = useContext(UserContext);
  const [code, setCode] = useState({
    code: "",
  });

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
        console.log(document.id, " => ", document.data().owner);
        const ref = doc(db, "groups", document.id);
        updateDoc(ref, { members: arrayUnion(currentUser.displayName) });
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="join-group">
      <form onSubmit={handleSubmit}>
        <FormInput
          label="group name"
          type="text"
          name="groupCode"
          value={code.code}
          onChange={handleChange}
        />
        <CustomButton type="submit"> Join a group </CustomButton>
      </form>
    </div>
  );
};

export default JoinGroup;
