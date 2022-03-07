import Link from "next/link";
import Style from "../../cssmodule/builder.module.css";
import { page_route } from "../../lib/Helper";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import Cookie from "cookie-cutter";
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

export default function WorkHistoryForm() {
  const PAGE_ROUTE = page_route();
  const router = useRouter();

  const [jobTitle, setjobTitle] = useState("");
  const [company, setcompany] = useState("");
  const [companyCity, setcompanyCity] = useState("");
  const [companyAddress, setcompanyAddress] = useState("");
  const [startDate, setstartDate] = useState(new Date(addDays(new Date(), -1)));
  const [endDate, setendDate] = useState(new Date(new Date()));
  const [disableDate, setisDisableDate] = useState(false);
  const [isCurrentlyWorking, setisCurrentlyWorking] = useState(false);
  const [poupBOx, setpoupBOx] = useState([]);
  const [isLoaderOn, setisLoaderOn] = useState(true);

  var loader;
  if (isLoaderOn === true) {
    loader = (
      <div className="animated-background">
        <div className="background-masker btn-divide-left"></div>
      </div>
    );
  }

  const changePage = (pageRoute) => {
    router.push(`/builder/${pageRoute}`);
  };

  const currentlyWorkingCheck = (e) => {
    if (e.target.checked) {
      setendDate(null);
      setisDisableDate(true);
      setisCurrentlyWorking(true);
    }else{
      setendDate(new Date());
      setisDisableDate(false);
    }
  }
  let pop;
  const saveFormData = () => {
    if (jobTitle.length < 2) {
    pop = <><div className={Style.boxdroppopup}></div> <div className={Style.popupBox}>
	  <div className={Style.popupBoxbg}></div>
	  <h3>More Information Needed</h3>
	  <p>Looks like you haven't entered any past work experience. We recommend that you at least enter your past Position and Company.</p>
	  <div className={Style.moreInformation}>
	  <button type="button" className={Style.btnnowork} onClick={()=>skip_step()}>I don't have work experience</button><button type="button" className={Style.btnok} onClick={()=>hide_popup()}>OK</button>
	  </div>
	  </div></>;
    setpoupBOx(pop);
    }else{
      let infoData = {
        jobTitle: jobTitle,
        company: company,
        companyCity: companyCity,
        companyAddress: companyAddress,
        startDate: startDate,
        endDate: endDate,
        isCurrentlyWorking: isCurrentlyWorking,
      };
      Cookie.set("work_history", JSON.stringify(infoData));

      router.push(`/builder/${PAGE_ROUTE.WORK_HISTORY_TASK}`);
    }
      
  };

  const hide_popup = () =>{
    setpoupBOx([]);
    console.log("hide");
  }
  const skip_step = () =>{
    router.push(`/builder/${PAGE_ROUTE.EDUCATION}`);
  }
  const renderCheck = true;
  useEffect(() => {
    (async () => {
      try {
        if (Cookie.get("work_history")) {
          let cookieData = JSON.parse(Cookie.get("work_history"));
          setjobTitle(cookieData.jobTitle);
          setcompany(cookieData.company);
          setcompanyCity(cookieData.companyCity);
          setcompanyAddress(cookieData.companyAddress);
          setstartDate(new Date(cookieData.startDate));
          setendDate(new Date(cookieData.endDate));
          setisCurrentlyWorking(cookieData.isCurrentlyWorking);
        }
        setisLoaderOn(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [renderCheck,poupBOx]);

  let backBtn = (<a
    href="#"
    onClick={(event) => changePage(PAGE_ROUTE.BASIC_INFORMATION)}
    className={Style.prevBtn}
  >
    {" "}
    <i className="fa fa-arrow-left" aria-hidden="true"></i>
    Back
  </a>);

  if(Cookie.get('new_record')){
    backBtn = (<a
      href="#"
      onClick={(event) => changePage(PAGE_ROUTE.WORK_HISTORY_SUMMERY)}
      className={Style.prevBtn}
    >
      {" "}
      <i className="fa fa-arrow-left" aria-hidden="true"></i>
      Back
    </a>);
  }

  return (
    <>
      <div className={Style.breadcrumb}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className={Style.pagetitle}>Work History</h1>
              <ul>
                <li className={Style.item}>
                  <a href="#">Home</a>
                </li>
                <li className={Style.seperator}>»</li>
                <li className={`${Style.itemcurrent} ${Style.item}`}>
                  Work History
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
                <h3>Let's fill in your Work History</h3>
                <p>Tell us something about your previous employment.</p>
              </div>
            </div>
            <div className={Style.formraw}>
              <div className="col-6">
                <div className={Style.formraw100}>
                  <label>Job Title</label>
                  <input
                    className={`${Style.sasa} ${Style.text}`}
                    type="input"
                    id="jobtitlelist"
                    name="jobtitlef"
                    placeholder="Job Title"
                    onChange={(e)=>{setjobTitle(e.target.value)}}
                    value={jobTitle}
                  />
                  {loader}
                </div>
              </div>
              <div className="col-6">
                <div className={Style.formraw100}>
                  <label>Company/Employer</label>
                  <input
                    className={`${Style.sasa} ${Style.text}`}
                    type="input"
                    name="companyemployerf"
                    id="companyemployerf"
                    onChange={(e)=>{setcompany(e.target.value)}}
                    value={company}
                  />
                  {loader}
                </div>
              </div>
              <div className="col-6">
                <div className={Style.formraw100}>
                  <label>City , Country</label>
                  <input
                    className={`${Style.sasa} ${Style.text}`}
                    type="input"
                    name="workcityf"
                    id="workcityf"
                    onChange={(e)=>{setcompanyCity(e.target.value)}}
                    value={companyCity}
                  />
                  {loader}
                </div>
              </div>
              <div className="col-6">
                <div className={Style.formraw100}>
                  <label>Office Address</label>
                  <input
                    className={`${Style.sasa} ${Style.text}`}
                    type="input"
                    name="officeaddress"
                    id="officeaddress"
                    onChange={(e)=>{setcompanyAddress(e.target.value)}}
                    value={companyAddress}
                  />
                  {loader}
                </div>
              </div>
              <div className="col-6">
                <div className={Style.formraw100}>
                  <label>Start Date</label>
                  <DatePicker
                    name="start_date"
                    className={Style.text}
                    selected={startDate}
                    maxDate={addDays(new Date(endDate), -1)}
                    onChange={(date) => setstartDate(date)}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className={Style.formraw100}>
                  <label>End Date</label>
                  <DatePicker
                    name="end_date"
                    className={Style.text}
                    selected={endDate}
                    startDate={addDays(new Date(startDate), 1)}
                    minDate={addDays(new Date(startDate), 1)}
                    onChange={(date) => setendDate(date)}
                    disabled={disableDate}
                  />
                </div>
              </div>
            </div>
            <div className={Style.formraw}>
              <div className={Style.checkbox}>
                <label>
                  <input
                    className={Style.radio}
                    type="checkbox"
                    value="yes"
                    id="enddates"
                    name="checkMe"
                    onChange={(e) => currentlyWorkingCheck(e)}
                  />
                  <span>I currently work here.</span>
                </label>
              </div>
            </div>
            <div className="col-12">
              <div className={Style.prevnextBtn}>
                {backBtn}
                <button
                  type="button"
                  className={Style.nextBtn}
                  onClick={saveFormData}
                >
                  Continue{" "}
                  <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </button>
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
