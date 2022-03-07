import Link from "next/link";
import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import Style from "../../../cssmodule/builder.module.css";

export default function _TemplateFormating({
  change_heading_size,
  change_paragraph_size,
  change_font_family,
  change_paragraph_indent,
  change_section_spacing,
  change_line_spacing,
  change_side_margin,
  fontFamily,
  headingSize,
  paragraphSize,
  lineSpacing,
  paragraphIndent,
  sectionSpacing,
  sideMargin
}) {

  return (
    <>
      <div
        id="panelFormating"
        className={`hideEditor panel ${Style.slideboxFormating}`}
      >
        <div className={Style.formatingcontainer}>
          <div className={Style.fontweightraw}>
            <div id="fontweightcustom">
              <div className={Style.customfontraw}>
                <div className={Style.rawleft}>
                  <span>
                    font style <label id="fontfamilyname"></label>
                  </span>
                  <select className={Style.fontfamily} onChange={(e)=>{change_font_family(e.target.value)}}>
                    <option>Cabin</option>
                    <option>Open Sans</option>
                    <option>Encode Sans</option>
                    <option>Josefin Slab</option>
                    <option>Lora</option>
                    <option>Noto Sans</option>
                    <option>Oxygen</option>
                    <option>Poppins</option>
                    <option>Questrial</option>
                    <option>Quicksand</option>
                    <option>Raleway</option>
                    <option>Readex Pro</option>
                    <option>Spartan</option>
                  </select>
                </div>

                <div className={Style.rawleft}>
                  <span>
                    paragraph indent = <label id="paragraphindentleft">{paragraphIndent}</label>
                    px
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    defaultValue="0"
                    className={Style.slider}
                    id="paragraphindent"
                    onChange={(e)=>{change_paragraph_indent(e.target.value)}}
                  />
                </div>

                <div className={Style.rawleft}>
                  <span>
                    section spacing = <label id="sectionspacingtop">{sectionSpacing}</label>px
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    defaultValue="0"
                    className={Style.slider}
                    id="sectionspacing"
                    onChange={(e)=>{change_section_spacing(e.target.value)}}
                  />
                </div>

                <div className={Style.rawleft}>
                  <span>
                    heading size = <label id="headingsize">{headingSize}</label>px
                  </span>
                  <input
                    type="range"
                    min="20"
                    max="36"
                    defaultValue="20"
                    className={Style.slider}
                    id="heading"
                    onChange={(e)=>{change_heading_size(e.target.value)}}
                  />
                </div>

                <div className={Style.rawleft}>
                  <span>
                    side margins = <label id="sidemarginsleft">{sideMargin}</label>px
                  </span>
                  <input
                    type="range"
                    min="15"
                    max="100"
                    defaultValue="15"
                    className={Style.slider}
                    id="sidemargins"
                    onChange={(e)=>{change_side_margin(e.target.value)}}
                  />
                </div>

                <div className={Style.rawleft}>
                  <span>
                    paragraph font size = <label id="fontsize">{paragraphSize}</label>px
                  </span>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    defaultValue="12"
                    className={Style.slider}
                    id="font"
                    onChange={(e)=>{change_paragraph_size(e.target.value)}}
                  />
                </div>

                <div className={`${Style.rawleft} ${Style.clr}`}>
                  <span>
                    line spacing = <label id="linehight">{lineSpacing}</label>px
                  </span>
                  <input
                    type="range"
                    min="20"
                    max="36"
                    defaultValue="20"
                    className={Style.slider}
                    onChange={(e) => change_line_spacing(e.target.value)}
                    id="line"
                  />
                </div>
              </div>
            </div>
            <p>
              <br />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
