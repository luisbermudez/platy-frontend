import "./AddLocationForm.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextArea from "../TextArea";
import TextInput from "../TextInput";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { clearCoordinates } from "../../redux/videolocationSlice";
import {
  CameraVideo,
  CloudUpload,
  Check,
  ExclamationCircle,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import MapForVideoDetails from "../MapForVideoDetails";
import {
  videolocationCreateWs,
  uploadWs,
} from "../../services/videolocation-ws";

const AddLocationForm = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coordinates = useSelector((state) => state.videolocation.coordinates);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [public_id, setPublicId] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploaded, setUploaded] = useState(null);

  const handleUpload = async (e) => {
    setUploadError(false);
    try {
      setLoading(true);
      const uploadData = new FormData();
      uploadData.append("videoFile", e.target.files[0]);

      const res = await uploadWs(uploadData);
      const { data, status } = res;

      if (status) {
        setVideoUrl(data.secure_url);
        setPublicId(data.public_id);
        setLoading(false);
        setUploaded(true);
      } else {
        setUploadError(true);
      }
    } catch (error) {
      setUploadError(true);
    }
  };

  useEffect(() => {
    if (!coordinates) {
      navigate("/add-location");
    }
  }, []);

  return (
    <div className="AddLocationForm">
      {coordinates && (
        <MapForVideoDetails
          lng={coordinates.lng}
          lat={coordinates.lat}
          draggable={true}
        />
      )}
      <div className="formContainer">
        {videoUrl && <video src={videoUrl} />}
        <Formik
          initialValues={{
            title: "",
            description: "",
            name: "",
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("This field is required."),
            description: Yup.string().required("This field is required."),
            name: Yup.string(),
          })}
          onSubmit={async (values) => {
            const coordinateLng = coordinates.lng;
            const coordinateLat = coordinates.lat;
            const res = await videolocationCreateWs({
              values,
              user,
              coordinateLng,
              coordinateLat,
              videoUrl,
              public_id,
            });
            const { status } = res;
            if (status) {
              dispatch(clearCoordinates());
              navigate("/");
            }
          }}
        >
          <Form autoComplete="off">
            {
              <>
                {uploadError ? (
                  <>
                    <label htmlFor="uploadFile">
                      <CameraVideo className="cameraVideo" />
                    </label>
                    <input
                      id="uploadFile"
                      name="videoFile"
                      type="file"
                      onChange={handleUpload}
                    />
                    <div className="errorMessage">
                      <p className="uploadLabel">
                        <ExclamationCircle /> Video was not uploaded
                      </p>
                      <p className="maxSize">
                        The size of the video is larger than allowed. Max size
                        is 100MB.
                      </p>
                    </div>
                  </>
                ) : uploaded ? (
                  <>
                    <label htmlFor="uploadFile">
                      <Check className="uploaded" />
                    </label>
                    <p className="uploadLabel">Video uploaded</p>
                    <p className="maxSize">Video is ready to submit</p>
                  </>
                ) : loading ? (
                  <>
                    <label htmlFor="uploadFile">
                      <CloudUpload className="uploaded" />
                    </label>
                    <p className="uploadLabel">
                      Your video is being uploaded ...
                    </p>
                    <p className="maxSize">This will take just a second</p>
                  </>
                ) : (
                  <>
                    {/* <p className="uploadLabel">Click to upload</p>
                    <p className="maxSize">Max size is 100 MB</p> */}
                    <label htmlFor="uploadFile">
                      <CameraVideo className="cameraVideo" />
                    </label>
                    <input
                      id="uploadFile"
                      name="videoFile"
                      type="file"
                      onChange={handleUpload}
                    />
                  </>
                )}
                <TextInput label="Location name" name="name" type="text" />
                <TextInput label="Title" name="title" type="text" />
                <TextArea label="Description" name="description" />
                {uploaded && <button type="submit">Submit</button>}
              </>
            }
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddLocationForm;
