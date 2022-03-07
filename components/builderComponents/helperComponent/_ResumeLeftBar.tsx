import Link from "next/link";
import Style from "../../../cssmodule/builder.module.css";
import { page_route} from "../../../lib/Helper";
import { useRouter } from "next/dist/client/router";
import Cookie from "cookie-cutter";

export default function _ResumeLeftBar(props) {
 
  const PAGE_ROUTE = page_route();
  const router = useRouter();

  const changePage = (pageRoute) => {
    router.push(`/builder/edit/${pageRoute}`);
  };

  const editAdditionalSection = (sectionID) =>{
    console.log("ID",sectionID);
    Cookie.set("section_id",sectionID);
    changePage(PAGE_ROUTE.ADDITIONAL_SECTION);
  }
  
  return <><div className={Style.sidebarresumeviews} id="myHeader">
  <h3 className={Style.sidebartitle}><i className="fa fa-pencil" aria-hidden="true"></i> Edit resume sections </h3>
  <ul>
    <li>
      <a href="#" onClick={(e)=>{changePage(PAGE_ROUTE.BASIC_INFORMATION)}}>
        <i className="fa fa-info-circle" aria-hidden="true"></i>{" "}
        Personal Information
      </a>
    </li>
    <li>
      <a href="#" onClick={(e)=>{changePage(PAGE_ROUTE.PROFESSIONAL_SUMMERY)}}>
        <i className="fa fa-file-text-o" aria-hidden="true"></i>{" "}
        Summary
      </a>
    </li>
    <li>
      <a href="#" onClick={(e)=>{editAdditionalSection("0")}}>
        <i className="fa fa-laptop" aria-hidden="true"></i> Links
      </a>
    </li>
    <li>
      <a href="#" onClick={(e)=>{changePage(PAGE_ROUTE.WORK_HISTORY_SUMMERY)}}>
        <i className="fa fa-users" aria-hidden="true"></i> Work
        History
      </a>
    </li>
    <li>
      <a href="#" onClick={(e)=>{changePage(PAGE_ROUTE.EDUCATION_SUMMERY)}}>
        <i
          className="fa fa-graduation-cap"
          aria-hidden="true"
        ></i>{" "}
        Education
      </a>
    </li>
    <li>
      <a href="#" onClick={(e)=>{changePage(PAGE_ROUTE.SKILLS)}}>
        <i className="fa fa-list-ol" aria-hidden="true"></i>{" "}
        Skills & Talents
      </a>
    </li>
    <li>
      <a href="#" onClick={(e)=>{editAdditionalSection("6")}}>
        <i className="fa fa-star" aria-hidden="true"></i>{" "}
        Affiliations
      </a>
    </li>
    <li>
      <a href="#" onClick={(e)=>{editAdditionalSection("5")}}>
        <i className="fa fa-trophy" aria-hidden="true"></i>{" "}
        Accomplishments
      </a>
    </li>
    <li>
      <a href="#" onClick={(e)=>{editAdditionalSection("2")}}>
        <i className="fa fa-users" aria-hidden="true"></i>{" "}
        Reference
      </a>
    </li>
    <li>
      <a href="#" onClick={(e)=>{editAdditionalSection("4")}}>
        <i className="fa fa-info-circle" aria-hidden="true"></i>{" "}
        Additional Information
      </a>
    </li>
    <li>
      <a href="#" onClick={(e)=>{editAdditionalSection("7")}}>
        <i className="fa fa-info-circle" aria-hidden="true"></i>{" "}
        Languages
      </a>
    </li>
    <li>
      <a href="#" onClick={(e)=>{editAdditionalSection("1")}}>
        <i className="fa fa-pencil" aria-hidden="true"></i> Custom
        Field
      </a>
    </li>
  </ul>
  <div className={Style.addsection}>
    <button className={Style.button} id="downloadbtn" onClick={(e) => {
                      props.generatePDF("Test");
                    }}>
      <i className="fa fa-file-pdf-o" aria-hidden="true"></i>  <b>Download</b>
    </button>
  </div>
</div></>;
}
