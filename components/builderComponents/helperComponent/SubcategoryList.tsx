import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { url } from "../../../lib/Helper";
function SubCategoryList({addContent}) {
  const URL = url();
  const [subCategoryList, setsubCategoryList] = useState([]);
  const renderCheck = true;
  useEffect(() => {
    (async () => {
      try {
        const responseList = await fetch(URL.SUB_CATEGORIES + "106", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const contentList = await responseList.json();
        let subcatList = contentList.subcategories.map((category, i) => {
          return (
            <li key={i} onClick={addContent}>
              {category.title}
            </li>
          );
        });
        setsubCategoryList(subcatList);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [renderCheck]);

  return (
    <>{subCategoryList}</>
  );
}

export default SubCategoryList;
