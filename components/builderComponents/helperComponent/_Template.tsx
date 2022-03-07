import Link from "next/link";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import Cookie from "cookie-cutter";
import SelectedTemplate from "../templates/_TemplateTwo";

export default function _Template({
  firstName,
  lastName,
  profession,
  phone,
  email,
  address,
  postalCode,
  country,
}) {
  // let template = "TemplateOne";
  // if (Cookie.get("template_component_name")) {
  //   template = Cookie.get("template_component_name");
  // }
  // const SelectedTemplate = dynamic(() => import(`../templates/_${template}`), {
  //   ssr: false,
  // });
  

  useEffect(() => {
    (async () => {
      try {
        console.log("render..");
      } catch (e) {
        console.log(e);
      }
    })();
  }, [
    firstName,
    lastName,
    profession,
    phone,
    email,
    address,
    postalCode,
    country,
  ]);

  return (
    <>
      <SelectedTemplate
        firstName={firstName}
        lastName={lastName}
        profession={profession}
        phone={phone}
        email={email}
        address={address}
        postalCode={postalCode}
        country={country}
      />
    </>
  );
}
