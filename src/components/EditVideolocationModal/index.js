import { Modal, Spinner } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteVideolocationProcess } from "../../redux/videolocationSlice";
import { useDispatch } from "react-redux";
import { TrashFill } from "react-bootstrap-icons";
import "./SmallCustomizedModal.css";

const EditVideolocationModal = ({ locationId, publicId }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutId = useRef(null);
  const navigate = useNavigate();

  const handleDelete = () => {
    setIsDeleting(true);
    dispatch(
      deleteVideolocationProcess(
        {
          _id: locationId,
          public_id: publicId,
        },
        navigate
      )
    );
    timeoutId.current = setTimeout(() => {
      navigate("/mylocations");
    }, 1.5e3);
  };

  useEffect(
    () => () => {
      clearTimeout(timeoutId.current);
    },
    []
  );

  return (
    <>
      <div className="trash-container" onClick={() => setModalShow(true)}>
        <TrashFill />
      </div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="small-modal"
      >
        <Modal.Body>
          {isDeleting ? (
            <>
              <Spinner animation="border" variant="info" />
              <h4 className="removing-h4">Removing location ...</h4>
            </>
          ) : (
            <>
              <h4>Delete Post?</h4>
              <p>Are you sure you want to delete this post?</p>
              <hr />
              <h6 className="modal-delete" onClick={() => handleDelete()}>
                Delete
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
