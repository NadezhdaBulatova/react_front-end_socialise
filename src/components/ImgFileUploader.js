import { useRef } from "react";

const ImgFileUploader = (props) => {
  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };
  return (
    <div className="flex-1 flex flex-col justify-center">
      <button
        className="btn btn-outline btn-warning btn-sm m-2"
        onClick={handleClick}
      >
        Upload image
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImgFileUploader;
