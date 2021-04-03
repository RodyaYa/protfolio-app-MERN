import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { memoryService } from "../../services/api/memory.service";

function SingleMemoryPage() {
  const params = useParams();
  const history = useHistory();
  const [post, setPost] = useState();

  console.log(params);

  const fetchData = () => {
    memoryService.getPostById(params.id).then((promise) => {
      setPost(promise);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(post);
  }, [post]);

  return (
    <div className="single_memory">
      <div className="inner container">
        <div className="post_header">
          <div
            className="back_button"
            onClick={() => {
              history.goBack();
            }}
          >
            {"<="}Back to posts
          </div>
        </div>
        <div className="content">
          <div className="title">{post?.title}</div>
          <div className="subtitle">{post?.subtitle}</div>
          <div className="description">{post?.description}</div>
          <div className="body">{post?.body}</div>
        </div>
      </div>
    </div>
  );
}

export default SingleMemoryPage;
