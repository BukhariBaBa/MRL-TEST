import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Style from "../../../cssmodule/builder.module.css";
import { page_route, url, update_resume } from "../../../lib/Helper";
import { useRouter } from "next/dist/client/router";
import Cookie from "cookie-cutter";
import Editor from "../helperComponent/_Editor";
import Search from "../helperComponent/_SearchBox";

export default function Skills() {
  const PAGE_ROUTE = page_route();
  const router = useRouter();
  const URL = url();
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

  useEffect(() => {
    (async () => {
      try {
    Cookie.set("selected_content", "");
    if(Cookie.get("resume_id")){
        let resume_id = Cookie.get("resume_id");
        const response = await fetch(URL.GET_RESUME, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resume_id: resume_id }),
        });
        const resume = await response.json();
        const skills = resume.resume.resume[0].skills;
        seteditorData(skills);
        Cookie.set("selected_content", skills);
      }

    } catch (e) {
        console.log(e);
      }
    })();
   
  }, []);
  const saveData = () => {
    let skillsData = Cookie.get('selected_content');
    let postData = {resume_id:Cookie.get("resume_id"),
        skills_data:skillsData
      }
    const res = update_resume(postData,URL.UPDATE_SKILLS);
      router.push(`/builder/${PAGE_ROUTE.RESUME}`);
  };
  return (
    <>
      <div className={Style.breadcrumb}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className={Style.pagetitle}>Skills</h1>
              <ul>
                <li className={Style.item}>
                  <a href="#">Home</a>
                </li>
                <li className={Style.seperator}>»</li>
                <li className={`${Style.itemcurrent} ${Style.item}`}>Skills</li>
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
                <h3>What are your prime Skills & Talents?</h3>
                <p>
                  Select from the existing library of skills or type in your
                  own. Expert’s Recommendations are strongly suggested.
                </p>
              </div>

              <div className={Style.formraw}>
                <div className={Style.searchinggroup}>
                <Search
                  addContent={addContent}
                  searchTypeURL={URL.CATEGORIES_SKILLS}
                />
                </div>

                <div className={Style.skilltextarea}>
                  <p>
                    (Don't worry if you mess up the format of your text, this
                    will not affect the end result){" "}
                  </p>
                  <div className={Style.clr}></div>
                  <Editor onchange={onchange} editorData={editorData} />
                </div>

                <div className={Style.clr}></div>
              </div>
              <div className={Style.prevnextBtn}>
                <a
                  href="#"
                  onClick={(event) => changePage(PAGE_ROUTE.RESUME)}
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
                  Update{" "}
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
