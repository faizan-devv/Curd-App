import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import WebcamComponent from "../Webcam";

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
          Please take a new photo to upload
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <WebcamComponent
          type={props.type}
          email={props.email}
          rerender={props.rerender}
        ></WebcamComponent>
      </Modal.Body>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;
