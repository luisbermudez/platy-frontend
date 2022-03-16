import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { videolocationDeleteWs } from "../../services/videolocation-ws";
import "./SmallCustomizedModal.css";

const EditVideolocationModal = ({ locationId, publicId }) => {
  const [modalShow, setModalShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  let timeoutId;

  const handleDelete = () => {
    videolocationDeleteWs({ _id: locationId, public_id: publicId });
    timeoutId = setTimeout(() => {
      return navigate("/mylocations");
    }, 2e3);
  };

  useEffect(() => () => {
    clearTimeout(timeoutId);
  });

  return (
    <>
      <Button variant="dark" onClick={() => setModalShow(true)}>
        Edit
      </Button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="small-modal"
      >
        <Modal.Body>
          {showDeleteModal ? (
            <>
              <h4>Delete Post?</h4>
              <p>Are you sure you want to delete this post?</p>
              <hr />
              <h6 className="modal-delete" onClick={() => handleDelete()}>
                Delete
              </h6>
              <hr />
              <h6 onClick={() => setShowDeleteModal(false)}>Cancel</h6>
            </>
          ) : (
            <>
              <h6
                className="modal-delete"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </h6>
              <hr />
              <h6 onClick={() => navigate(`/edit/${locationId}`)}>
                Update Title & Description
              </h6>
              <hr />
              <h6 onClick={() => setModalShow(false)}>Cancel</h6>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditVideolocationModal;
