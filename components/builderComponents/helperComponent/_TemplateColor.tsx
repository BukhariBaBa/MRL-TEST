import Link from "next/link";
import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import Style from "../../../cssmodule/builder.module.css";

export default function _TemplateColor({change_color}) {


  return (
    <>
      <div id="panelColor" className={`hideEditor panel ${Style.slideboxColor}`}>
        <div className={Style.colorchoices}>
          <form id="f1">
            <label className={`${Style.color} ${Style.color13}`}>
              <input type="radio" name="color" id="color13" defaultValue="" onChange={(e)=>{change_color(e.target.value)}} readOnly />
              <span className={Style.checkmark}></span>
            </label>
            <label className={`${Style.color} ${Style.color1}`}>
              <input type="radio" name="color" id="color1" defaultValue="#ffd200" onChange={(e)=>{change_color(e.target.value)}} readOnly />
              <span className={Style.checkmark}></span>
            </label>
            <label className={`${Style.color} ${Style.color2}`}>
              <input type="radio" name="color" id="color2" defaultValue="#0f8612" onChange={(e)=>{change_color(e.target.value)}} readOnly />
              <span className={Style.checkmark}></span>
            </label>
            <label className={`${Style.color} ${Style.color3}`}>
              <input type="radio" name="color" id="color3" defaultValue="#922bdb" onChange={(e)=>{change_color(e.target.value)}} readOnly />
              <span className={Style.checkmark}></span>
            </label>
            <label className={`${Style.color} ${Style.color4}`}>
              <input type="radio" name="color" id="color4" defaultValue="#e060ef" onChange={(e)=>{change_color(e.target.value)}} readOnly />
              <span className={Style.checkmark}></span>
            </label>
            <label className={`${Style.color} ${Style.color5}`}>
              <input type="radio" name="color" id="color5" defaultValue="#576d7b" onChange={(e)=>{change_color(e.target.value)}} readOnly />
              <span className={Style.checkmark}></span>
            </label>
            <label className={`${Style.color} ${Style.color6}`}>
              <input type="radio" name="color" id="color6" defaultValue="#bdaa7e" onChange={(e)=>{change_color(e.target.value)}} readOnly />
              <span className={Style.checkmark}></span>
            </label>
            <label className={`${Style.color} ${Style.color7}`}>
              <input type="radio" name="color" id="color7" defaultValue="#19409a" onChange={(e)=>{change_color(e.target.value)}} readOnly />
              <span className={Style.checkmark}></span>
            </label>
            <label className={`${Style.color} ${Style.color8}`}>
              <input type="radio" name="color" id="color8" defaultValue="#1b87df" onChange={(e)=>{change_color(e.target.value)}} readOnly />
              <span className={Style.checkmark}></span>
            </label>
            <label className={`${Style.color} ${Style.color9}`}>
              <input type="radio" name="color" id="color9" defaultValue="#39c3b1" onChange={(e)=>{change_color(e.target.value)}} readOnly />
              <span className={Style.checkmark}></span>
            </label>
            <label className={`${Style.color} ${Style.color10}`}>
              <input type="radio" name="color" id="color10" defaultValue="#d10c1a" onChange={(e)=>{change_color(e.target.value)}} readOnly />
              <span className={Style.checkmark}></span>
            </label>
            <label className={`${Style.color} ${Style.color11}`}>
              <input type="radio" name="color" id="color11" value="#fb7b67" onChange={(e)=>{change_color(e.target.value)}} readOnly />
              <span className={Style.checkmark}></span>
            </label>
            <label className={`${Style.color} ${Style.color12}`}>
              <input type="radio" name="color" id="color12" value="#e9a506" onChange={(e)=>{change_color(e.target.value)}} readOnly />
              <span className={Style.checkmark}></span>
            </label>
          </form>
          <div className="clr"></div>
        </div>
        
      </div>
    </>
  );
}
