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
      <h2> Hi, {currentUser.displayName}. Here are your results: </h2>
      <table>
        <tr>
          <th>Quiz title</th>
          <th>Result</th>
        </tr>
        {!loading
          ? Object.keys(final.current).map((index) => {
              return (
                <tr key={index}>
                  <td>{final.current[index].quizTitle}</td>
                  <td>{final.current[index].result} points</td>
                </tr>
              );
            })
          : console.log("final", final.current)}
      </table>
    </div>
  );
};

export default ShowJoinedQuizResults;
