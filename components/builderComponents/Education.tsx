import Link from "next/link";
import { useEffect, useState } from "react";
import Style from "../../cssmodule/builder.module.css";
import { page_route, url } from "../../lib/Helper";
import { useRouter } from "next/dist/client/router";
import Editor from "./helperComponent/_Editor";
import Cookie from "cookie-cutter";
import moment from "moment";

export default function Education() {
  const PAGE_ROUTE = page_route();
  const URL = url();
  const router = useRouter();
  const [isLoaderOn, setisLoaderOn] = useState(true);
  const [degreeList, setdegreeList] = useState([]);
  const [poupBOx, setpoupBOx] = useState([]);
  const [editorData, seteditorData] = useState("");
  const [institute, setInstitute] = useState("");
  const [instituteLocation, setInstituteLocation] = useState("");
  const [degree, setDegree] = useState("");
  const [differentdegree, setDifferentDegree] = useState("");
  const [fieldofstudy, setFieldOfStudy] = useState("");
  const [graduationDateMonth, setgraduationDateMonth] = useState("");
  const [graduationDateYear, setgraduationDateYear] = useState("");
  const [yearList, setyearList] = useState([]);
  const [yearL, setyearL] = useState([]);
  const [disableOther, setdisableOther] = useState(true);

  const changePage = (pageRoute) => {
    router.push(`/builder/${pageRoute}`);
  };
  // let yearL[];
  var loader;
  if (isLoaderOn === true) {
    loader = (
      <div className="animated-background">
        <div className="background-masker btn-divide-left"></div>
      </div>
    );
  }

  const onchange = (editor) => {
    seteditorData(editor);
  };

  const hideShowEditor = (event) => {
    if (event.target.nextElementSibling != null) {
      if (
        event.target.nextElementSibling.classList.contains(Style.enableEditor)
      ) {
        event.target.nextElementSibling.classList.remove(Style.enableEditor);
        event.target.nextElementSibling.classList.add(Style.eduEditor);
      } else {
        event.target.nextElementSibling.classList.add(Style.enableEditor);
        event.target.nextElementSibling.classList.remove(Style.eduEditor);
      }
    }
  };

  const renderCheck = true;
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(URL.DEGREES_LIST, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const content = await response.json();
        let list = content.degrees.map((degree, i) => {
          return (
            <option key={i} value={degree.title}>
              {degree.title}
            </option>
          );
        });
        setdegreeList(list);

        let currentYear = moment(new Date()).format("YYYY");
        let counter = 0;        
        while (counter <= 50) {
          yearL.push(parseInt(currentYear) - counter)
          counter++;
        }
        let listY = yearL.map((yr, i) => {
          return (
            <option key={i} value={yr}>
              {yr}
            </option>
          );
        });
        setyearList(listY);

        setisLoaderOn(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [renderCheck]);

  let pop;
  const saveData = () => {
    if (institute.length < 2) {
      pop = <><div className={Style.boxdroppopup}></div> <div className={Style.popupBox}>
	  <div className={Style.popupBoxbg}></div>
	  <h3>More Information Needed</h3>
	  <p>Looks like you haven't entered any education. We recommend that you at least enter your final degree.</p>
	  <div className={Style.moreInformation}>
	  <button type="submit" className={Style.btnnowork} onClick={()=>skip_step()}>I don't have degree</button><button type="button" className={Style.btnok} onClick={()=>hide_popup()}>OK</button>
	  </div>
	  </div></>;
      setpoupBOx(pop);
    } else {
      let eduData = {
        institute: institute,
        instituteLocation: instituteLocation,
        degree: degree,
        differentdegree: differentdegree,
        fieldofstudy: fieldofstudy,
        graduationDateMonth: graduationDateMonth,
        graduationDateYear: graduationDateYear,
        editorData: editorData,
      };
      Cookie.set("education_information", JSON.stringify(eduData));

      router.push(`/builder/${PAGE_ROUTE.EDUCATION_SUMMERY}`);
    }
  };

  let backBtn = (
    <a
      href="#"
      onClick={(event) => changePage(PAGE_ROUTE.WORK_HISTORY_SUMMERY)}
      className={Style.prevBtn}
    >
      {" "}
      <i className="fa fa-arrow-left" aria-hidden="true"></i>
      Back{" "}
    </a>
  );

  if (Cookie.get("new_record")) {
    backBtn = (
      <a
        href="#"
        onClick={(event) => changePage(PAGE_ROUTE.EDUCATION_SUMMERY)}
        className={Style.prevBtn}
      >
        {" "}
        <i className="fa fa-arrow-left" aria-hidden="true"></i>
        Back
      </a>
    );
  }

  const hide_popup = () =>{
    setpoupBOx([]);
    console.log("hide");
  }
  const skip_step = () =>{
    router.push(`/builder/${PAGE_ROUTE.SKILLS}`);
  }
  useEffect(() => {
    (async () => {
      try {
        if (Cookie.get("education_information")) {
          let cookieData = JSON.parse(Cookie.get("education_information"));
          setInstitute(cookieData.institute);
          setInstituteLocation(cookieData.instituteLocation);
          setDegree(cookieData.degree);
          setDifferentDegree(cookieData.differentdegree);
          setFieldOfStudy(cookieData.fieldofstudy);
          setgraduationDateMonth(cookieData.graduationDateMonth);
          setgraduationDateYear(cookieData.graduationDateYear);
          seteditorData(cookieData.editorData);
        }
        setisLoaderOn(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [renderCheck,poupBOx]);
  useEffect(() => {
    setdisableOther(true);
    if(degree == "other"){
      setdisableOther(false);
    }
  }, [degree]);

  return (
    <>
      <div className={Style.breadcrumb}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className={Style.pagetitle}>Education</h1>
              <ul>
                <li className={Style.item}>
                  <a href="#">Home</a>
                </li>
                <li className={Style.seperator}>»</li>
                <li className={`${Style.itemcurrent} ${Style.item}`}>
                  Education
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
                <h3>Tell us about your Educational History</h3>
                <p>
                  Mention all relevant educational endeavors even if you haven't
                  graduated yet.
                </p>
              </div>
            </div>
            <div className="row">
              <div className={Style.formraw}>
                <div className="col-6">
                  <div className={Style.formraw100}>
                    <label>Institution Name</label>
                    <input
                      className={`${Style.sasa} ${Style.text}`}
                      type="input"
                      name="institute"
                      value={institute}
                      onChange={(e) => setInstitute(e.target.value)}
                    />
                    {loader}
                  </div>
                </div>
                <div className="col-6">
                  <div className={Style.formraw100}>
                    <label>Institute Location</label>
                    <input
                      className={`${Style.sasa} ${Style.text}`}
                      type="input"
                      name="instituteLocation"
                      value={instituteLocation}
                      onChange={(e) => setInstituteLocation(e.target.value)}
                    />
                    {loader}
                  </div>
                </div>
                <div className="col-6">
                  <div className={Style.formraw100}>
                    <label>Name of the Degree</label>
                    <select
                      className={`${Style.selectbgicon} ${Style.select}`}
                      name="degree"
                      defaultValue={degree}
                      onChange={(e) => setDegree(e.target.value)}
                    >
                      <option>---select---</option>
                      {degreeList}
                      <option className="otherdegree"></option>
                      <option value="Some College (No Degree)">
                        Some College (No Degree)
                      </option>
                      <option value="other">Enter a different degree</option>
                    </select>
                    {loader}
                  </div>
                </div>
                <div className="col-6">
                  <div className={Style.formraw100}>
                    <label>Enter a Different Degree</label>
                    <input
                      className={`${Style.sasa} ${Style.text}`}
                      type="input"
                      name="differentdegree"
                      value={differentdegree}
                      onChange={(e) => setDifferentDegree(e.target.value)}
                      disabled={disableOther}
                    />
                    {loader}
                  </div>
                </div>
                <div className="col-6">
                  <div className={Style.formraw100}>
                    <label>Field of Study</label>
                    <input
                      className={`${Style.sasa} ${Style.text}`}
                      type="input"
                      name="fieldofstudy"
                      value={fieldofstudy}
                      onChange={(e) => setFieldOfStudy(e.target.value)}
                    />
                    {loader}
                  </div>
                </div>
                <div className="col-6">
                  <div className={Style.formraw100}>
                    <label>Graduation Date</label>
                    <select
                      className={`${Style.selectbgicon} ${Style.selecthalf}`}
                      name="graduationDateMonth"
                      defaultValue={graduationDateMonth}
                      onChange={(e) => setgraduationDateMonth(e.target.value)}
                    >
                      <option value="">Month</option>
                      <option>January</option>
                      <option>February</option>
                      <option>March</option>
                      <option>April</option>
                      <option>May</option>
                      <option>June</option>
                      <option>July</option>
                      <option>August</option>
                      <option>September</option>
                      <option>October</option>
                      <option>November</option>
                      <option>December</option>
                    </select>
                    <select
                      className={`${Style.selectbgicon} ${Style.selecthalf}`}
                      name="graduationDateYear"
                      defaultValue={graduationDateYear}
                      onChange={(e) => setgraduationDateYear(e.target.value)}
                    >
                      <option value="">Years</option>
                      {yearList}
                    </select>
                  </div>
                </div>
                <div className="col-12">
                  <div className={Style.formraw100}>
                    <div
                      id={Style.flipedu}
                      onClick={(event) => hideShowEditor(event)}
                    >
                      Add a description to this section
                    </div>
                    <div className={Style.eduEditor}>
                      <Editor onchange={onchange} editorData={editorData} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className={Style.prevnextBtn}>
                  {backBtn}
                  <button
                    type="button"
                    className={Style.nextBtn}
                    onClick={saveData}
                  >
                    Continue{" "}
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.clr}></div>
      </div>
      {poupBOx}
    </>
  );
}
