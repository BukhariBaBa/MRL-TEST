import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Style from "../../cssmodule/builder.module.css";
import { page_route } from "../../lib/Helper";
import { useRouter } from "next/dist/client/router";
import Cookie from "cookie-cutter";


export default function EducationSummery() {
  const PAGE_ROUTE = page_route();
  const router = useRouter();
  const [educationList, seteducationList] = useState([]);
  const [displayList, setdisplayList] = useState([]);

  const changePage = (pageRoute) => {
    router.push(`/builder/${pageRoute}`);
  };

  useEffect(() => {
    let arrayHolder= [];
    let arrStatus = true;

    if (Cookie.get("education_summery")) {
      arrayHolder = JSON.parse(Cookie.get("education_summery"));
    }

    if (Cookie.get("education_information")) {
      let educationcookie = JSON.parse(Cookie.get("education_information"));
      let eduItem = {
        institute: educationcookie.institute,
        instituteLocation: educationcookie.instituteLocation,
        degree: educationcookie.degree,
        differentdegree: educationcookie.differentdegree,
        fieldofstudy: educationcookie.fieldofstudy,
        graduationDateMonth: educationcookie.graduationDateMonth,
        graduationDateYear: educationcookie.graduationDateYear,
        editorData: educationcookie.editorData,
      };

      if(arrayHolder.length>0){
        arrayHolder.map((item, i)=>{
          if(item.institute == eduItem.institute && item.degree == eduItem.degree){
            console.log('call');
            arrStatus = false;
          }
        })
        
      }
      
      if(arrStatus){
        arrayHolder.push(eduItem);
        Cookie.set("education_summery", JSON.stringify(arrayHolder));
      }

      itemList(arrayHolder);

    }


  }, []);
  const saveData = () => {
    Cookie.set("new_record", "");
    changePage(PAGE_ROUTE.SKILLS);
    // Cookie.set("education_summery","");
  };

  const addNew = ()=>{
    Cookie.set("new_record", "true");
    Cookie.set("education_information", "");
    changePage(PAGE_ROUTE.EDUCATION);
  }

  const itemList = (arrayHolder) => {
    let list = arrayHolder.map((item, i) => {
      if (item.institute) {
        return (
          <li key={i}>
            <div className={Style.editandemoved}>
              <a href="#">
                <img
                  alt=""
                  src="https://myresumelift.com/application/assets/images/icon_edit.jpg"
                />
              </a>
              <a href="#">
                <img
                  alt=""
                  src="https://myresumelift.com/application/assets/images/icon_delete.jpg"
                />
              </a>
            </div>
            <p>
              <a href="#">
                {item.degree}<span> | </span> {item.fieldofstudy} <span>| </span> {item.institute} <span>| </span> {item.instituteLocation}
                <span>  | </span> {item.graduationDateMonth} {item.graduationDateYear}
              </a>
            </p>
            <p dangerouslySetInnerHTML={{ __html: item.editorData }}></p>
          </li>
        );
      }
    });
    setdisplayList(list);
};




  return (
    <>
      <div className={Style.breadcrumb}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className={Style.pagetitle}>Education Summery</h1>
              <ul>
                <li className={Style.item}>
                  <a href="#">Home</a>
                </li>
                <li className={Style.seperator}>»</li>
                <li className={`${Style.itemcurrent} ${Style.item}`}>
                  Education Summery
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
                <h3>Finalize your Educational History</h3>
                <p>
                  <br />
                </p>
              </div>

              <div className={Style.formraw}>
                <div className={Style.educationalsummary}>
                  <ul className={Style.previeweducation}>
                    {displayList}
                  </ul>
                </div>

                <a
                  href="#"
                  onClick={addNew}
                  className={Style.btnblockadd}
                >
                  ADD ANOTHER DEGREE
                </a>
              </div>
              <div className={Style.prevnextBtn}>
                <a
                  href="#"
                  onClick={(event) => changePage(PAGE_ROUTE.EDUCATION)}
                  className={Style.prevBtn}
                >
                  {" "}
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>
                  Back{" "}
                </a>
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
        <div className={Style.clr}></div>
      </div>
    </>
  );
}
