import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Style from "../../../cssmodule/builder.module.css";
import { page_route, url, update_resume } from "../../../lib/Helper";
import { useRouter } from "next/dist/client/router";
import Cookie from "cookie-cutter";
import moment from "moment";

export default function EducationSummery() {
  const PAGE_ROUTE = page_route();
  const URL = url();
  const router = useRouter();
  const [educationList, seteducationList] = useState([]);
  const [displayList, setdisplayList] = useState([]);

  const changePage = (pageRoute) => {
    router.push(`/builder/${pageRoute}`);
  };

  useEffect(() => {
    (async () => {
      try {
        let arrayHolder = [];
        let arraySummery = [];
        let arrStatus = true;
        if (Cookie.get("education_summery")) {
          arraySummery = JSON.parse(Cookie.get("education_summery"));
        }
        if (Cookie.get("resume_id")) {
          let resume_id = Cookie.get("resume_id");
          const response = await fetch(URL.GET_RESUME, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resume_id: resume_id }),
          });
          const resume = await response.json();
          let educations = resume.resume.educations[0];
          educations.map((education, i) => {
            let item = {
              educationId: education.education_id,
              institute: education.institute_name,
              instituteLocation: education.institute_location,
              degree: education.degree_title,
              differentdegree: education.differentdegree,
              fieldofstudy: education.field_of_study,
              graduationDateMonth: moment(
                new Date(education.completion_date)
              ).format("MMM"),
              graduationDateYear: moment(
                new Date(education.completion_date)
              ).format("YYYY"),
              editorData: education.description,
            };
            if (arraySummery.length > 0) {
              let idStatus = true;
              arraySummery.map((sum, si) => {
                if (sum) {
                  if (
                    item.educationId == sum.educationId ||
                    sum.educationId == 0
                  ) {
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

          
          Cookie.set("education_summery", JSON.stringify(arrayHolder));
          if (Cookie.get("education_summery")) {
            arrayHolder = JSON.parse(Cookie.get("education_summery"));
          }

          if (Cookie.get("education_information")) {
            let educationcookie = JSON.parse(
              Cookie.get("education_information")
            );
            let eduItem = {
              educationId: educationcookie.educationId,
              institute: educationcookie.institute,
              instituteLocation: educationcookie.instituteLocation,
              degree: educationcookie.degree,
              differentdegree: educationcookie.differentdegree,
              fieldofstudy: educationcookie.fieldofstudy,
              graduationDateMonth: educationcookie.graduationDateMonth,
              graduationDateYear: educationcookie.graduationDateYear,
              editorData: educationcookie.editorData,
            };
            if (arrayHolder.length > 0) {
              arrayHolder.map((item, i) => {
                if (eduItem.educationId == item.educationId) {
                    if (eduItem.educationId != 0) {
                        delete arrayHolder[i];
                    }
                }
                if (
                  (eduItem.institute == item.institute &&
                    eduItem.instituteLocation == item.instituteLocation &&
                    eduItem.degree == item.degree &&
                    eduItem.differentdegree == item.differentdegree &&
                    eduItem.fieldofstudy == item.fieldofstudy && 
                    eduItem.graduationDateMonth == item.graduationDateMonth &&
                    eduItem.graduationDateYear == item.graduationDateYear &&
                    eduItem.editorData == item.editorData)
                ) {
                    delete arrayHolder[i];
                }
              });
            }

            arrayHolder.push(eduItem);
            Cookie.set("education_summery", JSON.stringify(arrayHolder));
          }
          itemList(arrayHolder);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  const saveData = () => {
    Cookie.set("new_record", "");
    let educationSummery = JSON.parse(Cookie.get("education_summery"));
    let postData = {
      resume_id: Cookie.get("resume_id"),
      education_summery: educationSummery,
    };
    const res = update_resume(postData, URL.UPDATE_EDUCATION);
    Cookie.set("education_summery","");
    Cookie.set("education_information","");
    changePage(PAGE_ROUTE.RESUME);
  };

  const addNew = () => {
    Cookie.set("new_record", "true");
    Cookie.set("education_information", "");
    changePage(`edit/${PAGE_ROUTE.EDUCATION}`);
  };

  const editRecord = (item) => {
    Cookie.set("education_information", JSON.stringify(item));
    changePage(`edit/${PAGE_ROUTE.EDUCATION}`);
  };

  const itemList = (arrayHolder) => {
    let list = arrayHolder.map((item, i) => {
      if (item.institute) {
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
            <p>
              <a href="#">
                {item.degree}
                <span> | </span> {item.fieldofstudy} <span>| </span>{" "}
                {item.institute} <span>| </span> {item.instituteLocation}
                <span> | </span> {item.graduationDateMonth}{" "}
                {item.graduationDateYear}
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
                  <ul className={Style.previeweducation}>{displayList}</ul>
                </div>

                <a href="#" onClick={addNew} className={Style.btnblockadd}>
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
