import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import Style from "../../cssmodule/builder.module.css";
import Layout from "../../components/HomeLayout";
import { useRouter } from "next/dist/client/router";
import { page_route, url, remove_cookies } from "../../lib/Helper";
import Cookie from "cookie-cutter";
import _ResumeLeftBar from "../../components/builderComponents/helperComponent/_ResumeLeftBar";
import _ResumeFullView from "../../components/builderComponents/helperComponent/_ResumeFullView";
import _ResumeLoader from "../../components/builderComponents/helperComponent/_ResumeLoader";
import _TemplateHolder from "../../components/builderComponents/helperComponent/_TemplateHolder";

import _TemplateSlider from "../../components/builderComponents/helperComponent/_TemplateSlider";
import _TemplateColor from "../../components/builderComponents/helperComponent/_TemplateColor";
import _TemplateFormating from "../../components/builderComponents/helperComponent/_TemplateFormating";

import { jsPDF } from "jspdf";
// import ConvertAPI from "convertapi";
// import ReactDOMServer from "react-dom/server";

export default function Resume() {
  const PAGE_ROUTE = page_route();
  const URL = url();
  const router = useRouter();
  const [isLoaderOn, setisLoaderOn] = useState(true);
  const [resumeID, setResumeID] = useState("");
  const [resumeData, setResumeData] = useState([]);
  const [templateComponent, settemplateComponent] = useState();
  const [pdfTitle, setpdfTitle] = useState("");
  const [bgColor, setbgColor] = useState("");
  const [headingColor, setheadingColor] = useState("");
  const [fontFamily, setfontFamily] = useState("");
  const [headingSize, setheadingSize] = useState("");
  const [paragraphSize, setparagraphSize] = useState("");
  const [lineSpacing, setlineSpacing] = useState("");
  const [paragraphIndent, setparagraphIndent] = useState("");
  const [sectionSpacing, setsectionSpacing] = useState("");
  const [sideMargin, setsideMargin] = useState("");
  const [closePreviewPress, setClosePreviewPress] = useState(false);
  const [createdSuccess, setcreatedSuccess] = useState(false);
  const [auth, setAuth] = useState(false);
  const [userData, setuserData] = useState([]);


  var loader;
  if (isLoaderOn === true) {
    loader = <_ResumeLoader />;
  }
  const resumeWraper = useRef(null);
  useEffect(() => {
    (async () => {
      try {
        if (Cookie.get("resume_id")) {
          get_resume();
        } else {
          create_resume();
        }
        setisLoaderOn(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [createdSuccess]);

  async function get_resume() {
    let resume_id = Cookie.get("resume_id");
    const response = await fetch(URL.GET_RESUME, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume_id: resume_id }),
    });
    const resume = await response.json();
    const styling = resume.resume.resume[0].styling;
    setResumeData(resume.resume);
    settemplateComponent(resume.resume.template[0].component_name);
    setpdfTitle(resume.resume.basic_info[0].first_name);
    setbgColor(styling.bg_color);
    setfontFamily(styling.font_family);
    setheadingColor(styling.heading_color);
    setheadingSize(styling.heading_size);
    setparagraphIndent(styling.paragraph_indent);
    setparagraphSize(styling.paragraph_size);
    setsectionSpacing(styling.section_spacing);
    setsideMargin(styling.side_margin);
  }

  async function create_resume() {
    if (Cookie.get("basic_information")) {
      let templateId = Cookie.get("template_id")
        ? Cookie.get("template_id")
        : 1;
      let basicInfo = Cookie.get("basic_information")
        ? JSON.parse(Cookie.get("basic_information"))
        : [];
      let workSummery = Cookie.get("work_summery")
        ? JSON.parse(Cookie.get("work_summery"))
        : [];
      let educationSummery = Cookie.get("education_summery")
        ? JSON.parse(Cookie.get("education_summery"))
        : [];
      let skillsSummery = Cookie.get("skill_content")
        ? Cookie.get("skill_content")
        : [];
      let professionSummery = Cookie.get("profession_content")
        ? Cookie.get("profession_content")
        : [];
      let links = Cookie.get("links") ? JSON.parse(Cookie.get("links")) : [];
      let sections = Cookie.get("sections")
        ? JSON.parse(Cookie.get("sections"))
        : [];
      let customTitle = Cookie.get("custom_title")
        ? Cookie.get("custom_title")
        : [];

      let user_id = Cookie.get("user_id") ? Cookie.get("user_id") : null;
      let resumData = {
        user_id: user_id,
        templateId: templateId,
        basicInfo: basicInfo,
        workSummery: workSummery,
        educationSummery: educationSummery,
        skillsSummery: skillsSummery,
        professionSummery: professionSummery,
        sections: sections,
        links: links,
        customTitle: customTitle,
      };
      const response = await fetch(URL.CREATE_RESUME, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumData),
      });
      const res = await response.json();
      if (res.resume_id) {
        setResumeID(res.resume_id);
        Cookie.set("resume_id", res.resume_id);
        remove_cookies();
        setcreatedSuccess(true);
      }
    }
  }

  // Resume Changes on View Resume page

  const change_template_editor = (current, panel1, panel2) => {
    document.querySelector(`#${panel1}`).classList.add("hideEditor");
    document.querySelector(`#${panel2}`).classList.add("hideEditor");
    document.querySelector(`#${current}`).classList.toggle("hideEditor");
    update_style();
  };

  const change_template = (templateSelected) => {
    settemplateComponent(templateSelected);
    update_style();
  };

  const change_color = (colorSelected) => {
    setbgColor(colorSelected);
    update_style();
  };
  const change_heading_size = (val) => {
    setheadingSize(val);
  };

  const change_paragraph_size = (val) => {
    setparagraphSize(val);
  };

  const change_font_family = (val) => {
    setfontFamily(val);
  };

  const change_paragraph_indent = (val) => {
    setparagraphIndent(val);
  };

  const change_section_spacing = (val) => {
    setsectionSpacing(val);
  };
  const change_line_spacing = (val) => {
    setlineSpacing(val);
  };
  const change_side_margin = (val) => {
    setsideMargin(val);
  };

  const update_style = () => {
    let resume_id = Cookie.get("resume_id");
    let styles = {
      resume_id: resume_id,
      template_component: templateComponent,
      font_family: fontFamily,
      heading_size: headingSize,
      heading_color: headingColor,
      bg_color: bgColor,
      paragraph_size: paragraphSize,
      paragraph_indent: paragraphIndent,
      section_spacing: sectionSpacing,
      side_margin: sideMargin,
    };
    update_style_request(styles);
  };

  async function update_style_request(styles) {
    const response = await fetch(URL.UPDATE_RESUME_STYLE, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(styles),
    });
    const res = await response.json();
    console.log("Response:", res);
  }

  const _handlefullView = () => {
    document
      .querySelector(`#resumeFullViewWraper`)
      .classList.toggle(Style.showfullView);
    document.querySelector(`#bglayer`).classList.toggle(Style.showBgLayer);
    document.querySelector(`#previewHolder`).appendChild(resumeWraper.current);
  };

  const _handleCLosePreview = () => {
    setClosePreviewPress(true);
    _handlefullView();
  };

  const generatePDF = (htmlData) => {

    router.push(`/payments/packages`);

    // const doc = new jsPDF({ orientation: "portrait", "unit":"mm", format: "a4" });
    // doc.html(resumeWraper.current, {
    //   callback: function (doc) {
    //     doc.save(`${pdfTitle}_MyResumeLift.pdf`);
    //   },
    //   x: 3,
    //   y: 3,
    //   width:203,
    //   windowWidth:850,
    //   autoPaging: true,
    //   margin: [0, 15, 15, 0],
    // });
  };

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch(URL.USER, {
            credentials: "include",
          });
          const content = await response.json();
          setuserData(content);
          setAuth(true);
        } catch (e) {
          router.push('/builder');
          setAuth(false);
        }
        
      }
    )();
  },[auth]);

  return (
    <Layout auth={auth} userData={userData}>
      <div className={Style.resumebuilder}>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <_ResumeLeftBar generatePDF={generatePDF} />
            </div>

            <div className="col-9">
              <div className={Style.cvviews}>
                <div className={Style.cvviewstopsection}>
                  <a
                    className={Style.resumetitletext2}
                    onClick={(e) => _handlefullView()}
                  >
                    <i className="fa fa-eye" aria-hidden="true"></i> Preview
                  </a>
                  <button
                    className={Style.buttondown}
                    id="downloadbtn"
                    onClick={(e) => {
                      generatePDF("Test");
                    }}
                  >
                     <i className="fa fa-file-pdf-o" aria-hidden="true"></i> <b>Download</b>
                  </button>
                </div>
              </div>
              <div className={Style.clr}></div>
              <div
                className={Style.templatehtml}
                id="resume"
                ref={resumeWraper}
              >
                <_TemplateHolder
                  resumeData={resumeData}
                  templateComponent={templateComponent}
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
                {loader}
              </div>
            </div>
          </div>
        </div>
        <div className={Style.clr}></div>
      </div>

      <_TemplateSlider change_template={change_template} />
      <_TemplateColor change_color={change_color} />
      <_TemplateFormating
        change_heading_size={change_heading_size}
        change_paragraph_size={change_paragraph_size}
        change_font_family={change_font_family}
        change_paragraph_indent={change_paragraph_indent}
        change_section_spacing={change_section_spacing}
        change_line_spacing={change_line_spacing}
        change_side_margin={change_side_margin}
        fontFamily={fontFamily}
        headingSize={headingSize}
        paragraphSize={paragraphSize}
        lineSpacing={lineSpacing}
        paragraphIndent={paragraphIndent}
        sectionSpacing={sectionSpacing}
        sideMargin={sideMargin}
      />

      <div className={Style.footertoolbar}>
        <div className={Style.toolbatflipbtn}>
          <div
            className={Style.flip}
            onClick={() => {
              change_template_editor(
                "panelSlider",
                "panelFormating",
                "panelColor"
              );
            }}
          >
            Templates
          </div>
          <div
            className={Style.flip2}
            onClick={() => {
              change_template_editor(
                "panelFormating",
                "panelSlider",
                "panelColor"
              );
            }}
          >
            Formatting <span>( Small. Medium, Large, Custom )</span>
          </div>
          <div
            className={Style.flip3}
            onClick={() => {
              change_template_editor(
                "panelColor",
                "panelFormating",
                "panelSlider"
              );
            }}
          >
            Color{" "}
          </div>

          <div className={Style.clr}></div>
        </div>
        <div className={Style.clr}></div>
      </div>
      <_ResumeFullView _handleCLosePreview={_handleCLosePreview} />
      <div id="bglayer" className={Style.bglayer}></div>
    </Layout>
  );
}
