import Link from "next/link";
import Style from "../../cssmodule/builder.module.css";
import { page_route, url } from "../../lib/Helper";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import Cookie from "cookie-cutter";

export default function SavePassword() {
  const PAGE_ROUTE = page_route();
  const router = useRouter();
  const URL = url();

  //   const [basicInfo, setbasicInfo] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, seterrMessage] = useState("");

  const changePage = (pageRoute) => {
    router.push(`/builder/${pageRoute}`);
  };
  const render = true;
  useEffect(() => {
    if (Cookie.get("basic_information")) {
      let basicInfo = JSON.parse(Cookie.get("basic_information"));
      setEmail(basicInfo.email);
    }
  }, [render]);
  const save_password = async () => {
    let basicInfo = JSON.parse(Cookie.get("basic_information"));
    let dataBody = {
      basicInfo: basicInfo,
      email: email,
      password: password,
    };
    const response = await fetch(URL.SAVE_PASSWORD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(dataBody),
    });
    const res = await response.json();
    console.log(res);
    if (res.status == "success") {
      seterrMessage("");
      changePage(PAGE_ROUTE.RESUME);
    } else {
      seterrMessage(res.message);
    }
  };
  return (
    <>
      <div className={Style.breadcrumb}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className={Style.pagetitle}>Login</h1>
              <ul>
                <li className={Style.item}>
                  <a href="#">Home</a>
                </li>
                <li className={Style.seperator}>»</li>
                <li className={`${Style.itemcurrent} ${Style.item}`}>
                  Login
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={Style.clr}></div>
      </div>
      <div className="innerpage">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="loginarea">
                <h1>Don’t lose your work!</h1>
                <p>Create an account so continue saving your resume.</p>

                <div className="loginraw">
                  <a href="#" className="loginfiled">
                    <img alt="" src="/assets/images/icongoogle.jpg" />
                    <span>Sign in with Google</span>
                  </a>
                </div>
                <div className="loginraw">
                  <a href="#" className="loginfiled">
                    <img alt="" src="/assets/images/iconfacebok.jpg" />
                    <span>Sign in with Facebook</span>
                  </a>
                </div>

                <div className="moreraw">
                  {" "}
                  <span>OR</span>
                </div>

                <div className="loginform">
                  <form action="#" method="post">
                    <div className="formraw">
                      <label>Email</label>
                      <input
                        className="text"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="example@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="formraw">
                      <label>password</label>
                      <input
                        className="text"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                    <div className="formraw">{errMessage}</div>
                    <div className="formraw">
                      <button
                        className="submit"
                        type="button"
                        onClick={(e) => {
                          save_password();
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>

                <div className="clr"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="clr"></div>
      </div>
    </>
  );
}
