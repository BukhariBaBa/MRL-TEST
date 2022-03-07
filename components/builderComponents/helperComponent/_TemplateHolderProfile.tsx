import Link from "next/link";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import Cookie from "cookie-cutter";
import SelectedTemplate from "../templates/_TemplateTwo";

export default function _TemplateHolder({
  resumeData,
  templateComponent,
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
  const [resume, setResume] = useState([]);
  const [resumeTemplate, setResumeTemplate] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [workHistory, setWorkHistory] = useState([]);
  const [education, setEducation] = useState([]);
  const [links, setLinks] = useState([]);
  const [sections, setSections] = useState([]);

  

  // const SelectedTemplate = dynamic(
  //   () => import(`../templatesView/${templateComponent}`),
  //   {
  //     ssr: false,
  //   }
  // );

  useEffect(() => {
    (async () => {
      try {
        if (resumeData.resume) {
          setResume(resumeData.resume);
          setResumeTemplate(resumeData.template);
          setUserInfo(resumeData.basic_info);
          setWorkHistory(resumeData.works);
          setEducation(resumeData.educations);
          setLinks(resumeData.links);
          setSections(resumeData.sections);
        }
        console.log("loaded",templateComponent);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [resumeData]);

  return (
    <>
      <SelectedTemplate
        resume={resume}
        resumeTemplate={resumeTemplate}
        userInfo={userInfo}
        workHistory={workHistory}
        education={education}
        links={links}
        sections={sections}
        bgColor={bgColor}
        headingColor={headingColor}
        fontFamily={fontFamily}
        headingSize={headingSize}
        paragraphSize={paragraphSize}
        lineSpacing={lineSpacing}
        paragraphIndent={paragraphIndent}
        sectionSpacing={sectionSpacing}
        sideMargin={sideMargin}
        
      />
    </>
  );
}
