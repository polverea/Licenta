import { collection, deleteDoc, query, where } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { GroupContext } from "../../contexts/group-context";
import { db } from "../../firebase/firebase.utils";

const DeleteGroup = () => {
  const { currentGroups } = useContext(GroupContext);

  useEffect(async () => {
    const dbQuerry = query(
      collection(db, "groups"),
      where("code", "==", currentGroups.code)
    );
    console.log("dbbbb qqqq", dbQuerry);
  }, []);

  return <h1>{console.log(currentGroups)}</h1>;
};

export default DeleteGroup;
