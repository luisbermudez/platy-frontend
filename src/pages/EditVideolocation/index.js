import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  videolocationDetailsProcess,
  clearVideolocationDetails,
} from "../../redux/videolocationSlice";
import { Form } from "react-bootstrap";
import { videolocationUpdateWs } from "../../services/videolocation-ws";
import EditVideolocationModal from "../../components/EditVideolocationModal";
import "./EditVideolocation.css";
import VideoPlayer from "../../components/VideoPlayer";

const EditVideolocation = () => {
  const { _idToEdit: _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const videolocationDetails = useSelector(
    (state) => state.videolocation.videolocationDetails
  );
  const hasVerified = useRef(false);
  const hasSetupValues = useRef(false);

  const [isUpdated, setIsUpdated] = useState(false);
  const [values, setValues] = useState({
    title: "",
    locationName: "",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const setValuesFunct = () => {
    setValues({
      title: videolocationDetails.title,
      locationName: videolocationDetails.location.name,
      description: videolocationDetails.description,
    });
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

  useEffect(() => {
    return () => {
      dispatch(clearVideolocationDetails());
    };
  }, []);

  return (
    <div className="EditVideolocation">
      <h1>Edit post</h1>
      {errorMessage && <h5>{errorMessage}</h5>}
      {videolocationDetails && (
        <div className="editMainContainer">
          <section className="editSection">
            <div className="formContainer edit-formcontainer">
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
                    <Form.Label>Location Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="locationName"
                      value={values.locationName}
                      onChange={handleInput}
                    />
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      as="textarea"
                      rows="4"
                      value={values.description}
                      onChange={handleInput}
                    />
                  </>
                )}
                <button type="submit" disabled={submitDisabled}>
                  Update
                </button>
                {isUpdated && (
                  <p className="successMessage">
                    Information has been updated.
                    <strong
                      onClick={() =>
                        navigate(`/details/${videolocationDetails._id}`)
                      }
                    >
                      {" "}
                      Go to post
                    </strong>
                  </p>
                )}
              </Form>
            </div>
          </section>
          <VideoPlayer
            videoInfo={videolocationDetails}
            videosGlobalState={null}
            singleVideo={true}
          />
        </div>
      )}
    </div>
  );
};

export default EditVideolocation;
