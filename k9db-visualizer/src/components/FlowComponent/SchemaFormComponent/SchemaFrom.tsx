import React from "react";
import { Form } from "react-bootstrap";
import "./form.css";

export const SchemaFrom = ({ schema, handleSchema }) => {
  return (
    <Form className="form">
      <Form.Group controlId="formSchema">
        <Form.Control
          className="inputbox"
          type="text"
          placeholder="Please input the schema here..."
          as="textarea"
          rows={20}
          cols={53}
          spellCheck={false}
        />
      </Form.Group>
      <div style={{ paddingTop: "2%" }}>We'll never store your schema.</div>
    </Form>
  );
};
