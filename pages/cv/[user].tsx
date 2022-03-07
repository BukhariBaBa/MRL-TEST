import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { url } from "../../lib/Helper";
import Style from "../../cssmodule/profile.module.css";
import _TemplateHolder from "../../components/builderComponents/helperComponent/_TemplateHolderProfile";

export default function User() {
  const URL = url();
  const router = useRouter();

  const [resumeData, setResumeData] = useState([]);
  const [templateComponent, settemplateComponent] = useState();
  const [bgColor, setbgColor] = useState("");
  const [headingColor, setheadingColor] = useState("");
  const [fontFamily, setfontFamily] = useState("");
  const [headingSize, setheadingSize] = useState("");
  const [paragraphSize, setparagraphSize] = useState("");
  const [lineSpacing, setlineSpacing] = useState("");
  const [paragraphIndent, setparagraphIndent] = useState("");
  const [sectionSpacing, setsectionSpacing] = useState("");
  const [sideMargin, setsideMargin] = useState("");
  const [pageTitle, setpageTitle] = useState(
    "Perfect Resume Maker - PDF & Word Templates, Build for Free"
  );

  const username = router.query.user;

  useEffect(() => {
    (async () => {
      try {
        // get user Resume
        if (username) {
          const responseUserResume = await fetch(URL.USER_RESUME, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_name: username }),
          });
          const userResume = await responseUserResume.json();
          const item = userResume.resume;
          console.log(item);
          setResumeData(item);
          settemplateComponent(item.template.component_name);
          setbgColor(item.resume.styling.bg_color);
          setfontFamily(item.resume.styling.font_family);
          setheadingColor(item.resume.styling.heading_color);
          setheadingSize(item.resume.styling.heading_size);
          setparagraphIndent(item.resume.styling.paragraph_indent);
          setparagraphSize(item.resume.styling.paragraph_size);
          setsectionSpacing(item.resume.styling.section_spacing);
          setsideMargin(item.resume.styling.side_margin);
          let title = `${item.basic_info.first_name} ${item.basic_info.last_name} - ${item.resume.profession_title}`;
          setpageTitle(title);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [username]);


  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Resume maker the allow users  with a guided tour based on industry specific resume examples embedded in the builder to create a perfect ATS optimized CV"
        />
        <meta
          name="keywords"
          content="Resume Maker, Resume Templates, Free Resume Samples, Free CV maker, cv free template, create free cv, cv maker, resume builder, free resume builder, cv builder online"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="Shortcut Icon"
          href="/assets/images/favicon.svg"
          type="image/x-icon"
        />
        <link type="text/css" rel="stylesheet" href="/assets/css/global.css" />
        <link type="text/css" rel="stylesheet" href="/assets/css/style.css" />
        <link
          type="text/css"
          rel="stylesheet"
          href="/assets/css/bootstrap.css"
        />
        <link
          type="text/css"
          rel="stylesheet"
          href="/assets/css/font-awesome.css"
        />
        <link
          type="text/css"
          rel="stylesheet"
          href="/assets/css/font-awesome.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={Style.resumeHolderPreview}>
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
      </div>
    </>
  );
}
