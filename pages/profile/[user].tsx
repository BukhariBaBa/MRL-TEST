import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { url } from "../../lib/Helper";
import Style from "../../cssmodule/profile.module.css";
import Layout from "../../components/HomeLayout";
import Cookie from "cookie-cutter";
import _TemplateHolder from "../../components/builderComponents/helperComponent/_TemplateHolderProfile";

export default function User() {
  const URL = url();
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [userData, setuserData] = useState([]);
  const [resumeList, setresumeList] = useState([]);
  const [resumeID, setResumeID] = useState("");

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
  const [makePrimaryResume, setmakePrimaryResume] = useState(false);
  const [userMembership, setuserMembership] = useState([]);
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
        const response = await fetch(URL.USER, {
          credentials: "include",
        });
        const content = await response.json();
        setuserData(content);
        setAuth(true);
        // get user Resume
        if (userData["user_name"]) {
          const responseUserResumes = await fetch(URL.GET_USER_RESUMES, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_name: userData["user_name"] }),
          });
          const userResumes = await responseUserResumes.json();
          if (userResumes.resumes) {
            let counter = 0;
            let resumeListArr = userResumes.resumes.map((item, i) => {
              let deleteResRow = (<>|{" "}
              <a href="#" onClick={(e) => {
                  delete_resume(item.resume.resume_id);
                }}>
                <i className="fa fa-trash"></i> 
              </a>    </>);
              let primaryRow = (<td className={Style.makeprimaryRow}><span className={Style.makePrimaryClass} onClick={(e)=>{make_primary(item.resume.resume_id)}}>Make Primary</span></td>);
              if (item.resume.is_primary == "Yes") {
                primaryRow = (<td><span className={Style.badge}>Primary</span></td>);
                deleteResRow = (<></>);
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
                setResumeID(item.resume.resume_id);
              }

              counter++;
              return (
                <tr key={i}>
                  {primaryRow}
                  <td>{item.resume.profession_title}</td>
                  <td>{item.resume.completed_percent}%</td>
                  <td>{item.resume.created_at}</td>
                  <td>
                    <a href="#" onClick={(e) => {
                        fix_resume(item.resume.resume_id);
                      }}>
                      <i className="fa fa-pencil"></i> 
                    </a>
                    {" "}
                    {deleteResRow}             
                  </td>
                </tr>
              );
            });
            setresumeList(resumeListArr);
            setmakePrimaryResume(false);
            setisLoaderOn(false);
          }

          get_user_membership();
        }
      } catch (e) {
        setAuth(false);
      }
    })();
  }, [auth,makePrimaryResume]);

  const fix_resume = (id) => {
    Cookie.set("resume_id", id);
    router.push(`/builder/resume`);
  };

  const make_primary = async (resumeID) =>{
    const response = await fetch(URL.MAKE_RESUME_PRIMARY, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume_id: resumeID }),
    });
    const res = await response.json();
    setmakePrimaryResume(true);
  }
  const delete_resume = async (id) =>{
    const response = await fetch(URL.DELETE_RESUME, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume_id: id }),
    });
    const res = await response.json();
    setmakePrimaryResume(true);
  }
  const get_user_membership = async () =>{
    const response = await fetch(URL.GET_USER_MEMBERSHIP, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    });
    const res = await response.json();
    console.log("RES:",res);
    if(res.membership){
      setuserMembership(res.membership);
    }
  }

  return (
    <Layout auth={auth} userData={userData}>
      <div className={Style.userprofiles}>
        <div className={Style.userprofilesbg}>
          <div className="container">
            <div className="row">
              <div className="col-3">
                <div className={Style.browse_picture}>
                  <img
                    alt=""
                    src="https://myresumelift.com/application/assets/images/browse_picture.jpg"
                  />
                  <label className={Style.dis}>
                    <input
                      name="image_file"
                      id="image_file"
                      type="file"
                      size={60}
                    />
                    <input
                      type="hidden"
                      name="user_image_path"
                      id="user_image_path"
                      value=""
                    />
                  </label>
                </div>
                <h3 className={Style.username}>
                  {" "}
                  {userData["first_name"]} {userData["last_name"]}
                </h3>
                <p>{userData["email"]}</p>
                <ul className={Style.dashboardlinks}>
                  <li className={Style.active}>
                    <a href="#">
                      <i className="fa fa-tachometer" aria-hidden="true"></i>{" "}
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-file-o" aria-hidden="true"></i> My
                      Resumes{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-file-o" aria-hidden="true"></i> Cover
                      Letter
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-link" aria-hidden="true"></i> Web Link
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-cog" aria-hidden="true"></i> Settings
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-9">
                <div className={Style.improve_resume}>
                  <h2>Improve My Resume</h2>

                  <div className={Style.improve_resume_temp}>
                    <div className={Style.resumeHolder}>
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
                      {loader}
                      {loader}
                      {loader}
                      {loader}
                      {loader}
                  </div>

                  <div className={Style.improve_resume_info}>
                    <h3>Quick fixes to a better resume</h3>
                    <p>We found a few things that will improve your resume.</p>
                    <div className={Style.clr}></div>

                    <div className={Style.progressbar}></div>
                    <ul className={Style.fixed_resune}>
                      <li className={Style.active}>
                        <i className="fa fa-circle" aria-hidden="true"></i>{" "}
                        Basic Info
                      </li>
                      <li>
                        <i className="fa fa-circle" aria-hidden="true"></i> Work
                        History
                      </li>
                      <li>
                        <i className="fa fa-circle" aria-hidden="true"></i>{" "}
                        Educatoin
                      </li>
                      <li>
                        <i className="fa fa-circle" aria-hidden="true"></i>{" "}
                        Skills
                      </li>
                      <li>
                        <i className="fa fa-circle" aria-hidden="true"></i>{" "}
                        Summery
                      </li>
                    </ul>
                    <a
                      href="#"
                      onClick={(e) => {
                        fix_resume(resumeID);
                      }}
                      className={Style.fixresume}
                    >
                      {" "}
                      FIX RESUME
                    </a>
                    
                    <Link href={`/cv/${userData["user_name"]}`}>
                      <a
                        target="_blank"
                        className={Style.fixresume}
                        >
                        Preview & Share
                      </a>
                      </Link>
                  </div>

                  <div className={Style.clr}></div>
                  <h2>My Resumes </h2>
                  <table className={Style.table}>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Resume Title</th>
                        <th>Percent</th>
                        <th>Created at</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{resumeList}</tbody>
                  </table>
                  <div className={Style.clr}></div>
                  {loader}
                      {loader}
                      {loader}
                </div>
              </div>
            </div>
          </div>
          <div className={Style.clr}></div>
        </div>
      </div>
    </Layout>
  );
}
