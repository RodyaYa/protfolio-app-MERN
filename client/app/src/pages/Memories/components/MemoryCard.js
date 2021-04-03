import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function MemoryCard({ data }) {
  const moment = require("moment");
  const {
    body,
    creator,
    tags,
    likeCount,
    previewImage,
    createdAt,
    title,
    subtitle,
    description,
    _id,
  } = data;

  const [elementReady, setElementReady] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setElementReady(true);
  }, [data]);

  function searchByTag(e, tag) {
    history.push(`/memories/by-tags/${tag}`);
  }

  function pushToArticle(id) {
    history.push(`/memories/${id}`);
  }

  if (elementReady) {
    return (
      <>
        <div className="item">
          <div className="item__header">
            <div className="user_info">
              <div className="name">{creator.login}</div>
            </div>
            <div className="date">{moment(createdAt).format("DD.MM")}</div>
          </div>
          <div className="post_head">
            <div
              className="title"
              onClick={() => {
                pushToArticle(_id);
              }}
            >
              {title}
            </div>
            <div
              className="subtitle"
              onClick={() => {
                pushToArticle(_id);
              }}
            >
              {subtitle}
            </div>
            <div
              className="description"
              onClick={() => {
                pushToArticle(_id);
              }}
            >
              {description}
            </div>
          </div>
          {/* <div
            className="preview_image"
            style={{
              backgroundImage: `url('${(
                previewImage.path + previewImage.url
              ).replaceAll("\\", "/")}')`,
            }}
          /> */}
          <div className="tags">
            {tags.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => {
                    searchByTag(e, item);
                  }}
                  className="tags_item"
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  } else {
    return <div>Loading</div>;
  }
}

export default MemoryCard;
