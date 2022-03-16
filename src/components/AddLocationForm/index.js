import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextArea from "../TextArea";
import TextInput from "../TextInput";
import { useSelector } from "react-redux";
import {
  videolocationCreateWs,
  uploadWs,
} from "../../services/videolocation-ws";
import { useState } from "react";

const AddLocationForm = ({ coordinateLng, coordinateLat }) => {
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [public_id, setPublicId] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploaded, setUploaded] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpload = async (e) => {
    try {
      setLoading(true);
      const uploadData = new FormData();
      uploadData.append("videoFile", e.target.files[0]);

      const res = await uploadWs(uploadData);
      const { data, errorMessage, status } = res;

      if (status) {
        setVideoUrl(data.secure_url);
        setPublicId(data.public_id);
        setLoading(false);
        setUploaded(true);
      } else {
        setUploadError(errorMessage);
      }
    } catch (error) {
      setUploadError(error);
    }
  };

  return (
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
        onSubmit={async (values, { setSubmitting }) => {
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
            setSuccess(true);
          }
        }}
      >
        <Form autoComplete="off">
          {success ? (
            <h1>The video-location has been added 📹</h1>
          ) : (
            <>
              <TextInput
                label="Location name"
                name="name"
                type="text"
                placeholder="Any name for your location?"
              />
              {uploaded ? (
                <h2>Video uploaded ✔️</h2>
              ) : loading ? (
                <h2>Your video is being uploaded ...</h2>
              ) : (
                <TextInput
                  label="Video File"
                  name="videoFile"
                  type="file"
                  onChange={handleUpload}
                />
              )}
              {uploadError && <h2>{uploadError}</h2>}
              <TextInput label="Title" name="title" type="text" />
              <TextArea label="Description" name="description" />
              <button type="submit">Add Location</button>
            </>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default AddLocationForm;
