import React, { useState } from "react";
import { ControlButton } from "reactflow";
import { PiUploadSimpleBold, PiCheckFatFill } from "react-icons/pi";
import { MyModal } from "../ModalComponent/MyModal";
import parse from "../../../../parser/parse";

const MyControlButton = ({ name, handleParsedSchema }) => {
  const [show, setShow] = useState(false);
  const [schema, setSchema] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSchema = (schema) => setSchema(schema);

  const handleSubmit = () => {
    setShow(false);
    let input = JSON.stringify(schema.content);
    let res = parse(input);
    console.log(parse(input));
    handleParsedSchema(res);
  };

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
          content={
            "hi. Your schema is invalid. Please check the following edges"
          }
          title={"Validation"}
          schema={schema}
          handleSchema={handleSchema}
          useSchema={false}
        />
      ) : (
        <MyModal
          schema={schema}
          show={show}
          onHide={handleSubmit}
          content={"hello"}
          title={"Input Schema"}
          handleSchema={handleSchema}
          useSchema={true}
        />
      )}
    </div>
  );
};

export default MyControlButton;
