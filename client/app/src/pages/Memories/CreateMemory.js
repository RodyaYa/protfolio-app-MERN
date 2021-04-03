import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Editor, { dataKey } from "../../components/editorJs/editor";
import newLocalStorage from "../../scripts/localStorage";
import { imageService } from "../../services/api/image.service";
import { memoryService } from "../../services/api/memory.service";
import TagsWidget from "./components/TagsWidget";
import "./index.css";

const PREV_IMG_LOCAL_STORAGE_NAME = "preview-image-data";

function CreateMemory() {
  const memoryDataLocalStorage = "memoryData";
  const user = newLocalStorage.getUser();
  const history = useHistory();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [editorBody, setBodyData] = useState();
  const [tags, setTags] = useState();

  const previewImage = (localStorage.getItem(PREV_IMG_LOCAL_STORAGE_NAME) &&
    JSON.parse(localStorage.getItem(PREV_IMG_LOCAL_STORAGE_NAME))) || {
    url: "",
    path: "",
  };

  const [memoryData, setMemoryData] = useState({
    previewImage,
    title: "",
    subtitle: "",
    description: "",
    body: "",
    creator: user.userId,
    tags: [],
  });

  //classes
  const [postUploadedButtonClass, setPostUploadedButtonClass] = useState("");
  //end

  useEffect(() => {
    const data = localStorage.getItem(memoryDataLocalStorage);
    if (data) {
      const parsed = JSON.parse(data);
      console.log(parsed);
      setMemoryData(parsed);
    }
  }, []);

  useEffect(() => {
    setMemoryData({ ...memoryData, tags: tags });
  }, [tags]);

  useEffect(() => {
    //console.log(memoryData);
  }, [memoryData]);

  useEffect(() => {
    if (!editorBody) {
      return;
    }
    const body = JSON.stringify(editorBody.blocks);
    body && setMemoryData({ ...memoryData, body });
  }, [editorBody]);

  async function uploadPreviewImageHandler(e) {
    const { files } = e.target;
    if (!files) {
      return;
    }
    try {
      const response = await imageService.upload(files);
      setImageLoading(true);
      if (response) {
        const { currentFolder: previewImage } = response;
        setMemoryData({ ...memoryData, previewImage });
        localStorage.setItem(
          PREV_IMG_LOCAL_STORAGE_NAME,
          JSON.stringify(previewImage)
        );
        setImageUploaded(true);
        setImageLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function saveToDraftHandler() {
    let draft = memoryData;

    draft.createdAt = new Date();

    try {
      memoryService.saveDraft(draft).then((promise) => {
        console.log(promise);
      });
    } catch (error) {
      console.log(error);
    }
  }

  function postMemoryHandler() {
    setPostUploadedButtonClass("loading");
    try {
      memoryService.createPost(memoryData).then((promise) => {
        console.log(promise);
        if (promise.status === 201) {
          clearMemoryData();
          setPostUploadedButtonClass("");
        }
      });
    } catch (error) {
      setPostUploadedButtonClass("");
      console.log(error);
    }
  }

  function inputHandler(e) {
    setMemoryData({ ...memoryData, [e.target.name]: e.target.value });
  }

  function clearMemoryData() {
    localStorage.removeItem(dataKey);
    history.push("/memories");
  }

  return (
    <div className="create_page">
      <div className="inner limiting-container">
        <div className="head">
          <div className="left">
            <div
              className="button"
              onClick={() => {
                history.goBack();
              }}
            >
              {"<"} Back{" "}
            </div>
          </div>
          <div className="right">
            <label
              htmlFor="image"
              className={`button upload_button ${
                imageLoading ? "loading" : ""
              } ${imageUploaded ? "uploaded" : ""}`}
            >
              {imageLoading && <div className="dot-flashing loading"></div>}
              <div
                className="image_preview"
                style={
                  !!memoryData.previewImage.path
                    ? {
                        backgroundImage: `url('${(
                          memoryData.previewImage.path +
                          memoryData.previewImage.url
                        ).replaceAll("\\", "/")}')`,
                      }
                    : { display: "none" }
                }
              ></div>
              Upload image
            </label>
            <input
              onChange={(e) => {
                uploadPreviewImageHandler(e);
              }}
              style={{ display: "none" }}
              type="file"
              name="image"
              id="image"
            />
            {/* <div
              className="button"
              onClick={() => {
                saveToDraftHandler();
              }}
            >
              {" "}
              Save draft{" "}
            </div> */}
            <div
              className={`button ${postUploadedButtonClass}`}
              onClick={() => {
                postMemoryHandler();
              }}
            >
              Post
            </div>
          </div>
        </div>
        <div className="post_head">
          <div className="h">title:</div>
          <textarea
            defaultValue={memoryData?.title}
            type="text"
            name="title"
            onChange={(e) => {
              inputHandler(e);
            }}
          />
          <div className="h">subtitle:</div>
          <textarea
            defaultValue={memoryData?.subtitle}
            type="text"
            name="subtitle"
            onChange={(e) => {
              inputHandler(e);
            }}
          />
          <div className="h">description:</div>
          <textarea
            defaultValue={memoryData?.description}
            type="text"
            name="description"
            onChange={(e) => {
              inputHandler(e);
            }}
          />
          <TagsWidget tags={setTags} />
        </div>
        <div className="editor">
          <Editor setBodyData={setBodyData} />
        </div>
      </div>
    </div>
  );
}

export default CreateMemory;
