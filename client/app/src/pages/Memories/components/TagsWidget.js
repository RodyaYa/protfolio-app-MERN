import React, { useEffect, useState } from "react";

function TagsWidget(props) {
  const response = props.tags;
  const [tags, setTags] = useState([]);

  useEffect(() => {
    response(tags);
  }, [tags]);

  function setTagHangler(e) {
    if (e.key === "Enter") {
      const tag = e.target.value;
      setTags([...tags, tag]);
      e.target.value = null;
    }
  }

  function removeTagHandler(e, tag) {
    const filtered = tags.filter((item) => item !== tag);
    setTags(filtered);
  }

  return (
    <div className="tag_widget">
      <div className="label">Enter tag</div>
      <input
        className="input"
        type="text"
        onKeyDown={(e) => {
          setTagHangler(e);
        }}
      />
      <div className="container">
        {tags &&
          tags.map((item) => (
            <div
              className="item"
              onClick={(e) => {
                removeTagHandler(e, item);
              }}
            >
              {item}
            </div>
          ))}
      </div>
    </div>
  );
}

export default TagsWidget;
