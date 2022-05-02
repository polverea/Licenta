import React, { useContext } from "react";
import CustomButton from "../custom-button/custom-button.component";
import { useNavigate } from "react-router-dom";
import { GroupContext } from "../../contexts/group-context";

export default function GroupItem({ code, name }) {
  const navigate = useNavigate();
  const { setCurrentGroups } = useContext(GroupContext);

  const handleSubmit = () => {
    console.log("handleSubmit", name, "+", code);
    setCurrentGroups({ name: name, code: code });
    navigate(`/groups/${code}`);
  };
  return (
    <div>
      <CustomButton onClick={handleSubmit}>{name}</CustomButton>
      <h3>Your group code is: {code}</h3>
    </div>
  );
}
