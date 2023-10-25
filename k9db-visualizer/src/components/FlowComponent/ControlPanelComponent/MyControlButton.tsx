import React, { useState } from "react";
import { ControlButton } from "reactflow";
import { PiUploadSimpleBold, PiCheckFatFill } from "react-icons/pi";
import { MyModal } from "../ModalComponent/MyModal";

const MyControlButton = ({ name }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      {name === "v" ? (
        <ControlButton onClick={handleShow} title="action">
          <PiCheckFatFill />
        </ControlButton>
      ) : (
        <ControlButton onClick={handleShow} title="action">
          <PiUploadSimpleBold />
        </ControlButton>
      )}

      {name === "v" ? (
        <MyModal
          show={show}
          onHide={handleClose}
          content={"hi"}
          title={"Validation"}
        />
      ) : (
        <MyModal
          show={show}
          onHide={handleClose}
          content={"hello"}
          title={"Input Schema"}
        />
      )}
    </div>
  );
};

export default MyControlButton;
