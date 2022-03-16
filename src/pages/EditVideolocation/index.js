import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { videolocationDetailsProcess } from "../../redux/videolocationSlice";
import { Form } from "react-bootstrap";
import { videolocationUpdateWs } from "../../services/videolocation-ws";
import "./EditVideolocation.css";

const EditVideolocation = () => {
  const { _idToEdit: _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasVerified = useRef(false);
  const hasSetupValues = useRef(false);
  const videolocationDetails = useSelector(
    (state) => state.videolocation.videolocationDetails
  );
  const [values, setValues] = useState({
    title: "",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const setValuesFunct = () => {
    setValues({
      title: videolocationDetails.title,
      description: videolocationDetails.description,
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await videolocationUpdateWs({ _id, values });
      const { status, errorMessage } = res;
      return status ? navigate("/mylocations") : setErrorMessage(errorMessage);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    if (!hasVerified.current) {
      dispatch(videolocationDetailsProcess(_id));
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
        <>
          <div className="formContainer">
            <Form onSubmit={handleLoginSubmit} autoComplete="off">
              <Form.Label>Title</Form.Label>
              {videolocationDetails && (
                <>
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

              <button type="submit">Update</button>
            </Form>
          </div>
          <video src={videolocationDetails.videoUrl} height="400px" />
        </>
      )}
    </>
  );
};

export default EditVideolocation;
