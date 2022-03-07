import Link from "next/link";
import Style from "../../cssmodule/builder.module.css";
import { page_route, url } from "../../lib/Helper";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import Cookie from "cookie-cutter";
import Editor from "./helperComponent/_Editor";
import ProfessionalLinks from "./helperComponent/_ProfessionalLinks";

export default function AdditionalSection() {
  const PAGE_ROUTE = page_route();
  const router = useRouter();
  const URL = url();
  const [sectionsList, setsectionsList] = useState([]);
  const [sectionTitle, setSectionTitle] = useState();
  const [sectionId, setSectionId] = useState("");
  const [editorData, seteditorData] = useState("");
  const [activeSection, setactiveSection] = useState([]);
  const [customTitle, setCustomTitle] = useState("");
  const [linkLinkedIn, setLinkLinkedIn] = useState("");
  const [linkBehance, setLinkBehance] = useState("");
  const [linkWebsite, setLinkWebsite] = useState("");
  const [linkOther, setLinkOther] = useState("");
  const [errorlinkLinkedIn, seterrorLinkLinkedIn] = useState("");
  const [errorlinkBehance, seterrorLinkBehance] = useState("");
  const [errorlinkWebsite, seterrorLinkWebsite] = useState("");
  const [errorlinkOther, seterrorLinkOther] = useState("");
  const [sectoinList, setsectionList] = useState([]);
  const [linkChange, setlinkChange] = useState(false);

  const changePage = (pageRoute) => {
    router.push(`/builder/${pageRoute}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const responseList = await fetch(URL.SECTION_LIST, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const contentList = await responseList.json();
        setsectionList(contentList.sections);
        let sectionList = contentList.sections.map((section, i) => {
          return (
            <div key={i} className={Style.checkboxadditionalsection}>
              <label>
                <input
                  className={Style.radio}
                  type="checkbox"
                  onClick={(e) => {
                    _checkboxHandler(e, section.title, section.id);
                  }}
                />
                <span>{section.title}</span>
              </label>
            </div>
          );
        });
        setsectionsList(sectionList);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  useEffect(() => {
    let sect;
    if (sectionId) {
      if (sectionId == "1") {
        sect = (
          <>
            <h3>{sectionTitle}</h3>
            <div className={Style.additionalsectionarea}>
              <div className={Style.customfield}>
                <div className={Style.formraw}>
                  <input
                    className={Style.customtitle}
                    type="text"
                    name="customtitle"
                    id="customtitle"
                    defaultValue={customTitle}
                    onChange={(e) => {
                      setCustomTitle(e.target.value);
                    }}
                    placeholder="Custom Title"
                  />
                </div>
                <div className={Style.formraw}>
                  <Editor onchange={onchange} editorData={editorData} />
                </div>
              </div>
              <div className={Style.clr}></div>
            </div>
          </>
        );
      } else {
        sect = (
          <>
            <h3 className={Style.mrb}>{sectionTitle}</h3>
			 <div className={Style.clr}></div>
            <Editor onchange={onchange} editorData={editorData} />
          </>
        );
      }
    } else {
      sect = (
        <>
          <ProfessionalLinks
            onchangeLink={onchangeLink}
            linkLinkedIn={linkLinkedIn}
            linkBehance={linkBehance}
            linkWebsite={linkWebsite}
            linkOther={linkOther}
            errorlinkLinkedIn={errorlinkLinkedIn}
            errorlinkBehance={errorlinkBehance}
            errorlinkWebsite={errorlinkWebsite}
            errorlinkOther={errorlinkOther}
          />
        </>
      );
      setlinkChange(false);
    }
    setactiveSection(sect);
  }, [sectionId, editorData, linkChange]);

  const onchange = (editor) => {
    seteditorData(editor);
    let cookie_id = "section_" + sectionId;
    Cookie.set(`${cookie_id}`, editorData);
  };

  const _checkboxHandler = (e, title, id) => {
    if (e.target.checked) {
      seteditorData("");
      setSectionTitle(title);
      setSectionId(id);
    } else {
      setSectionId("");
    }
  };

  const onchangeLink = (e, type) => {
    let errorFound = true;
    if (type == "linkedin") {
      let formate =
        /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/gm;
      if (e.target.value.match(formate)) {
        errorFound = false;
        setLinkLinkedIn(e.target.value);
      } else {
        errorFound = true;
      }
    } else if (type == "behance") {
      let formate =
        /((https?:\/\/)?((www|\w\w)\.)?behance\.net\/)(((([\w|\d-&#?=])+\/?){1,}))$/g;
      if (e.target.value.match(formate)) {
        errorFound = false;
        setLinkBehance(e.target.value);
      } else {
        errorFound = true;
      }
    } else if (type == "website") {
      let formate =
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
      if (e.target.value.match(formate)) {
        errorFound = false;
        setLinkWebsite(e.target.value);
      } else {
        errorFound = true;
      }
    } else if (type == "other") {
      let formate =
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
      if (e.target.value.match(formate)) {
        errorFound = false;
        setLinkOther(e.target.value);
      } else {
        errorFound = true;
      }
    }
    if (e.target.value.length > 0) {
      if (errorFound == true) {
        e.target.classList.add(Style.error);
        e.target.classList.remove(Style.success);
        e.target.nextElementSibling.classList.remove("fa-check");
        e.target.nextElementSibling.classList.add("fa-times");
        e.target.nextElementSibling.classList.add(Style.errorIcon);
      } else {
        e.target.classList.remove(Style.error);
        e.target.classList.add(Style.success);
        e.target.nextElementSibling.classList.add("fa-check");
        e.target.nextElementSibling.classList.remove("fa-times");
        e.target.nextElementSibling.classList.remove(Style.errorIcon);
      }
    }else{
      e.target.classList.remove(Style.error);
      e.target.nextElementSibling.classList.remove("fa-times");
      e.target.nextElementSibling.classList.remove(Style.errorIcon);
    }

    setlinkChange(true);
  };

  const finalizeResume = async () => {
    let sectionsAdded = {};
    if (sectoinList) {
      sectoinList.map((section, i) => {
        let cookie_id = "section_" + section.id;
        if (Cookie.get(`${cookie_id}`)) {
          sectionsAdded[`${cookie_id}`] = Cookie.get(`${cookie_id}`);
          Cookie.set(`${cookie_id}`, "");
        }
      });
    }

    let links = {
      linkedin: linkLinkedIn,
      behance: linkBehance,
      website: linkWebsite,
      other: linkOther,
    };

    Cookie.set("links",JSON.stringify(links));
    Cookie.set("sections",JSON.stringify(sectionsAdded));
    Cookie.set("custom_title",customTitle);

    const response = await fetch(URL.USER, {
      credentials: "include",
    });
    const content = await response.json();
    if(content){
      changePage(PAGE_ROUTE.RESUME);
    }else{
      changePage(PAGE_ROUTE.SAVE_PASSWORD);
    }
  };
  
  return (
    <>
      <div className={Style.breadcrumb}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className={Style.pagetitle}>Additional Section</h1>
              <ul>
                <li className={Style.item}>
                  <a href="#">Home</a>
                </li>
                <li className={Style.seperator}>»</li>
                <li className={`${Style.itemcurrent} ${Style.item}`}>
                  Additional Section
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
                <h3>Add additional section </h3>
                <p>
                  Select the options you want to fill in details for you can
                  update any time.
                </p>
              </div>
            </div>
            <div className={Style.clr}></div>
          </div>
          <div className="row">
            <div className="col-3">
              <div className={Style.formraw}>
                <div className={Style.checkboxadditionalsection}>
                  <label>
                    <input
                      className={Style.radio}
                      type="checkbox"
                      checked={true}
                      onChange={(e) => {
                        console.log("change checkbox");
                      }}
                      // disabled={true}
                    />
                    <span>Websites, Portfolios, Profiles</span>
                  </label>
                </div>
                {sectionsList}
              </div>
            </div>
            <div className="col-6">
              <div className={Style.additionalsectionarea}>
                <div className={Style.affiliations}>
                  <div className={Style.formraw}>
                    <div className={Style.clr}></div>
                    <div className={Style.searchinggroupfull}>
                      {activeSection}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <img
                src="/assets/images/resume-template/resume-template_1.jpg"
                alt="My Resume Lift Template"
              />
            </div>
          </div>
          <div className={Style.prevnextBtn}>
            <a
              href="#"
              onClick={(event) => changePage(PAGE_ROUTE.PROFESSIONAL_SUMMERY)}
              className={Style.prevBtn}
            >
              {" "}
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
              Back
            </a>
            <button
              type="button"
              className={Style.nextBtn}
              onClick={finalizeResume}
            >
              Finalize{" "}
            </button>
          </div>
        </div>
        <div className={Style.clr}></div>
      </div>
    </>
  );
}
