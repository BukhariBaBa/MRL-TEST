import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { url } from "../lib/Helper";
import Style from "../cssmodule/appBuilder.module.css";

const name = "My Resume Lift";
const URL = url();
export const siteTitle = "My Resume Lift";

export default function BuilderLayout(props) {
  let menu;
  if (!props.auth) {
    menu = <></>;
  } else {
    menu = <></>;
  }
  return (
    <div className="page-wraper">
      <Head>
        <meta charSet="utf-8" />
        <title>
          Perfect Resume Maker - PDF & Word Templates, Build for Free
        </title>
        <meta
          name="description"
          content="Resume maker the allow users  with a guided tour based on industry specific resume examples embedded in the builder to create a perfect ATS optimized CV"
        />
        <meta
          name="keywords"
          content="Resume Maker, Resume Templates, Free Resume Samples, Free CV maker, cv free template, create free cv, cv maker, resume builder, free resume builder, cv builder online"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="Shortcut Icon"
          href="/assets/images/favicon.svg"
          type="image/x-icon"
        />
        <link type="text/css" rel="stylesheet" href="/assets/css/global.css" />
        <link type="text/css" rel="stylesheet" href="/assets/css/style.css" />
        <link
          type="text/css"
          rel="stylesheet"
          href="/assets/css/bootstrap.css"
        />
        <link
          type="text/css"
          rel="stylesheet"
          href="/assets/css/font-awesome.css"
        />
        <link
          type="text/css"
          rel="stylesheet"
          href="/assets/css/font-awesome.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&display=swap" rel="stylesheet"></link>
		
      </Head>

      <div className={Style.header}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={Style.logo}><a href="/"><img alt="myresumelift" src="/assets/images/my-resume-lift.svg" /></a></div>
              <div className={Style.cvheadermenu}>
                <ul>
                  <li className={Style.active}><a href="#">Introduction</a></li>
                  <li><a href="#">Work History</a></li>
                  <li><a href="#">Education</a></li>
                  <li><a href="#">Skills</a></li>
                  <li><a href="#">Summary</a></li>
                  <li><a href="#">Finalize</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.clr}></div>
      </div>
      <div className={Style.clr}></div>
    <div className={Style.clr}></div>
      <main>{props.children}</main>
      <div className={Style.copyright}>
      <div className="container">
        <div className="row">
          <div className="col-4">  
          <p>© 2021, My Resume Lift. All rights reserved.</p>
          </div>
          <div className="col-4">  <p><a href="#">Privacy Policy</a><a href="#">Terms and Conditions</a></p> </div>
          <div className="col-4"><p>Office 2201 Entrance 1260, Road 2421, Manama / Al Fateh 0324, Capital  Governorate, Bahrain </p> </div>
        </div>
        <div className={Style.clr}></div>
      </div>
      <div className={Style.clr}></div>
    </div> 
    </div>
  );
}
