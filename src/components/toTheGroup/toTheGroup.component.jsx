import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GroupContext } from "../../contexts/group-context";
import CustomButton from "../custom-button/custom-button.component";
import "./toTheGroup.styles.scss";

const ToTheGroup = ({ joinedGroups }) => {
  const navigate = useNavigate();
  const { setCurrentGroups } = useContext(GroupContext);
  const handleClick = (group) => {
    navigate(`/group/${joinedGroups.current[group].name}`);
    setCurrentGroups({
      name: joinedGroups.current[group].name,
      code: joinedGroups.current[group].code,
    });
  };
  return (
    <div className="joined-groups-container">
      <h2 style={{ textAlign: "center" }}>Joined groups:</h2>
      <div className="joined-groups">
        {Object.keys(joinedGroups.current).map((group) => {
          return (
            <CustomButton key={group} onClick={() => handleClick(group)}>
              {joinedGroups.current[group].name}
            </CustomButton>
          );
        })}
      </div>
    </div>
  );
};

export default ToTheGroup;
