import React, { useState, useEffect, useRef } from "react";
import { page_route, url } from "../../../lib/Helper";
import Style from "../../../cssmodule/builder.module.css";

function _ProfessionalLinks({onchangeLink,linkLinkedIn,linkBehance,linkWebsite,linkOther,errorlinkLinkedIn,errorlinkBehance,errorlinkWebsite,errorlinkOther}) {
  const URL = url();

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
    setisLoaderOn(false);
  }, []);
  // useEffect(() => {
  //   console.log("Error:",errorlinkLinkedIn);
  //   console.log("Link:",linkLinkedIn);
  // }, [errorlinkLinkedIn]);


  return (
    <><h3>Websites, Portfolios, Profiles</h3>
    <div className={Style.formraw}>
      <div className={Style.formraw100}>
        <label>LinkedIn Profile</label>
        <input
          className={Style.text}
          type="text"
          name="professionallink[]"
          defaultValue={linkLinkedIn}
          onChange={(e)=>{onchangeLink(e,'linkedin')}}
          placeholder="https://www.linkedin.com/in/username"
        />
        <i className="" aria-hidden="true"></i>
        {loader}
      </div>

      <div className={Style.formraw100}>
        <label>Behance Profile</label>
        <input
          className={Style.text}
          type="text"
          name="professionallink[]"
          defaultValue={linkBehance}
          onChange={(e)=>{onchangeLink(e,'behance')}}
          placeholder="https://www.behance.net/username"
        />
        <i className="" aria-hidden="true"></i>
        {loader}
      </div>
    </div>
    <div className={Style.formraw}>
      <div className={Style.formraw100}>
        <label>Portfolio Website</label>
        <input
          className={Style.text}
          type="text"
          name="professionallink[]"
          defaultValue={linkWebsite}
          onChange={(e)=>{onchangeLink(e,'website')}}
          placeholder="https://www.website.com"
        />
        <i className="" aria-hidden="true"></i>
        {loader}
      </div>

      <div className={Style.formraw100}>
        <label>Other Social Link</label>
        <input
          className={Style.text}
          type="text"
          name="professionallink[]"
          defaultValue={linkOther}
          placeholder="Others"
          onChange={(e)=>{onchangeLink(e,'other')}}
        />
        <i className="" aria-hidden="true"></i>
        {loader}
      </div>
    </div></>
  );
}

export default _ProfessionalLinks;
