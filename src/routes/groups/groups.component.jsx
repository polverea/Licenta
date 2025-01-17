import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";

import GroupItem from "../../components/group-item/group-item.component";
import JoinGroup from "../../components/join-group/join-group.component";
import NewGroup from "../../components/new-group/new-group.component";
import ToTheGroup from "../../components/toTheGroup/toTheGroup.component";
import { UserContext } from "../../contexts/user.context";
import { db } from "../../firebase/firebase.utils";
import "./groups.styles.scss";

const Groups = () => {
  const { currentUser } = useContext(UserContext);
  const [name, setName] = useState();
  const grps = useRef([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const dbQuerry = query(
      collection(db, "groups"),
      where("owner", "==", currentUser.displayName)
    );
    const querySnapshot = await getDocs(dbQuerry);
    try {
      querySnapshot.forEach((document) => {
        console.log(document.id, " => ", document.data());
        if (grps.current.name !== document.data().name) {
          grps.current.push([
            {
              name: document.data().name,
              code: document.data().code,
            },
          ]);
        }
      });
      setLoading(false);
      setName(currentUser.displayName);
    } catch (e) {
      console.log(e);
    }
  }, [currentUser]);

  return (
    <div>
      {!loading ? (
        <h1 style={{ textAlign: "center", paddingBottom: "10vh" }}>
          {" "}
          Welcome {name} to Quiz Platform
        </h1>
      ) : (
        console.log("loading..")
      )}
      <div className="groups-container">
        <NewGroup />
        <JoinGroup />

        <div className="group-of-items">
          <h2>Created groups:</h2>
          {!loading
            ? Object.keys(grps.current).map((grp) => {
                return (
                  <GroupItem
                    key={grp}
                    name={grps.current[grp][0].name}
                    code={grps.current[grp][0].code}
                  />
                );
              })
            : console.log("still loading.. ")}
        </div>
      </div>
    </div>
  );
};

export default Groups;
