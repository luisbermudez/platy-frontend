import "./AddLocationForm.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextArea from "../TextArea";
import TextInput from "../TextInput";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  clearCoordinates,
  setVideoForNewPost,
} from "../../redux/videolocationSlice";
import {
  CameraVideo,
  CloudUpload,
  ExclamationCircle,
  XLg,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import MapForVideoDetails from "../MapForVideoDetails";
import {
  videolocationCreateWs,
  uploadWs,
} from "../../services/videolocation-ws";
import placeholderVideo from "../../santafe-low.mp4";

const AddLocationForm = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coordinates = useSelector((state) => state.videolocation.coordinates);
  const post = useSelector((state) => state.videolocation.videoForNewPost);
  const [loading, setLoading] = useState(false);
  // const [videoUrl, setVideoUrl] = useState(null);
  // const [public_id, setPublicId] = useState(null);
  const [uploadErrorMessage, setUploadErrorMessage] = useState({
    active: false,
    content: null,
  });
  // const [uploaded, setUploaded] = useState(null);

  const handleUpload = async (e) => {
    setUploadErrorMessage({
      active: false,
      content: null,
    });

    try {
      setLoading(true);
      const uploadData = new FormData();
      uploadData.append("videoFile", e.target.files[0]);

      const res = await uploadWs(uploadData);
      const { data, status, errorMessage } = res;

      if (status) {
        dispatch(
          setVideoForNewPost({
            readyToShare: true,
            videoUrl: data.secure_url,
            public_id: data.public_id,
          })
        );

        // setVideoUrl(data.secure_url);
        // setPublicId(data.public_id);
        setLoading(false);
        // setUploaded(true);
      } else {
        switch (errorMessage) {
          case "400 - Image file format png not allowed":
            setUploadErrorMessage({
              active: true,
              content: "Video is the only type of file allowed.",
            });
            break;
          case "413 - Server returned unexpected status code - 413":
            setUploadErrorMessage({
              active: true,
              content:
                "The size of your video is larger than allowed. Max size 100MB.",
            });
            break;
          default:
            setUploadErrorMessage({
              active: true,
              content: errorMessage,
            });
        }
        setLoading(false);
      }
    } catch (error) {
      setUploadErrorMessage({
        active: true,
        content: "Internal server error. Try again.",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!coordinates) {
      navigate("/add-location");
    }
  }, []);

  return (
    <div className="AddLocationForm">
      {/* {coordinates && (
        <MapForVideoDetails
          lng={coordinates.lng}
          lat={coordinates.lat}
          draggable={true}
        />
      )} */}
      <div className="formContainer">
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
            const { videoUrl, public_id } = post;
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
          <Form autoComplete="off" id="new-post-form">
            {
              <>
                {uploadErrorMessage.active && (
                  <div className="errorMessage">
                    <div>
                      <ExclamationCircle />
                    </div>
                    <div>
                      <p>Video not uploaded</p>
                      <p>
                        {uploadErrorMessage.content
                          ? uploadErrorMessage.content
                          : "Internal Server Error. Please try again."}
                      </p>
                    </div>
                    <div>
                      <XLg
                        onClick={() =>
                          setUploadErrorMessage({
                            active: false,
                            content: null,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
                {post ? (
                  <>
                    {post.videoUrl && <video src={post.videoUrl} />}
                    {/* <video src={placeholderVideo} /> */}
                  </>
                ) : loading ? (
                  <>
                    <p className="loading">
                      Your video is being uploaded ... <CloudUpload />
                    </p>
                  </>
                ) : (
                  <>
                    <label htmlFor="uploadFile">
                      Select video
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
              </>
            }
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddLocationForm;
