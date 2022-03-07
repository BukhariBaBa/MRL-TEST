import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Style from "../../../cssmodule/Templates/template_3.module.css";
import moment from "moment";
import { strict as assert } from "assert";
import { stripHtml } from "string-strip-html";

export default function TemplateThree({
  resume,
  resumeTemplate,
  userInfo,
  workHistory,
  education,
  links,
  sections,
  bgColor,
  headingColor,
  fontFamily,
  headingSize,
  paragraphSize,
  lineSpacing,
  paragraphIndent,
  sectionSpacing,
  sideMargin,
  
}) {
  const router = useRouter();
  const [linkList, setLinkList] = useState([]);
  const [workHistoryList, setWorkHistoryList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [summery, setSummery] = useState([]);
  const [skills, setSkills] = useState([]);
  //   const [isLoaderOn, setisLoaderOn] = useState(true);

  var styleclass = `${Style.cv_template}`;
  if(router.pathname == "/profile/[user]"){
    styleclass = `${Style.cv_template} ${Style.cv_template_width}`;
  }

  let sumry = (
    <div>
      <h3
        style={{
          color: headingColor,
          fontSize: headingSize + "px",
          fontFamily: fontFamily,
          borderColor:bgColor
        }}
      >
        <span>Summary</span>
      </h3>
      <p
        style={{
          fontSize: paragraphSize + "px",
          lineHeight: lineSpacing + "px",
          fontFamily: fontFamily,
          paddingLeft: paragraphIndent + "px",
        }}
      >
        {stripHtml(resume.summery).result}
      </p>
    </div>
  );
  let skl = (
    <div>
      <h3
        style={{
          color: headingColor,
          fontSize: headingSize + "px",
          fontFamily: fontFamily,
          borderColor:bgColor
        }}
      >
        <span>capabilities &amp; Skills</span>
      </h3>
      <ul
        className={Style.menuhalf}
        style={{
          fontSize: paragraphSize + "px",
          lineHeight: lineSpacing + "px",
          fontFamily: fontFamily,
          paddingLeft: paragraphIndent + "px",
        }}
        dangerouslySetInnerHTML={{ __html: resume.skills }}
      ></ul>
    </div>
  );
  useEffect(() => {
    (async () => {
      let Linklst = links.map((link, i) => {
        return (
          <li key={i}>
            <a
              className="font-size linehight"
              href={link.link}
              target="_blank"
              style={{
                fontSize: paragraphSize + "px",
                lineHeight: lineSpacing + "px",
                fontFamily: fontFamily,
                paddingLeft: paragraphIndent + "px",
              }}
            >
              {link.link}
            </a>
          </li>
        );
      });
      setLinkList(Linklst);
      let workHistoryLst = workHistory.map((work, i) => {
        let leaveDate =
          work.currenty_working == "no"
            ? moment(new Date(work.leave_date)).format("MMM YYYY")
            : "Currently Working";
        return (
          <div key={i} className={Style.work_history}>
            <h4 style={{ fontFamily: fontFamily }}>
              {work.job_title}
              <br />
              <span>
                {work.company},{work.city}{" "}
              </span>
            </h4>
            <div className={Style.date}>
              {moment(new Date(work.join_date)).format("MMM YYYY")} -{" "}
              {leaveDate}
            </div>
            <p
              style={{
                fontSize: paragraphSize + "px",
                lineHeight: lineSpacing + "px",
                fontFamily: fontFamily,
                paddingLeft: paragraphIndent + "px",
              }}
            >
              {stripHtml(work.description).result}
            </p>
          </div>
        );
      });
      setWorkHistoryList(workHistoryLst);

      let educationLst = education.map((education, i) => {
        let eduDetail = "";
        if (education.description) {
          eduDetail = education.description;
        }
        return (
          <div key={i} className={Style.work_history}>
            <h4
              className=" "
              style={{
                fontFamily: fontFamily,
              }}
            >
              {education.degree_title} <br />
              <span>
                {education.field_of_study} - {education.institute_name} -{" "}
                {education.institute_location}
              </span>
            </h4>
            <div className={Style.date} style={{ fontFamily: fontFamily }}>
              {moment(new Date(education.completion_date)).format("MMM YYYY")}
            </div>
            <p
              style={{
                fontSize: paragraphSize + "px",
                lineHeight: lineSpacing + "px",
                fontFamily: fontFamily,
                paddingLeft: paragraphIndent + "px",
              }}
            >
              {stripHtml(eduDetail).result}
            </p>
          </div>
        );
      });
      setEducationList(educationLst);

      let sectionLst = sections.map((section, i) => {
        let sectionHeading = section.title;
        return (
          <div
            key={i}
            className={Style.cv_template_raw}
            style={{ margin: sectionSpacing + "px 0px" }}
          >
            <h3
              style={{
                color: headingColor,
                fontSize: headingSize + "px",
                fontFamily: fontFamily,
                borderColor:bgColor
              }}
            >
              <span>{sectionHeading}</span>
            </h3>
            <div className={Style.work_history}>
              <div
                style={{
                  fontSize: paragraphSize + "px",
                  lineHeight: lineSpacing + "px",
                  fontFamily: fontFamily,
                  paddingLeft: paragraphIndent + "px",
                }}
                dangerouslySetInnerHTML={{ __html: section.content }}
              >
                {/* {stripHtml(section.content).result} */}
                
              </div>
            </div>
          </div>
        );
      });
      setSectionList(sectionLst);
      //   setisLoaderOn(false);
    })();
  }, [links]);
  // useEffect(() => {
  //   setisLoaderOn(false);
  // }, [sectionList]);

  return (
    <>
      <div
        className={styleclass}
        style={{ padding: "0px " + sideMargin + "px" }}
      >
          <br/>
          <div
          className={Style.cv_template_raw}
          style={{ margin: sectionSpacing + "px 0px" }}
        >
          <h2 className={Style.name} style={{ fontFamily: fontFamily }}>
            {userInfo.first_name}  {" "} {userInfo.last_name}
          </h2>
          <div
            className={Style.professionvtitle}
            style={{ fontFamily: fontFamily }}
          >
            {resume.profession_title}
          </div>
          <div className={Style.info} style={{ backgroundColor: bgColor,fontFamily: fontFamily }}>
            <span>{userInfo.email}</span>
            <span>{userInfo.phone}</span>
            <span>
              {userInfo.address} {userInfo.postalCode} {userInfo.country}{" "}
            </span>
          </div>
        </div>
        <div
          className={Style.cv_template_raw}
          style={{ margin: sectionSpacing + "px 0px" }}
        >
          {sumry}
        </div>

        <div
          className={Style.cv_template_raw}
          style={{ margin: sectionSpacing + "px 0px" }}
        >
          <h3
            style={{
              color: headingColor,
              fontSize: headingSize + "px",
              fontFamily: fontFamily,
              borderColor:bgColor
            }}
          >
            Links
          </h3>
          <ul className={Style.menuhalf}>{linkList}</ul>
        </div>
        <div
          className={Style.cv_template_raw}
          style={{ margin: sectionSpacing + "px 0px" }}
        >
          {skl}
        </div>

        <div
          className={Style.cv_template_raw}
          style={{ margin: sectionSpacing + "px 0px" }}
        >
          <h3
            style={{
              color: headingColor,
              fontSize: headingSize + "px",
              fontFamily: fontFamily,
              borderColor:bgColor
            }}
          >
            Work History
          </h3>
          {workHistoryList}
        </div>

        <div
          className={Style.cv_template_raw}
          style={{ margin: sectionSpacing + "px 0px" }}
        >
          <h3
            style={{
              color: headingColor,
              fontSize: headingSize + "px",
              fontFamily: fontFamily,
              borderColor:bgColor
            }}
          >
            Education
          </h3>
          {educationList}
        </div>
        {sectionList}
        <div className={Style.clr}></div>
      </div>
    </>
  );
}
