import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Style from "../../../cssmodule/builder.module.css";
import { page_route, url, update_resume } from "../../../lib/Helper";
import { useRouter } from "next/dist/client/router";
import Cookie from "cookie-cutter";
import moment from "moment";

export default function WorkHistorySummery() {
  const PAGE_ROUTE = page_route();
  const URL = url();
  const router = useRouter();
  const [displayList, setdisplayList] = useState([]);

  const changePage = (pageRoute) => {
    router.push(`/builder/${pageRoute}`);
  };
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
        let arrayHolder = [];
        let arraySummery = [];
        let arrStatus = true;

        if (Cookie.get("work_summery")) {
          arraySummery = JSON.parse(Cookie.get("work_summery"));
        }
        if (Cookie.get("resume_id")) {
          let resume_id = Cookie.get("resume_id");
          const response = await fetch(URL.GET_RESUME, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resume_id: resume_id }),
          });
          const resume = await response.json();
          const works = resume.resume.works[0];
          works.map((work, i) => {
            let item = {
              workId: work.work_id,
              jobTitle: work.job_title,
              company: work.company,
              companyCity: work.city,
              companyAddress: work.address,
              startDate: work.join_date,
              endDate: work.leaveDate,
              isCurrentlyWorking: work.currenty_working,
              worksummery: work.description,
            };

            if (arraySummery.length > 0) {
              let idStatus = true;
              arraySummery.map((sum, si) => {
                if (sum) {
                  if (item.workId == sum.workId || sum.workId == 0) {
                    idStatus = false;
                    arrayHolder.push(sum);
                  }
                }
              });
              if (idStatus) {
                arrayHolder.push(item);
              }
            } else {
              arrayHolder.push(item);
            }
          });

          Cookie.set("work_summery", JSON.stringify(arrayHolder));

          if (Cookie.get("work_summery")) {
            arrayHolder = JSON.parse(Cookie.get("work_summery"));
          }

          if (Cookie.get("work_history")) {
            let workcookie = JSON.parse(Cookie.get("work_history"));
            let work_history_content = Cookie.get("work_history_content");
            let workItem = {
              workId: workcookie.workId,
              jobTitle: workcookie.jobTitle,
              company: workcookie.company,
              companyCity: workcookie.companyCity,
              companyAddress: workcookie.companyAddress,
              startDate: workcookie.startDate,
              endDate: workcookie.endDate,
              isCurrentlyWorking: workcookie.isCurrentlyWorking,
              worksummery: work_history_content,
            };

            if (arrayHolder.length > 0) {
              arrayHolder.map((item, i) => {
                if (workItem.workId == item.workId) {
                  delete arrayHolder[i];
                }

                if (
                  (workItem.jobTitle == item.jobTitle &&
                    workItem.company == item.company &&
                    workItem.companyCity == item.companyCity &&
                    workItem.companyAddress == item.companyAddress &&
                    workItem.startDate == item.startDate && 
                    workItem.endDate == item.endDate &&
                    workItem.isCurrentlyWorking == item.isCurrentlyWorking &&
                    workItem.worksummery == item.worksummery)
                ) {
                    delete arrayHolder[i];
                }
              });
            }
            arrayHolder.push(workItem);
            Cookie.set("work_summery", JSON.stringify(arrayHolder));
          }

          itemList(arrayHolder);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const addNew = () => {
    Cookie.set("new_record", "true");
    Cookie.set("work_history", "");
    Cookie.set("work_history_content", "");
    changePage(`edit/${PAGE_ROUTE.WORK_HISTORY}`);
  };

  const editRecord = (item) => {
    // console.log("EDIT", item);
    Cookie.set("work_history", JSON.stringify(item));
    Cookie.set("work_history_content", item.worksummery);
    changePage(`edit/${PAGE_ROUTE.WORK_HISTORY}`);
  };

  const saveData = () => {
    Cookie.set("new_record", "");
    let workSummery = JSON.parse(Cookie.get("work_summery"));
    let postData = {
      resume_id: Cookie.get("resume_id"),
      work_summery: workSummery,
    };
    const res = update_resume(postData, URL.UPDATE_WORKHISTORY);
    Cookie.set("work_history", "");
    Cookie.set("work_history_content", "");
    Cookie.set("work_summery", "");
    changePage(PAGE_ROUTE.RESUME);
  };

  const itemList = (arrayHolder) => {
    let list = arrayHolder.map((item, i) => {
      if (item.jobTitle) {
        let startDate = moment(new Date(item.startDate)).format("MMM YYYY");
        let endDate = moment(new Date(item.endDate)).format("MMM YYYY");
        if (item.isCurrentlyWorking) {
          endDate = "Currently Working";
        }
        return (
          <li key={i}>
            <div className={Style.editandemoved}>
              <a
                href="#"
                onClick={(e) => {
                  editRecord(arrayHolder[i]);
                }}
              >
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
    setisLoaderOn(false);
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
                <ul className={Style.previewworkhistory}>
                  {displayList}
                  {loader}
                  {loader}
                </ul>
              </div>
              <div className={Style.clr}></div>
              <a href="#" className={Style.btnblockadd} onClick={addNew}>
                ADD ANOTHER WORK HISTORY
              </a>

              <div className={Style.prevnextBtn}>
                <a
                  href="#"
                  onClick={(event) => changePage(PAGE_ROUTE.RESUME)}
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
                  Update{" "}
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
