import { 
  // useRef, 
  useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { videolocationDetailsWs } from "../../services/videolocation-ws";
import "./VideolocationModalDetails.css";
import VideoCard from "../VideoCard";

function VideolocationModalDetails({ _id }) {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState(undefined);

  const handleApiCall = async () => {
    setShow(true);
    try {
      const res = await videolocationDetailsWs({ _id });
      const { data, 
        // errorMessage, 
        status } = res;
      if (status) {
        setInfo(data.dbLocation);
      }
    } catch (error) {}
  };

  return (
    <>
      <Button variant="dark" onClick={handleApiCall}>
        Details
      </Button>

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
                <h1>{info.title}</h1>
                <VideoCard videoInfo={info} />
                <p>{info.description}</p>
                <Button variant="danger">Delete</Button>
              </div>
              <div>
                <h1>Aqui va el mapa</h1>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default VideolocationModalDetails;
