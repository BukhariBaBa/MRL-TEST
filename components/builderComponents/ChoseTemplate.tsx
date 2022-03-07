import Link from "next/link";
import { useEffect, useState } from "react";
import Style from "../../cssmodule/builder.module.css";
import { page_route,url } from "../../lib/Helper";
import { useRouter } from "next/dist/client/router";
import Cookie from "cookie-cutter";


export default function ChoseTemplate() {
  const PAGE_ROUTE = page_route();
  const URL = url();
  const router = useRouter();
  const [templates,setTempaltes] = useState([]);

  let experienceYear;
  if(Cookie.get('expreience_year')){
    experienceYear = Cookie.get('expreience_year');
  }


  const changePage = (pageRoute) => {
    router.push(`/builder/${pageRoute}`);
  };

  const [isLoaderOn, setisLoaderOn] = useState(true);

  var loader;
  if (isLoaderOn === true) {
    loader = (
      <div className="animated-background">
        <div className="background-masker btn-divide-left"></div>
      </div>
    );
  }


  const select_template = (id,component_name) =>{
    Cookie.set("template_id",id);
    Cookie.set("template_component_name",component_name);
    changePage(PAGE_ROUTE.BASIC_INFORMATION);
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(URL.GET_TEMPLATES, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const content = await response.json();
        let list = content.templates.map((template, i) => {
          return (<div className={Style.cvtemparea} key={i}>
            <div className={Style.cvtempimg}>
              <a
                href="#"
                onClick={()=>{select_template(`${template.id}`, `${template.component_name}`)}}
              >
                <img
                  alt={template.title}
                  title={template.title}
                  src={`/assets/images/resume-template/${template.image}`}
                />
                <span>Use this template</span>
              </a>
            </div>
          </div>);
        });
       setTempaltes(list);
       setisLoaderOn(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);


  return (
    <>
      <div className={Style.breadcrumb}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className={Style.pagetitle}>Choose Template</h1>
              <ul>
                <li className={Style.item}>
                  <a href="#">Home</a>
                </li>
                <li className={Style.seperator}>»</li>
                <li className={`${Style.itemcurrent} ${Style.item}`}>
                  Choose Template
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
              <div className={Style.selecttemplates}>
                <h3>
                  Select the Resume template of your choice
                  <br />
                  based on <span>{experienceYear} years</span> of experience
                </h3>
                
                <div className={Style.clr}></div>
              </div>
              <p><br /><br/></p>
              <div id="all" className={Style.choosetempcvbuilderbox}>
                <div id="allcvtemp" className={Style.cvblocks}>
                  {templates}
                  {loader}
                  {loader}
                  {loader}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.clr}></div>
      </div>
    </>
  );
}
