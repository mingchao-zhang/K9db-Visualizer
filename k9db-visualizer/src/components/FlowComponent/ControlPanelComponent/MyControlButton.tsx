import React from "react";
import { ControlButton } from "reactflow";
import { PiUploadSimpleBold, PiCheckFatFill} from "react-icons/pi";


const MyControlButton = (props) => {
  return (
    <div>
        {props.name === 'v' ? (
          <ControlButton  onClick={props.action} title="action">
            <PiCheckFatFill />
          </ControlButton>
        ) : (
          <ControlButton  onClick={props.action} title="action">
            <PiUploadSimpleBold />
          </ControlButton>
        )}
    </div>
  );
};

export default MyControlButton;
