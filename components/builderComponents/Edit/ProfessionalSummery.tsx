import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Style from "../../../cssmodule/builder.module.css";
import { page_route, url, update_resume } from "../../../lib/Helper";
import { useRouter } from "next/dist/client/router";
import Cookie from "cookie-cutter";
import Editor from "../helperComponent/_Editor";
import Search from "../helperComponent/_SearchBox";

export default function ProfessionalSummery() {
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
        const summery = resume.resume.resume[0].summery;
        seteditorData(summery);
        Cookie.set("selected_content", summery);
      }

    } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  const saveData = () => {
    let summeryData = Cookie.get('selected_content');
    let postData = {resume_id:Cookie.get("resume_id"),
        summery_data:summeryData
      }
    const res = update_resume(postData,URL.UPDATE_PROFESSION_SUMMERY);
      router.push(`/builder/${PAGE_ROUTE.RESUME}`);
  };

  return (
    <>
      <div className={Style.breadcrumb}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className={Style.pagetitle}>Professional Summery</h1>
              <ul>
                <li className={Style.item}>
                  <a href="#">Home</a>
                </li>
                <li className={Style.seperator}>»</li>
                <li className={`${Style.itemcurrent} ${Style.item}`}>
                  Professional Summery
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
                <h3>
                  We’re almost done. Let’s finish up with your Professional
                  Summary
                </h3>
                <p>
                  Your Professional Summary is a general view of your entire
                  resume. It's a small introduction that helps recruiters to get
                  a sense of your proficiencies.
                </p>
              </div>

              <div className={Style.formraw}>
                <div className={Style.searchinggroup}>
                <Search
                  addContent={addContent}
                  searchTypeURL={URL.CATEGORIES_PROFESSIONS}
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
