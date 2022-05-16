import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GroupContext } from "../../contexts/group-context";
import CustomButton from "../custom-button/custom-button.component";

const ToTheGroup = ({ joinedGroups }) => {
  const navigate = useNavigate();
  const { setCurrentGroups } = useContext(GroupContext);
  const handleClick = (group) => {
    navigate(`/group/${joinedGroups.current[group].name}`);
    setCurrentGroups({ name: joinedGroups.current[group].name });
  };
  return (
    <div>
      {Object.keys(joinedGroups.current).map((group) => {
        return (
          <CustomButton key={group} onClick={() => handleClick(group)}>
            {joinedGroups.current[group].name}
          </CustomButton>
        );
      })}
    </div>
  );
};

export default ToTheGroup;
