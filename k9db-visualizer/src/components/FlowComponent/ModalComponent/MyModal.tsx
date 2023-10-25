import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./modal.css";

export const MyModal = ({ show, onHide, content, title }) => {
  return (
    <div>
      <Modal className="mymodal" show={show} onHide={onHide}>
        <div className="mymodaltitle">{title}</div>
        <div className="mymodalbody">{content}</div>
        <Modal.Footer>
          <Button variant="mymodalbutton" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
