import FormInput from "../../components/form-input/form-input.component";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/user.context";
import CustomButton from "../../components/custom-button/custom-button.component";
import { doc, updateDoc } from "firebase/firestore";

import { db, updateYourEmail } from "../../firebase/firebase.utils";

import "./profile.styles.scss";

const Profile = () => {
  const [user, setUser] = useState({
    displayName: "",
    oldDisplayName: "",
    email: "",
    oldEmail: "",
  });

  const { currentUser, setCurrentUser } = useContext(UserContext);

  console.log(currentUser);

  useEffect(() => {
    setUser({
      ...user,
      oldDisplayName: currentUser.displayName,
      oldEmail: currentUser.email,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.displayName !== user.oldDisplayName && user.displayName !== "") {
      await setCurrentUser({ ...currentUser, displayName: user.displayName });

      console.log("aici se seteaza display name-ul", currentUser.displayName);

      const ref = doc(db, "users", currentUser.uid);
      await updateDoc(ref, {
        displayName: user.displayName,
      });
    } else {
      alert("Display name is empty!");
    }

    if (user.email !== user.oldEmail && user.email !== "") {
      updateYourEmail(user.email);
      setCurrentUser({ ...currentUser, email: user.email });

      console.log(currentUser.email);

      const ref = doc(db, "users", currentUser.uid);
      await updateDoc(ref, {
        email: user.email,
      });
    } else {
      alert("email is empty!");
    }
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
          {console.log(user)}
          <CustomButton type="submit"> Update </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default Profile;
