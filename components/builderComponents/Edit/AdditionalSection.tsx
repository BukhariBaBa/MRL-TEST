import Link from "next/link";
import Style from "../../../cssmodule/builder.module.css";
import { page_route, url } from "../../../lib/Helper";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import Cookie from "cookie-cutter";
import Editor from "../helperComponent/_Editor";
import ProfessionalLinks from "../helperComponent/_ProfessionalLinks";

export default function AdditionalSection() {
  const PAGE_ROUTE = page_route();
  const router = useRouter();
  const URL = url();
  const [sectionsList, setsectionsList] = useState([]);
  const [otherSectionsList, setotherSectionsList] = useState([]);
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
  const [linkChange, setlinkChange] = useState(false);

  const changePage = (pageRoute) => {
    router.push(`/builder/${pageRoute}`);
  };

  useEffect(() => {
    (async () => {
      try {
        let se;
        if (Cookie.get("section_id")) {
          let resid = Cookie.get("resume_id");
          let id = Cookie.get("section_id");
          if (id != "0") {
            const responseBasicInfo = await fetch(URL.SECTION, {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ section_id: id }),
            });
            const sectionRes = await responseBasicInfo.json();
            setSectionTitle(sectionRes.section.title);
            se = (
              <div className={Style.checkboxadditionalsection}>
                <label>
                  <input
                    className={Style.radio}
                    type="checkbox"
                    defaultChecked={true}
                    onClick={(e) => {
                      console.log("change checkbox");
                    }}
                  />
                  <span>{sectionRes.section.title}</span>
                </label>
              </div>
            );

            const responseResumeSection = await fetch(URL.RESUME_SECTION, {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ section_id: id, resume_id: resid }),
            });
            const resumeSection = await responseResumeSection.json();
            if (resumeSection.section) {
              setCustomTitle(resumeSection.section.heading);
              seteditorData(resumeSection.section.content);
            }
          } else {
            se = (
              <div className={Style.checkboxadditionalsection}>
                <label>
                  <input
                    className={Style.radio}
                    type="checkbox"
                    checked={true}
                    onChange={(e) => {
                      console.log("change checkbox");
                    }}
                  />
                  <span>Websites, Portfolios, Profiles</span>
                </label>
              </div>
            );
            const responseResumeLinks = await fetch(URL.RESUME_LINKS, {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ resume_id: resid }),
            });
            const resumeLinks = await responseResumeLinks.json();
            resumeLinks.links.map((link, i) => {
              if ((link.link_title == "linkedin")) {
                setLinkLinkedIn(link.link);
              }
              if ((link.link_title == "behance")) {
                setLinkBehance(link.link);
              }
              if ((link.link_title == "website")) {
                setLinkWebsite(link.link);
              }
              if ((link.link_title == "other")) {
                setLinkOther(link.link);
              }
            });
          }
          setsectionsList(se);
          setSectionId(Cookie.get("section_id"));
        }

        const responseList = await fetch(URL.SECTION_LIST, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const contentList = await responseList.json();
        let sectionList = contentList.sections.map((section, i) => {
          if (section.id != sectionId) {
            return (
              <div key={i} className={Style.checkboxadditionalsection}>
                <label>
                  <input
                    className={Style.radio}
                    type="checkbox"
                    checked={true}
                    disabled={true}
                    onClick={(e) => {
                      console.log("change checkbox");
                    }}
                  />
                  <span>{section.title}</span>
                </label>
              </div>
            );
          }
        });
        setotherSectionsList(sectionList);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [sectionId]);
  useEffect(() => {
    let sect;
    if (sectionId != "0") {
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
    } else {
      e.target.classList.remove(Style.error);
      e.target.nextElementSibling.classList.remove("fa-times");
      e.target.nextElementSibling.classList.remove(Style.errorIcon);
    }

    setlinkChange(true);
  };

  const finalizeResume = async () => {
    let resid = Cookie.get("resume_id");
    if(sectionId == "0"){
      // update resume links
      let links = {
        linkedin: linkLinkedIn,
        behance: linkBehance,
        website: linkWebsite,
        other: linkOther,
      };

      const responseUpdateLinks = await fetch(URL.UPDATE_RESUME_LINKS, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_id: resid, links:links }),
      });
      const updateLinks = await responseUpdateLinks.json();


    }else{
      // update resume sections
      const responseUpdatesection = await fetch(URL.UPDATE_RESUME_SECTION, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_id: resid, section_id:sectionId,heading:customTitle,content:editorData }),
      });
      const updateSection = await responseUpdatesection.json();
    }
    Cookie.set("section_id","");
    changePage(PAGE_ROUTE.RESUME);
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
                {sectionsList}
                {otherSectionsList}
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
              onClick={finalizeResume}
            >
              Update{" "}
            </button>
          </div>
        </div>
        <div className={Style.clr}></div>
      </div>
    </>
  );
}
