import FormInput from "../../components/form-input/form-input.component";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/user.context";
import CustomButton from "../../components/custom-button/custom-button.component";
import { doc, updateDoc } from "firebase/firestore";

import {
  db,
  updateYourDisplayName,
  updateYourEmail,
} from "../../firebase/firebase.utils";

import "./profile.styles.scss";

const Profile = () => {
  const [user, setUser] = useState({
    email: "",
    displayName: "",
  });

  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    setUser({
      displayName: currentUser.displayName ? currentUser.displayName : "456",
      email: currentUser.email ? currentUser.email : "456",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isOk = true;
    if (user.displayName !== "") {
      await updateYourDisplayName(user.displayName);
      setCurrentUser({ ...currentUser, displayName: user.displayName });
    } else {
      alert("Display Name is empty");
      isOk = false;
    }
    console.log("aici se seteaza display name-ul", currentUser.displayName);

    const ref = doc(db, "users", currentUser.uid);
    await updateDoc(ref, {
      displayName: user.displayName,
    });

    if (user.email !== "") {
      updateYourEmail(user.email);
      setCurrentUser({ ...currentUser, email: user.email });

      const ref = doc(db, "users", currentUser.uid);
      await updateDoc(ref, {
        email: user.email,
      });
    } else {
      alert("email is empty!");
      isOk = false;
    }
    if (isOk) alert("Update complete");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="container">
      <div className="profile">
        <h2> Update your profile </h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Display Name"
            type="text"
            name="displayName"
            value={user.displayName}
            onChange={handleChange}
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />

          <CustomButton type="submit"> Update </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default Profile;
