import Head from "next/head";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Style from "../../../cssmodule/builder.module.css";
import Layout from "../../../components/BuilderLayout";
import BasicInfoForm from "../../../components/builderComponents/Edit/BasicInfoForm";
import WorkHistoryForm from "../../../components/builderComponents/Edit/WorkHistoryForm";
import WorkHistoryContentForm from "../../../components/builderComponents/Edit/WorkHistoryContentForm";
import WorkHistorySummery from "../../../components/builderComponents/Edit/WorkHistorySummery";
import Education from "../../../components/builderComponents/Edit/Education";
import EducationSummery from "../../../components/builderComponents/Edit/EducationSummery";
import Skills from "../../../components/builderComponents/Edit/Skills";
import ProfessionalSummery from "../../../components/builderComponents/Edit/ProfessionalSummery";
import AdditionalSection from "../../../components/builderComponents/Edit/AdditionalSection";
import Loader from "../../../components/builderComponents/Loader";

import { useRouter } from "next/dist/client/router";
import {page_route} from "../../../lib/Helper";

export default function Page() {
    // const LoaderFirst = dynamic(() => import(`../../components/builderComponents/Loader`));
    let component = (<>
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
      </>);
    const PAGE_ROUTE = page_route();
    const router = useRouter();
    const LOADED_PAGE = router.query.page;
    
    if(LOADED_PAGE === PAGE_ROUTE.EXPERIENCE){
        // const SelectYear = dynamic(() => import(`../../components/builderComponents/SelectYear`));
        // component = ( <SelectYear /> );
    }else if(LOADED_PAGE === PAGE_ROUTE.RESUME_TEMPLATE){
        // const ChoseTemplate = dynamic(() => import(`../../components/builderComponents/ChoseTemplate`));
        // component = ( <ChoseTemplate /> );
    }else if(LOADED_PAGE === PAGE_ROUTE.BASIC_INFORMATION){
        // const BasicInfoForm = dynamic(() => import(`../../components/builderComponents/BasicInfoForm`));
        component = ( <BasicInfoForm /> );
    }else if(LOADED_PAGE === PAGE_ROUTE.WORK_HISTORY){
        // const WorkHistoryForm = dynamic(() => import(`../../components/builderComponents/WorkHistoryForm`));
        component = ( <WorkHistoryForm /> );
    }else if(LOADED_PAGE === PAGE_ROUTE.WORK_HISTORY_TASK){
        // const WorkHistoryContentForm = dynamic(() => import(`../../components/builderComponents/WorkHistoryContentForm`));
        component = ( <WorkHistoryContentForm /> );
    }else if(LOADED_PAGE === PAGE_ROUTE.WORK_HISTORY_SUMMERY){
        // const WorkHistorySummery = dynamic(() => import(`../../components/builderComponents/WorkHistorySummery`));
        component = ( <WorkHistorySummery /> );
    }else if(LOADED_PAGE === PAGE_ROUTE.EDUCATION){
        // const Education = dynamic(() => import(`../../components/builderComponents/Education`));
        component = ( <Education /> );
    }else if(LOADED_PAGE === PAGE_ROUTE.EDUCATION_SUMMERY){
        // const EducationSummery = dynamic(() => import(`../../components/builderComponents/EducationSummery`));
        component = ( <EducationSummery /> );
    }else if(LOADED_PAGE === PAGE_ROUTE.SKILLS){
        // const Skills = dynamic(() => import(`../../components/builderComponents/Skills`));
        component = ( <Skills /> );
    }else if(LOADED_PAGE === PAGE_ROUTE.PROFESSIONAL_SUMMERY){
        // const ProfessionalSummery = dynamic(() => import(`../../components/builderComponents/ProfessionalSummery`));
        component = ( <ProfessionalSummery /> );
    }else if(LOADED_PAGE === PAGE_ROUTE.ADDITIONAL_SECTION){
        // const AdditionalSection = dynamic(() => import(`../../components/builderComponents/AdditionalSection`));
        component = ( <AdditionalSection /> );
    }else if(LOADED_PAGE === PAGE_ROUTE.SAVE_PASSWORD){
        // const SavePassword = dynamic(() => import(`../../components/builderComponents/SavePassword`));
        // component = ( <SavePassword /> );
    }else{
        // const Loader = dynamic(() => import(`../../components/builderComponents/Loader`));
        component = ( <Loader /> );
    }


  return (
    <Layout>
        {component}
    </Layout>
  );
}
