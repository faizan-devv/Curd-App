import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Please confirm to delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>This Entry will be deleted</h4>
        <p>Permenent deletion will occur</p>
        <Button className="btn-danger" onClick={props.delete}>
          Confirm
        </Button>
      </Modal.Body>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;
