import {
  getDoc,
  setDoc,
  addDoc,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import GenerateRandomCode from "react-random-code-generator";
import { UserContext } from "../../contexts/user.context";
import { db } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./new-group.styles.scss";

const NewGroup = () => {
  const { currentUser } = useContext(UserContext);
  const [group, setGroup] = useState({
    owner: "",
    code: "",
    name: "",
    members: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGroup((prev) => {
      return {
        ...prev,
        owner: currentUser.displayName,
        code: GenerateRandomCode.NumCode(20),
        [name]: value,
      };
    });
  };

  const createGroup = async () => {
    const { name, code, owner, members } = group;
    const ref = collection(db, "groups");
    try {
      await addDoc(ref, {
        name,
        code,
        owner,
        members,
      });
    } catch (e) {
      console.log("error", e.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createGroup();
  };

  return (
    <div className="create-group">
      <h2> Create a new group </h2>
      <h3> Here you can create a new group of people and add a quiz </h3>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Group name"
          type="text"
          name="name"
          value={group.name}
          onChange={handleChange}
          required
        />
        <CustomButton type="submit"> Create a group</CustomButton>
      </form>
    </div>
  );
};

export default NewGroup;
