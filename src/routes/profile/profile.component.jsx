import FormInput from "../../components/form-input/form-input.component";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/user.context";
import CustomButton from "../../components/custom-button/custom-button.component";
import { doc, updateDoc } from "firebase/firestore";

import {
  db,
  updateYourEmail,
  updateYourPassword,
} from "../../firebase/firebase.utils";

const Profile = () => {
  const [user, setUser] = useState({
    displayName: "",
    oldDisplayName: "",
    email: "",
    oldEmail: "",
  });

  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser)
      setUser({
        ...user,
        oldDisplayName: currentUser.displayName,
        oldEmail: currentUser.email,
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.displayName !== user.oldDisplayName) {
      setCurrentUser({ ...currentUser, user });

      console.log(currentUser.displayName);

      const ref = doc(db, "users", currentUser.uid);
      await updateDoc(ref, {
        displayName: user.displayName,
      });
    }

    if (user.email !== user.oldEmail) {
      updateYourEmail(user.email);
      setCurrentUser({ ...currentUser, user });

      console.log(currentUser.email);

      const ref = doc(db, "users", currentUser.uid);
      await updateDoc(ref, {
        email: user.email,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div>
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
  );
};

export default Profile;
