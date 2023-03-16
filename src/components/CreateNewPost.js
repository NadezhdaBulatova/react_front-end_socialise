import ImgFileUploader from "./ImgFileUploader";
import { useState, useContext } from "react";
import uploadIcon from "../assets/imgs/icon_upload.png";
import useAxios from "../utils/useAxios";
import { postsLink } from "../utils/API_URLs";
import AuthContext from "../contexts/AuthContext";

const CreateNewPost = ({ fetchPosts }) => {
  const [mediaFile, setMediaFile] = useState();
  const [text, setText] = useState();
  const [textChanged, setTextChanged] = useState(false);
  const api = useAxios();
  const { user } = useContext(AuthContext);
  const fileHandler = (file) => {
    setMediaFile(file);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setTextChanged(true);
  };

  const handleSubmit = async () => {
    window.location.reload(false);
    let data = new FormData();
    if (mediaFile) {
      data.append("image", mediaFile);
      data.append("author", user.user_id);
    }
    if (textChanged) data.append("text_content", text);
    const response = await api.post(postsLink, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl w-auto h-fit m-3">
      <figure>
        <ImgFileUploader
          img={uploadIcon}
          handleFile={fileHandler}
          onChange={handleTextChange}
        />
      </figure>
      <div className="card-body">
        <textarea
          onChange={handleTextChange}
          className="textarea textarea-warning"
          placeholder=""
        ></textarea>
        <button
          className="btn btn-primary btn-xs"
          onClick={(e) => {
            handleSubmit(e);
            fetchPosts();
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreateNewPost;
