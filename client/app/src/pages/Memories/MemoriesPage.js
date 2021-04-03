import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { memoryService } from "../../services/api/memory.service";
import MemoryCard from "./components/MemoryCard";
import SearchWidget from "./components/SearchWidget";
import "./index.css";

function MemoriesPage() {
  const params = useParams();
  const history = useHistory();
  const [pageFilter, setPageFilter] = useState({
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [memories, setMemories] = useState();

  useEffect(() => {
    const { tags } = params;

    if (tags) {
      setPageFilter({ ...pageFilter, tags: [tags] });
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [pageFilter]);

  async function fetchData() {
    setLoading(true);
    const { tags = [] } = pageFilter;
    try {
      const filterObject = {};

      if (tags.length) {
        filterObject.tags = tags.join(";");
      }

      const promise = await memoryService.getPosts(filterObject);

      promise && setMemories(promise);

      promise && setMemories(promise);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  function removeTagFilter(tag) {
    setPageFilter({ ...pageFilter, tags: [] });
    history.push("/memories");
  }

  return (
    <div className="memories">
      <div className="inner">
        <div className="title">
          <h1>Memories</h1>
        </div>
        <div className="head">
          <div className="left">
            <Link className="create_btn" to={"/memories/create"}>
              create new memories
            </Link>
          </div>
          <div className="right">
            <SearchWidget />
          </div>
        </div>
        <div className="total">Total memories : 0</div>
        <div className="search_by_tags">
          {pageFilter?.tags.length > 0 && (
            <>
              <div className="tags">
                <span>Search by: </span>
                {pageFilter?.tags.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="item"
                      onClick={() => {
                        removeTagFilter(item);
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div className="container">
          <div className="box">
            {memories &&
              memories.map((data, index) => {
                return <MemoryCard data={data} key={index} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoriesPage;
