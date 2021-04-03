import React, { useState, useEffect } from "react";
import EditorJs from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./tools";

export const dataKey = "editorData";

function Editor({ setBodyData }) {
  const [editorInstance, setEditor] = useState(null);
  const newData =
    (localStorage.getItem(dataKey) &&
      JSON.parse(localStorage.getItem(dataKey))) ||
    {};

  useEffect(() => {
    const editor = new EditorJs({
      holder: "editorjs",
      tools: EDITOR_JS_TOOLS,
      data: newData || {},
      placeholder: "Enter something",
      onChange: (e) => {
        saveData(e.saver);
      },
    });

    setEditor(editor);

    //console.log(editorInstance);

    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
          setEditor(null);
        })
        .catch((e) => console.error("ERROR editor cleanup", e));
    };
  }, [EDITOR_JS_TOOLS]);

  async function saveData(editor) {
    try {
      const out = await editor.save();
      localStorage.setItem(dataKey, JSON.stringify(out));
      if (setBodyData) {
        setBodyData(out);
      }
    } catch (error) {
      console.log("Save result failed", error);
    }
  }

  return <div id="editorjs"></div>;
}

export default Editor;
