import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import {url} from "../lib/Helper";
import Layout from "../components/HomeLayout.tsx";
import Style from "../cssmodule/home.module.css";

// // import Swiper core and required modules
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

export default function Home() {
  const URL = url();
  const [auth, setAuth] = useState(false);
  const [userData, setuserData] = useState([]);        

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch(URL.USER, {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });
          const content = await response.json();
          setuserData(content);
          setAuth(true);
        } catch (e) {
          setAuth(false);
        }
        
      }
    )();
  },[auth]);
  return (
    <Layout auth={auth} userData={userData}>
      <div className={Style.homemyresumelift}>
        <div className={Style.clr}></div>

        <div className={Style.bannerhomearea}>
          <div className="container">
            <div className={Style.bannercontent}>
              <h1>Online Resume Builder </h1>
              <p>
                {" "}
                ATS optimized Free Resume Templates <br />
                and Resume Formats{" "}
              </p>
	  			<div className={Style.getstartedbuilder}>
                 <Link href="/builder"> Get Started Free </Link>
              </div>
	  
              
            </div>
            <div className={Style.homebannercv}>
              <a href="#">
                <img alt="banner-cv" src="assets/images/banner-cv.jpg" />
              </a>
              <div className={Style.output} id="output">
                <h1 className={Style.cursor}></h1>
                <p className=""></p>
              </div>
            </div>
            <div className={Style.clr}></div>
          </div>
          <div className={Style.clr}></div>
        </div>
        <div className={Style.clr}></div>
      </div>
      <div className={Style.resumeservices}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Resume Maker with Industry Specific Resume Examples </h2>
              <p>
                Start with a resume maker by selecting perfect Resume Templates
                in pdf or word format. Your Final Resume
                <br /> is generated based on ATS optimized Technology helping
                recruiters to sort your information in no time.{" "}
              </p>
	  </div>
	  <div className="col-4">
              <div className={Style.resumeservicesinfo}>
                <a href="#">
                  <div className={Style.resumeservices1}>
                    <img alt="banner-cv" src="assets/images/select-resume-template.svg" />
                    <h4>Select Resume Template</h4>
                    <p>Resume Templates available in PDF and WORD formats</p>
                  </div>
                </a>
	  </div> </div>
	  <div className="col-4">
                <a href="#">
                  <div className={Style.resumeservices1}>
                    <img alt="banner-cv" src="assets/images/skills-and-work-history.svg" />
                    <h4>Skills and Work History</h4>
                    <p>
                      Select skill based resume skills and Work History examples{" "}
                    </p>
                  </div>
                </a>
	  </div>
	  <div className="col-4">
                <div className={Style.resumeservices1}>
                  <img alt="banner-cv" src="assets/images/resume-in-pdf-and-word.svg" />
                  <h4>Resume in PDF and WORD</h4>
                  <p>Download your resume in your selected resume format </p>
                </div>
	  </div>
              </div>
          
          <div className={Style.clr}></div>
        </div>
      </div>

      <div className={Style.resumecoverletters}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Most Popular Resume Templates</h2>
              <p>
                Multiple resume examples are provided in the resume maker that
                you can simply select and Start building <br /> to be downloaded
                in pdf or word resume format!{" "}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
	  {/* <Swiper
      // install Swiper modules
      modules={[Navigation, A11y]}
      spaceBetween={50}
      slidesPerView={5}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
	



      <SwiperSlide><img
                    alt="template-10"
                    src="assets/images/svg/template10.svg"
                  /></SwiperSlide>
      <SwiperSlide><img
                    alt="template-1"
                    src="assets/images/svg/template9.svg"
                  /></SwiperSlide>
      <SwiperSlide><img
                    alt="template-9"
                    src="assets/images/svg/template1.svg"
                  /></SwiperSlide><SwiperSlide><img
                    alt="template-10"
                    src="assets/images/svg/template10.svg"
                  /></SwiperSlide>
      <SwiperSlide><img
                    alt="template-1"
                    src="assets/images/svg/template9.svg"
                  /></SwiperSlide>
      <SwiperSlide><img
                    alt="template-9"
                    src="assets/images/svg/template1.svg"
                  /></SwiperSlide><SwiperSlide><img
                    alt="template-10"
                    src="assets/images/svg/template10.svg"
                  /></SwiperSlide>
      <SwiperSlide><img
                    alt="template-1"
                    src="assets/images/svg/template9.svg"
                  /></SwiperSlide>
      <SwiperSlide><img
                    alt="template-9"
                    src="assets/images/svg/template1.svg"
                  /></SwiperSlide>
     
    </Swiper> */}
              <div className={Style.resumecoverblock}>
                <a href="#">
                  <img alt="template-1" src="assets/images/svg/template1.svg" />
                </a>
              </div>
              <div className={Style.resumecoverblock}>
                <a href="#">
                  <img alt="template-9" src="assets/images/svg/template9.svg" />
                </a>
              </div>
              <div className={Style.resumecoverblock}>
                <a href="#">
                  <img
                    alt="template-10"
                    src="assets/images/svg/template10.svg"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className={Style.viewtemplates}>
            <a href="#">View Free CV Templates</a>
          </div>
          <div className={Style.clr}></div>
        </div>
      </div>

      <div className={Style.arrangelayouts}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>
                “It takes a recruiter only <b>7 seconds</b> to decide <br /> if
                one should be included in the recruitment process.” <br />
                <i>Harvard Business Review</i>
              </h2>
              <p>
                <br />
              </p>
            </div>
            <div className="col-6">
              <div className={Style.deliverbest}>
                <ul>
                  <li>Proven CV Templates to increase Hiring Chance</li>
                  <li>Creative and Clean Templates Design</li>
                  <li>Easy and Intuitive Online CV Builder</li>
                  <li>Free to use. Developed by hiring professionals.</li>
                  <li>Fast Easy CV and Resume Formatting</li>
                  <li>Recruiter Approved Phrases.</li>
                </ul>
              </div>
            </div>
            <div className="col-6">
              <p>
                <img
                  alt="arrangelayouts"
                  src="/assets/images/arrangelayouts.jpg"
                />
              </p>
            </div>

            <div className="col-12">
              <div className={Style.viewtemplates}>
                <a href="#">Start Building Your Resume</a>
              </div>
            </div>
          </div>
          <div className={Style.clr}></div>
        </div>
      </div>

      <div className={Style.whychoose}>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className={Style.whychooseblock}>
                <div className={Style.innerbox}>
                  <div className={Style.iconimg}>
                    <img
                      alt="easy-online"
                      src="/assets/images/easy-online.svg"
                    />
                  </div>
                  <h3>Easy Online Resume Builder</h3>
                  <p>
                    Create your resume with the 20+ customised resume templates
                    available in pdf and word format read to be downloaded.{" "}
                  </p>
                </div>
              </div>
              <div className={Style.whychooseblock}>
                <div className={Style.innerbox}>
                  <div className={Style.iconimg}>
                    <img
                      alt="expert-tips"
                      src="/assets/images/expert-tips.svg"
                    />
                  </div>
                  <h3>Step By Step Expert Tips</h3>
                  <p>
                    Select the most appropriate resume summary, work history or
                    skills related to your job portfolio based on expert
                    suggestions
                  </p>
                </div>
              </div>
              <div className={Style.whychooseblock}>
                <div className={Style.innerbox}>
                  <div className={Style.iconimg}>
                    <img
                      alt="approved-formatting"
                      src="/assets/images/approved-formatting.svg"
                    />
                  </div>
                  <h3>Recruiter Approved Formatting</h3>
                  <p>
                    Selected resume templates are formatted in a manner that is
                    quickly readable, ATS optimized and provide a perfect pdf.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className={Style.whowecontant}>
                <h3>Why Choose Resume Maker</h3>
                <p>
                  We have taken the time to create a platform that is easy for
                  you to use and simple enough for anyone. Our platform is for
                  anyone who wants to build a better resume. Whether you are
                  just starting college, looking for your first internship or
                  have been in the workforce for decades, our platform will help
                  you write a great resume that showcases your skills and
                  abilities.
                </p>
                <p>
                  It doesn't matter how well you write your resume, if it isn't
                  formatted correctly. When it comes to resumes, there are a lot
                  of options out there. But what matters most is the quality of
                  the content in your resume - not how many bells and whistles
                  are on your platform.
                </p>
                <p>
                  We take pride in our work, so give it a try for free and let
                  us help you succeed!
                </p>
                <div className={Style.whychoosebtn}>
                  <a href="#">Lets Build Your CV</a>
                </div>
              </div>
            </div>
            <div className={Style.clr}></div>
          </div>
        </div>
        <div className={Style.clr}></div>
      </div>

      <div className={Style.servicesprovide}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={Style.customcvtemplate}>
                <h3>
                  Your resume must outsmart
                  <br /> the robots used in the recruiter’s
                  <br /> automation process.
                </h3>
                <div className={Style.viewtemplates1}>
                  <a href="#">Send a Request</a>
                </div>
              </div>
            </div>
          </div>
          <div className={Style.clr}></div>
        </div>
      </div>

      <div className={Style.howweare}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Need Help ?</h2>
              <p>Still have questions? We're more than happy to answer. </p>
            </div>
            <div className="col-6">
              <div className={Style.howweareinfo}>
                <img alt="" src="/assets/images/faq.svg" />
                <h4>Who are we?</h4>
                <p>
                  MyResumeLift is a fully automated and optimized resume
                  building service that is dedicated to helping job seekers find
                  employment by using the latest in job market research...{" "}
                  <a href="#">Read more</a>
                </p>
              </div>
            </div>
            <div className="col-6">
              <div className={Style.howweareinfo}>
                <img alt="" src="/assets/images/format.svg" />
                <h4>What is Resume formatting?</h4>
                <p>
                  There are essentially three major format types accepted in any
                  industry and are as follows; Reverse Chronological, Functional
                  and Combination. For more information{" "}
                  <a href="#">Read more</a>
                </p>
              </div>
            </div>
            <div className="col-6">
              <div className={Style.howweareinfo}>
                <img alt="" src="/assets/images/ats.svg" />
                <h4>ATS Softwares?</h4>
                <p>
                  In today’s job market there are about 250 applications for
                  every position on average... <a href="#">Read more</a>
                </p>
              </div>
            </div>
            <div className="col-6">
              <div className={Style.howweareinfo}>
                <img alt="" src="/assets/images/builder.svg" />
                <h4>What is a Resume Builder</h4>
                <p>
                  With our innovative resume builder, which consists of
                  thousands of occupations, work histories, skills and resume
                  literature options you can make an entire resume in a matter
                  of minutes with minimal effort... <a href="#">Read more</a>
                </p>
              </div>
            </div>
            <div className="col-6">
              <div className={Style.howweareinfo}>
                <img alt="" src="/assets/images/cvs.svg" />
                <h4>Difference between CV and Resume?</h4>
                <p>
                  One of the most confusing yet easily answered questions asked
                  by many first time job seekers, yet the one with the easiest
                  answer... <a href="#">Read more</a>
                </p>
              </div>
            </div>
            <div className="col-6">
              <div className={Style.howweareinfo}>
                <img alt="" src="/assets/images/begin.svg" />
                <h4>Where do I begin?</h4>
                <p>
                  Resume Formatting? Resume Templates? ATS Software? Resume
                  Builder? For questions regarding all these terms and more{" "}
                  <a href="#">Read more</a>
                </p>
              </div>
            </div>
            <div className="col-12">
              <p>For all these questions and more click on the FAQs button.</p>
              <div className={Style.viewtemplates}>
                <a href="#">FAQs</a>
              </div>
            </div>
          </div>
          <div className={Style.clr}></div>
        </div>
      </div>
    </Layout>
  );
}
