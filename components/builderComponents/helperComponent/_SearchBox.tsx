import React, { useState, useEffect, useRef } from "react";
import SelectSearch, { fuzzySearch } from "react-select-search";
import { page_route, url } from "../../../lib/Helper";
import Style from "../../../cssmodule/builder.module.css";

function _SearchBox({ addContent, searchTypeURL }) {
  const URL = url();
  const [value, setValue] = useState("");
  const [searchOptions, setsearchOptions] = useState([]);
  const [subCategoryList, setsubCategoryList] = useState([]);
  const [isLoaderOn, setisLoaderOn] = useState(true);

  var loader;
  if (isLoaderOn === true) {
    loader = (
      <div className="animated-background">
        <div className="background-masker btn-divide-left"></div>
      </div>
    );
  }

  useEffect(() => {
    (async () => {
      try {
        const responseWorkHisotry = await fetch(searchTypeURL, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const contentWorkHisotry = await responseWorkHisotry.json();
        if(value === ""){
          setValue(contentWorkHisotry.categories[0].id);
        }
        let categoryList = contentWorkHisotry.categories.map((category, i) => {
          return { name: category.title, value: category.id };
        });
        setsearchOptions(categoryList);

        // get subcategory on search base
        const responseList = await fetch(URL.SUB_CATEGORIES + value, {
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
        setisLoaderOn(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [value]);

  const searchQuery = () => {
    console.log("Search:", value);
  };

  const _changeValue = (val) =>{
    setValue(val);
  }

  return (
    <div>
      <div className={Style.searchbar}>
        <SelectSearch
          className="search"
          options={searchOptions}
          search
          filterOptions={fuzzySearch}
          value={value}
          onChange={(chagenval) =>{_changeValue(chagenval)}}
          placeholder="Type in Job Title, Industry or Keyword"
        />
        <button type="button" id="searchworkhistory" onClick={searchQuery}>
          <i className="fa fa-search"></i>
        </button>
      </div>

      <p className={Style.searchtitle}>EXPERT’S RECOMMENDATION</p>

      <ul className={Style.examplessection} id="workhistorysubcat">
      {loader}
      {loader}
      {loader}
      {loader}
        <>{subCategoryList}</>
      </ul>
      
    </div>
  );
}

export default _SearchBox;
