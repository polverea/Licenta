import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { GroupContext } from "../../contexts/group-context";

import { db } from "../../firebase/firebase.utils";

const ShowAllResults = () => {
  const { currentGroups } = useContext(GroupContext);
  const id = useRef([]);
  const [loading, setLoading] = useState(true);
  const [final, setFinal] = useState([]);
  const members = useRef([]);

  useEffect(async () => {
    const dbQuerry = query(
      collection(db, "groups"),
      where("code", "==", currentGroups.code)
    );
    const querySnapshot = await getDocs(dbQuerry);
    try {
      querySnapshot.forEach((document) => {
        members.current = document.data().members;
      });
    } catch (e) {
      console.log(e);
    }
    const dbQuerry2 = query(
      collection(db, "user-quizzes"),
      where("code", "==", currentGroups.code)
    );

    const querySnapshot2 = await getDocs(dbQuerry2);
    querySnapshot2.forEach((document) => {
      id.current.push({ id: document.id });
    });
    Object.keys(id.current).map(async (idul) => {
      members.current.map(async (member) => {
        const ref = doc(
          collection(
            doc(collection(db, "user-quizzes"), id.current[idul].id),
            member
          ),
          "result"
        );
        const docRef = await getDoc(ref);
        if (docRef.exists()) {
          setFinal((prevState) => [
            ...prevState,
            {
              member: docRef.data().user,
              finalScore: docRef.data().finalScore.current,
              quizTitle: docRef.data().quizTitle,
            },
          ]);
        }
      });
    });
    setLoading(false);
  }, []);
  return (
    <div>
      <table style={{ border: "1px solid" }}>
        <tr>
          <th>Quiz title</th>
          <th>User name</th>
          <th>Result</th>
        </tr>
        {!loading
          ? final.map((fin, key) => {
              return (
                <tr key={key}>
                  <td>{fin.quizTitle}</td>
                  <td>{fin.member}</td>
                  <td>{fin.finalScore}</td>
                </tr>
              );
            })
          : console.log("catch")}
      </table>
    </div>
  );
};

export default ShowAllResults;
