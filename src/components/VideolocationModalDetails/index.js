import { useState } from "react";
import { Modal } from "react-bootstrap";
import "./VideolocationModalDetails.css";
import VideoPlayer from "../VideoPlayer";

function VideolocationModalDetails({ info }) {
  const [show, setShow] = useState(false);

  return (
    <div className="VideolocationModalDetails">
      <div onClick={() => setShow(true)} className="infoVideoModal">
        <h6>{info.title}</h6>
        <p>Click for more details</p>
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        animation={false}
        centered
        className="videolocations-modal"
      >
        <div className="modal-container">
          {info && (
            <div className="divided-container">
              <div>
                <VideoPlayer
                  videoUrl={info.videoUrl}
                  controls={true}
                  muted={false}
                />
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default VideolocationModalDetails;
