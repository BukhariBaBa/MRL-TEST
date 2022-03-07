import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Style from "../../cssmodule/builder.module.css";
import { page_route, url } from "../../lib/Helper";
import { useRouter } from "next/dist/client/router";
import Cookie from "cookie-cutter";
import Editor from "./helperComponent/_Editor";
import Search from "./helperComponent/_SearchBox";

export default function WorkHistoryContentForm() {
  const PAGE_ROUTE = page_route();
  const URL = url();
  const router = useRouter();
  const [editorData, seteditorData] = useState("");

  const changePage = (pageRoute) => {
    router.push(`/builder/${pageRoute}`);
  };
  const onchange = (editor) => {
    Cookie.set("selected_content", editor);
    seteditorData(Cookie.get("selected_content"));
  };

  const addContent = (e) => {
    let dataText = "";
    if (Cookie.get("selected_content")) {
      dataText = Cookie.get("selected_content");
    }

    if (e.target.classList.contains(Style.active)) {
      e.target.classList.remove(Style.active);
      let new_strr = dataText.replace(
        "&nbsp;",
        " "
      );
      let new_str = new_strr.replace(
        "<li>" + e.currentTarget.innerText + "</li>",
        ""
      );
      Cookie.set("selected_content", new_str);
    } else {
      e.target.classList.add(Style.active);
      let new_strr = e.currentTarget.innerText.replace(
        "&nbsp;",
        " "
      );
      let new_str = dataText + "<ul><li>" + new_strr + "</li></ul>";
      Cookie.set("selected_content", new_str);
    }

    seteditorData(Cookie.get("selected_content"));
  };

  const saveData = () => {
    Cookie.set("work_history_content",editorData);
    router.push(`/builder/${PAGE_ROUTE.WORK_HISTORY_SUMMERY}`);
  };
  useEffect(() => {
    Cookie.set("selected_content", "");
    if(Cookie.get('work_history_content')){
      seteditorData(Cookie.get('work_history_content'));
      Cookie.set("selected_content", Cookie.get('work_history_content'));
    }
  }, []);

  return (
    <>
      <div className={Style.breadcrumb}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className={Style.pagetitle}>Work History</h1>
              <ul>
                <li className={Style.item}>
                  <a href="#">Home</a>
                </li>
                <li className={Style.seperator}>»</li>
                <li className={`${Style.itemcurrent} ${Style.item}`}>
                  Work History
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={Style.clr}></div>
      </div>
      <div className={Style.resumebuilder}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={Style.informationrow}>
                <h3>Describe Key Elements of your previous job</h3>
                <p>
                  Pick or enter the most relevant tasks or achievements at your
                  previous place of work.
                </p>
              </div>

              <div className={Style.searchinggroup}>
                <Search
                  addContent={addContent}
                  searchTypeURL={URL.CATEGORIES_WORKHISTORY}
                />
              </div>

              <div className={Style.worksummarytextarea}>
                <p>
                  (Don't worry if you mess up the format of your text, this will
                  not affect the end result){" "}
                </p>
                <div className={Style.clr}></div>
                <Editor onchange={onchange} editorData={editorData} />
              </div>

              <div className={Style.prevnextBtn}>
                <a
                  href="#"
                  onClick={(event) => changePage(PAGE_ROUTE.WORK_HISTORY)}
                  className={Style.prevBtn}
                >
                  {" "}
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>
                  Back
                </a>
                <button
                  type="button"
                  className={Style.nextBtn}
                  onClick={saveData}
                >
                  Continue {" "}
                  <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.clr}></div>
      </div>
    </>
  );
}
