import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./modal.css";
import { SchemaFrom } from "../SchemaFormComponent/SchemaFrom";

export const MyModal = ({
  show,
  onHide,
  content,
  title,
  schema,
  handleSchema,
  useSchema,
}) => {
  return (
    <div>
      <Modal className="mymodal" show={show} onHide={onHide}>
        <div className="mymodaltitle">{title}</div>

        {useSchema && (
          <SchemaFrom schema={schema} handleSchema={handleSchema}></SchemaFrom>
        )}
        {useSchema && (
          <Button variant="mymodalbutton" onClick={onHide}>
            Submit
          </Button>
        )}

        {!useSchema && <div className="mymodalbody">{content}</div>}
        <Modal.Footer>
          {!useSchema && (
            <Button variant="mymodalbutton" onClick={onHide}>
              Close
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};
