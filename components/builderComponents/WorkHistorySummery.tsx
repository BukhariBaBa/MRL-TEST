import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Style from "../../cssmodule/builder.module.css";
import { page_route } from "../../lib/Helper";
import { useRouter } from "next/dist/client/router";
import Cookie from "cookie-cutter";
import moment from "moment";

export default function WorkHistorySummery() {
  const PAGE_ROUTE = page_route();
  const router = useRouter();
  const [displayList, setdisplayList] = useState([]);

  const changePage = (pageRoute) => {
    router.push(`/builder/${pageRoute}`);
  };

  useEffect(() => {
    let arrayHolder= [];
    let arrStatus = true;

    if (Cookie.get("work_summery")) {
      arrayHolder = JSON.parse(Cookie.get("work_summery"));
    }

    if (Cookie.get("work_history")) {
      let workcookie = JSON.parse(Cookie.get("work_history"));
      let work_history_content = Cookie.get("work_history_content");
      let workItem = {
        jobTitle: workcookie.jobTitle,
        company: workcookie.company,
        companyCity: workcookie.companyCity,
        companyAddress: workcookie.companyAddress,
        startDate: workcookie.startDate,
        endDate: workcookie.endDate,
        isCurrentlyWorking: workcookie.isCurrentlyWorking,
        worksummery: work_history_content,
      };

      if(arrayHolder.length>0){
        arrayHolder.map((item, i)=>{
          if(item.jobTitle == workItem.jobTitle && item.company == workItem.company){
            console.log('call');
            arrStatus = false;
          }
        })
        
      }
      
      if(arrStatus){
        arrayHolder.push(workItem);
        Cookie.set("work_summery", JSON.stringify(arrayHolder));
      }

      itemList(arrayHolder);
     

    }

    
  }, []);

  const addNew = () => {
    Cookie.set("new_record", "true");
    Cookie.set("work_history", "");
    Cookie.set("work_history_content", "");
    changePage(PAGE_ROUTE.WORK_HISTORY);
  };

  const saveData = () => {
    Cookie.set("new_record", "");
    changePage(PAGE_ROUTE.EDUCATION);
  };

  const itemList = (arrayHolder) => {
      let list = arrayHolder.map((item, i) => {
        if (item.jobTitle) {
          let startDate = moment(new Date(item.startDate)).format("MMM YYYY");
          let endDate = moment(new Date(item.endDate)).format("MMM YYYY");
          if(item.isCurrentlyWorking){
            endDate = "Currently Working";
          }
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
              <a href="#">
                <p>
                  <strong>
                    {item.jobTitle}, {item.company}
                  </strong>{" "}
                  {item.companyCity} <br />
                  {startDate} - {endDate}
                </p>
                <ul
                  className={Style.summary}
                  dangerouslySetInnerHTML={{ __html: item.worksummery }}
                ></ul>
              </a>
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
                <h3>Work History Summary</h3>
              </div>

              <div className={Style.workhistorysummary}>
                <ul className={Style.previewworkhistory}>{displayList}</ul>
              </div>
              <div className={Style.clr}></div>
              <a href="#" className={Style.btnblockadd} onClick={addNew}>
                ADD ANOTHER WORK HISTORY
              </a>

              <div className={Style.prevnextBtn}>
                <a
                  href="#"
                  onClick={(event) => changePage(PAGE_ROUTE.WORK_HISTORY_TASK)}
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
