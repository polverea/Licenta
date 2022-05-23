import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { GroupContext } from "../../contexts/group-context";
import { UserContext } from "../../contexts/user.context";
import { db } from "../../firebase/firebase.utils";

const ShowJoinedQuizResults = () => {
  const { currentUser } = useContext(UserContext);
  const { currentGroups } = useContext(GroupContext);
  const id = useRef([]);
  const [loading, setLoading] = useState(true);
  const final = useRef([]);

  useEffect(async () => {
    const dbQuerry = query(
      collection(db, "user-quizzes"),
      where("code", "==", currentGroups.code)
    );
    const querySnapshot = await getDocs(dbQuerry);
    querySnapshot.forEach((document) => {
      id.current.push(document.id);
    });
    id.current.map(async (idul) => {
      const ref = collection(
        doc(collection(db, "user-quizzes"), idul),
        currentUser.displayName
      );
      const refSnapshot = await getDocs(ref);
      refSnapshot.forEach((document) => {
        if (document.data().finalScore) {
          setLoading(true);
          final.current.push({
            result: document.data().finalScore.current,
            quizTitle: document.data().quizTitle,
          });
          setLoading(false);
        }
      });
    });
  }, []);

  return (
    <div className="results">
      <h1>
        {!loading
          ? Object.keys(final.current).map((index) => {
              return (
                <h3>
                  Your result for {final.current[index].quizTitle} is{" "}
                  {final.current[index].result} points
                </h3>
              );
            })
          : console.log("final", final.current)}
      </h1>
    </div>
  );
};

export default ShowJoinedQuizResults;
