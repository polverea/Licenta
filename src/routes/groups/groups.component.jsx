import { useContext, useState } from "react";

import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import JoinGroup from "../../components/join-group/join-group.component";
import NewGroup from "../../components/new-group/new-group.component";
import { UserContext } from "../../contexts/user.context";
import "./groups.styles.scss";

const Groups = () => {
  return (
    <div className="groups-container">
      <NewGroup />
      <JoinGroup />
    </div>
  );
};

export default Groups;
