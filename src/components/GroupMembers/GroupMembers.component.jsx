import React, { useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase.utils";
import { GroupContext } from "../../contexts/group.context";
import { useContext, useState } from "react";
import "./GroupMembers.styles.scss";

export const Members = () => {
  const { currentGroups } = useContext(GroupContext);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const dbQuerry = query(
      collection(db, "groups"),
      where("code", "==", currentGroups.code)
    );
    const querySnapshot = await getDocs(dbQuerry);
    try {
      querySnapshot.forEach((document) => {
        setMembers(...members, document.data().members);
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <h1> Group members</h1>
      {!loading
        ? members.map((member) => {
            return (
              <div className="members">
                <h2>{member}</h2>
              </div>
            );
          })
        : console.log(".....loading....")}
    </>
  );
};
