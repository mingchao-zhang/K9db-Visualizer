import React, { useState } from "react";
import { ControlButton } from "reactflow";
import { PiUploadSimpleBold, PiCheckFatFill } from "react-icons/pi";
import { MyModal } from "../ModalComponent/MyModal";
import parse from "../../../../utils/parse";
import splitTablesEdges from "../../UtilComponent/SplitTablesEdges";

const MyControlButton = ({ name, handleParsedSchema, handleStateChange }) => {
  const [show, setShow] = useState(false);
  const [schema, setSchema] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSchema = (schema) => setSchema(schema);

  const handleSubmit = () => {
    setShow(false);
    let parsedSchema = parse(schema.content);
    handleParsedSchema(parsedSchema);

    let splitRes = splitTablesEdges(parsedSchema);
    console.log(splitRes);
    handleStateChange(splitRes[0], splitRes[1], splitRes[2]);
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
