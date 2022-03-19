import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { videolocationDetailsProcess } from "../../redux/videolocationSlice";
import { Form } from "react-bootstrap";
import { Files } from "react-bootstrap-icons";
import { videolocationUpdateWs } from "../../services/videolocation-ws";
import EditVideolocationModal from "../../components/EditVideolocationModal";
import "./EditVideolocation.css";

const EditVideolocation = () => {
  const { _idToEdit: _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const videolocationDetails = useSelector(
    (state) => state.videolocation.videolocationDetails
  );
  const hasVerified = useRef(false);
  const hasSetupValues = useRef(false);
  const urlHT = useRef(null);
  const toolTip = useRef(null);

  const [isUpdated, setIsUpdated] = useState(false);
  const [values, setValues] = useState({
    title: "",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const setValuesFunct = () => {
    setValues({
      title: videolocationDetails.title,
      description: videolocationDetails.description,
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(urlHT.current.innerText);
    toolTip.current.innerText = "Link copied";
  };

  const handleInput = (e) => {
    if (isUpdated) {
      setIsUpdated(false);
    }
    if (submitDisabled) {
      setSubmitDisabled(false);
    }
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    setSubmitDisabled(true);
    e.preventDefault();
    try {
      const res = await videolocationUpdateWs({ _id, values });
      const { status, errorMessage } = res;
      return status ? setIsUpdated(true) : setErrorMessage(errorMessage);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    if (!hasVerified.current) {
      dispatch(videolocationDetailsProcess({ _id }, navigate));
      hasVerified.current = true;
    }
  });

  useEffect(() => {
    if (!hasSetupValues.current) {
      if (videolocationDetails) {
        setValuesFunct();
        hasSetupValues.current = true;
      }
    }
  });

  return (
    <>
      <h1>Edit Information</h1>
      {errorMessage && <h5>{errorMessage}</h5>}
      {videolocationDetails && (
        <div className="editMainContainer">
          <section className="editSection">
            <div>
              <video src={videolocationDetails.videoUrl} height="120px" />
            </div>
            <div className="formContainer">
              <Form onSubmit={handleLoginSubmit} autoComplete="off">
                <EditVideolocationModal
                  locationId={videolocationDetails._id}
                  publicId={videolocationDetails.public_id}
                />
                {videolocationDetails && (
                  <>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleInput}
                    />
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      as="textarea"
                      rows="3"
                      value={values.description}
                      onChange={handleInput}
                    />
                  </>
                )}
                {isUpdated && (
                  <p>
                    <strong>Information has been updated ✔️</strong>
                  </p>
                )}
                <button type="submit" disabled={submitDisabled}>
                  Update
                </button>
              </Form>
            </div>
          </section>
          <div>
            <video
              src={videolocationDetails.videoUrl}
              controls
              height="300px"
            />
            <h6>Post Link</h6>
            <Link
              className="urlHT"
              ref={urlHT}
              to={`/details/${videolocationDetails._id}`}
            >
              https://platy.netlify.app/details/{videolocationDetails._id}
            </Link>
            <section className="tooltipEdit">
              <Files
                onMouseOut={() =>
                  (toolTip.current.innerText = "Copy to clipboard")
                }
                onClick={handleCopyLink}
                className="CopyIcon"
              />
              <span ref={toolTip} className="tooltiptext" id="myTooltip">
                Copy to clipboard
              </span>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default EditVideolocation;
