import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import { url } from "../lib/Helper";
import Styles from "../cssmodule/app.module.css";
import Cookie from "cookie-cutter";

const name = "My Resume Lift";

export const siteTitle = "My Resume Lift";

export default function HomeLayout(props) {
  const URL = url();
  const router = useRouter();
  let cssFooterclass = Styles.footersection;
  if (router.pathname == "/builder/resume") {
    cssFooterclass = "hiddenrow row";
  }
  let menu;
  if (!props.auth) {
    menu = (
      <>
        <div className={Styles.signin}>
          <Link href="/login">Sign In or Sign Up</Link>
        </div>
      </>
    );
  } else {
    if (props.userData) {
      menu = (
        <>
          <div className={Styles.signin}>
            <a href="#">
              <i className="fa fa-user" aria-hidden="true"></i>
              {props.userData.first_name} {props.userData.last_name}
            </a>
            <div className={Styles.signincontent}>
              <Link href={`/profile/${props.userData.user_name}`}>Profile</Link>
              <a href="#" onClick={(e)=>{logout()}}>Sign Out</a>
            </div>
          </div>
        </>
      );
    }
  }

  async function logout(){
    try {
      const response = await fetch(URL.LOGOUT, {
        credentials: "include",
        method:"POST"
      });
      const content = await response.json();
      Cookie.set("resume_id", "");
      router.push('/');
    } catch (e) {
      console.log(e);
    }
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
      </Head>

      <div className={Styles.header}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={Styles.logo}>
                <a href="/">
                  <img
                    alt="myresumelift"
                    src="/assets/images/my-resume-lift.svg"
                  />
                </a>
              </div>
              {menu}
              <div className={Styles.mainmenu}>
                <nav className={Styles.menu}>
                  <label
                    className={`${Styles.menubtn} ${Styles.iconmenu}`}
                  ></label>
                  <input
                    type="checkbox"
                    id="menubtn"
                    className={Styles.menubtn}
                  />
                  <ul className={Styles.collapse}>
                    <li className={Styles.dropdown}>
                      <a href="#">Resumes</a>
                      <ul>
                        <li>
                        <Link href="/builder">Resumes Builder</Link>
                        </li>
                        <li>
                        <Link href="/builder/resume-template">Resume Templates</Link>
                        </li>
                        <li>
                          <a href="#">Resume Examples</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">Cover Letters</a>
                    </li>
                    <li>
                      <a href="#">Blog</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="clr"></div>
      <main>{props.children}</main>
      <div className={cssFooterclass}>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className={Styles.widgetarea}>
                <div className={Styles.footerlogo}>
                  <a href="#">
                    <img
                      alt="myresumelift"
                      src="/assets/images/myresumeliftlogo.svg"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className={Styles.widgetarea}>
                <div className={Styles.socialsicons}>
                  <a
                    target="blank"
                    href="https://www.facebook.com/resumeliftapp/"
                  >
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </a>
                  <a
                    target="blank"
                    href="https://www.instagram.com/myresumelift/"
                  >
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                  <a target="blank" href="https://twitter.com/MyResumeLift">
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                  </a>
                  <a
                    target="blank"
                    href="https://www.youtube.com/channel/UCUx5NN02ZpuWJ9u7nwOOLMQ?subconfirmation=1"
                  >
                    <i className="fa fa-youtube-play" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={Styles.copyright}>
            <div className="row">
              <div className="col-4">
                <p>© 2021, My Resume Lift. All rights reserved.</p>
              </div>
              <div className="col-4">
                {" "}
                <p>
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms and Conditions</a>
                </p>{" "}
              </div>
              <div className="col-4">
                <p>
                  Office 2201 Entrance 1260, Road 2421, Manama / Al Fateh 0324,
                  Capital Governorate, Bahrain{" "}
                </p>{" "}
              </div>
            </div>
            <div className={Styles.clr}></div>
          </div>
        </div>
        <div className={Styles.clr}></div>
      </div>
    </div>
  );
}
