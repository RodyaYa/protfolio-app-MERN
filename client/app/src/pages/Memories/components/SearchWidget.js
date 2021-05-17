import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { memoryService } from "../../../services/api/memory.service";

function SearchWidget() {
  const history = useHistory();
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);
  let timer;

  const fetchData = async (filter) => {
    if (filter === "") {
      setResults();
      return;
    }
    setLoading(true);
    try {
      console.log(filter);
      memoryService.search(filter).then((promise) => {
        setResults(promise.data);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  async function searchInputHadler(e) {
    if (e.target.value === "") {
      setResults();
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      fetchData(e.target.value);
    }, 1500);
  }

  useEffect(() => {
    console.log(results);
  }, [results]);

  function pushToPost(id) {
    console.log(id);
    history.push(`/memories/${id}`);
  }

  return (
    <div className="input_container">
      <input
        type="text"
        name="query"
        placeholder="Поиск по названию"
        onChange={(e) => {
          searchInputHadler(e);
        }}
      />

      {results && (
        <div className="results">
          {results.map(({ title, _id }, index) => {
            return (
              <div
                key={index}
                className="item"
                onClick={() => {
                  pushToPost(_id);
                }}
              >
                {title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchWidget;
