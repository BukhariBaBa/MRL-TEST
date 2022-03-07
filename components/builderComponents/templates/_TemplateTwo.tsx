import Link from "next/link";
import Style from "../../../cssmodule/Templates/template_2.module.css";
export default function _TempalteTwo(props) {
  return (
    <>
      <div className={Style.cv_template} style={{width:835}}>
        <div className={Style.info}>
          <h2 className={Style.name}>{props.firstName} {props.lastName}</h2>
          <div className={Style.professionvtitle}>
            {" "}
            <span>{props.profession}</span>
          </div>
        </div>
        <div className={Style.left_area}>
          <div className={Style.cv_template_raw}>
            <div className={Style.contact_info}>
              <h3>Contact Info</h3>
              <span>{props.email}</span>
              <span>{props.phone}</span>
              <span>{props.address} {props.postalCode} {props.country} </span>
              <ul>
                <li>
                  <a href="#">https://myresumelift.com/</a>
                </li>
                <li>
                  <a href="#">https://myresumelift.com/</a>
                </li>
                <li>
                  <a href="#">https://myresumelift.com/</a>
                </li>
              </ul>
            </div>
          </div>
          <div className={Style.cv_template_raw}>
            <h3>Professional Summary</h3>
            <p>
              Passionate professional with wide variety of experience in
              different industries. Assistant top-level managers in
              coordination, planning, managing and execution of project plans
              and daily activities. Resume for a financial analyst needs to show
              an effective background knowledge and expertise in the field that
              impresses the recruiter within a few seconds. This resume template
              is structured in a manner that it quickly scan the areas of
              expertise, skills and job description that are essential part of a
              modern cv in 2021. It helps the accountants, financial managers
              and advisors to showcase their work in an effective manner.&nbsp;
            </p>
          </div>

          <div className={Style.cv_template_raw}>
            <h3>capabilities &amp; Skills</h3>
            <ul>
              <li>Bookkeeping</li>
              <li>Strategic financial planning</li>
              <li>Accounts payable and receivable</li>
              <li>Audit coordination</li>
              <li>Data trending</li>
              <li>Evaluating capital projects</li>
              <li>Business development</li>
              <li>Preparing models</li>
              <li>Knowledge of ERP (Enterprise Resource Planning) software</li>
              <li>Excellent managerial techniques</li>
              <li>Budgeting</li>
            </ul>
          </div>
        </div>
        <div className={Style.right_area}>
          <div className={Style.cv_template_raw}>
            <h3>
              <span>Education</span>
            </h3>
            <div className={Style.work_history}>
              <h4>
                GED <br />
                <span>
                  Business Management CV - Resume Lift - CV Writing Institute{" "}
                </span>
              </h4>
              <div className={Style.date}>2019</div>
            </div>
            <div className={Style.work_history}>
              <h4>
                MBA <br />
                <span>
                  Business Management - Masters in Finance - CV Writing
                  Accountant Example{" "}
                </span>
              </h4>
              <div className={Style.date}>2016</div>
              <p>
                Resume for a financial analyst needs to show an effective
                background knowledge and expertise in the field that impresses
                the recruiter within a few seconds. This resume template is
                structured in a manner that it quickly scan the areas of
                expertise
              </p>
            </div>
          </div>
          <div className={Style.cv_template_raw}>
            <h3>Work History</h3>
            <div className={Style.work_history}>
              <h4>
                Resume Example
                <br />
                <span>CV Template,New York, United States of America </span>
              </h4>
              <div className={Style.date}>2021 - 2021</div>
              <ul>
                <li>
                  Budgeted and forecasted support -Annual P&amp;L budget and
                  forecast, quarterly operational forecast coordination,
                  analysis and reporting, variance analysis of actual
                  performance vs budget/forecast, and support forward pricing
                  rate proposal.
                </li>
                <li>
                  Formulated and executing operating budgets; Monitoring costs,
                  commitments, and accomplishments; interpreting and
                  implementing Washington Office (WO) directives.
                </li>
                <li>
                  Developed supplemental directives at a local program
                  (typically District) level, etc.
                </li>
                <li>
                  Planned and executed complex assignments, adapted guidelines
                  for application to specific cases or problems, analysed the
                  results and recommended changes to existing procedures and
                  methods.
                </li>
              </ul>
            </div>
          </div>
          <div className={Style.cv_template_raw}>
            <h3>Affiliations</h3>
            <p>
              Affiliations P Tag Affiliations P Tag Affiliations P Tag
              Affiliations P Tag Affiliations P Tag Affiliations P Tag
            </p>
            <ul>
              <li>Institute of Chartered Accountants&nbsp;</li>
              <li>Specialized In Aduiting</li>
              <li>CV for a higher growth&nbsp;</li>
              <li>Writing a CV for an accountant&nbsp;</li>
            </ul>
          </div>
          
        </div>
        <div className={Style.clr}></div>
      </div>
    </>
  );
}
