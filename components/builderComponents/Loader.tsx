import Link from "next/link";
import Style from "../../cssmodule/builder.module.css";
import { page_route } from "../../lib/Helper";
export default function SelectYear() {
  const PAGE_ROUTE = page_route();

  return (
    <>
      <div className={Style.breadcrumb}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className={Style.pagetitle}>Loading..</h1>
              <ul>
                <li className={Style.item}>
                  <a href="../index.php">Home</a>
                </li>
                <li className={Style.seperator}>»</li>
                <li className={`${Style.itemcurrent} ${Style.item}`}>
                  Loading..
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
            <div className="col-12">Loading...</div>
          </div>
          <div className={Style.clr}></div>
        </div>
      </div>
    </>
  );
}
