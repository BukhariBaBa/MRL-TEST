import Link from "next/link";
import { useEffect, useState } from "react";
import Style from "../../cssmodule/builder.module.css";
import { page_route,url } from "../../lib/Helper";
import { useRouter } from "next/dist/client/router";
import Cookie from "cookie-cutter";

export default function SelectYear() {
 const PAGE_ROUTE = page_route();

 const [isLoaderOn, setisLoaderOn] = useState(true);
  const URL = url();
  const router = useRouter();

  const changePage = (pageRoute) => {
    router.push(`/builder/${pageRoute}`);
  };

 var loader;
 if (isLoaderOn === true) {
   loader = (
     <div className="animated-background">
       <div className="background-masker btn-divide-left"></div>
     </div>
   );
 }
 const renderCheck = true;
  useEffect(() => {
    (async () => {
      try {

        setisLoaderOn(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [renderCheck]);

  const select_year = (year) =>{
    console.log(year);
    Cookie.set("resume_id","");
    Cookie.set("expreience_year",year);
    changePage(PAGE_ROUTE.RESUME_TEMPLATE);
  }


  return(
    <>
        <div className={Style.breadcrumb}>
            <div className="container">
                <div className="row">
                    <div className="col-12"> 
                        <h1 className={Style.pagetitle}>Working Professionally</h1>
                        <ul>
                            <li className={Style.item}><a href="../index.php">Home</a></li>
                            <li className={Style.seperator}>»</li>
                            <li className={`${Style.itemcurrent} ${Style.item}`}>Working Professionally</li>
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
                        <div className={Style.selectage}>
						<div className={Style.selectagebg}></div>
                            <h3>For <span>how long</span> have you been<br />working <span>professionally</span>?</h3>
                            <p>We will find the best Design & Content match for you</p>
                            <div className={Style.clr}></div>
                            <div className={Style.selectexperience}>
                                <div className={Style.experiencebox}>
                                   <a href="#" onClick={(e)=>{select_year('0 - 03')}}> 0 - 03 years</a>
                                </div>
                                <div className={Style.experiencebox}>
                                    <a id="experience" href="#" onClick={(e)=>{select_year('03 - 05')}}> 03 - 05 years</a>
                                </div>
                                <div className={Style.experiencebox}>
                                    <a id="experience" href="#" onClick={(e)=>{select_year('05 - 10')}}> 05 - 10 years</a>
                                </div>
                                <div className={Style.experiencebox}>
                                    <a id="experience" href="#" onClick={(e)=>{select_year('10+')}}> 10+ years</a>
                                </div>
                            </div>  
                            <div className={Style.clr}></div>    
                    </div>
                </div>
            </div>
            <div className={Style.clr}></div>
        </div>	
    </div>	
    <div className={Style.clr}></div>
    </>
  );
}
