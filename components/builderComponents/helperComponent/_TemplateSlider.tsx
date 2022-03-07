import Link from "next/link";
import React, { useState, useEffect } from "react";
import { url } from "../../../lib/Helper";
import Style from "../../../cssmodule/builder.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 9
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function _TemplateSlider({ change_template }) {
  const URL = url();
  const [slids, setSlids] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(URL.GET_TEMPLATES, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const content = await response.json();
        let list = content.templates.map((template, i) => {
          return (<div className={Style.item} key={i}>
            <a href="#" onClick={()=>{change_template(`${template.component_name}`)}}>
              <img
                alt=""
                src={`/assets/images/resume-template/${template.image}`}
              />
            </a>
          </div>);
        });
        setSlids(list);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);


  return (
    <>
      <div id="panelSlider" className={`hideEditor panel ${Style.slidebox}`}>
        <div className={Style.allcvtemp}>
        <div className={Style.slidercontainer}>
          <Carousel
            swipeable={false}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true}
            autoPlay={false}
            infinite={true}
            deviceType="desktop"
          >
            {slids}
          </Carousel>
          </div>

        </div>
      </div>
    </>
  );
}
