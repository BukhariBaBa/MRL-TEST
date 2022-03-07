import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import {url,page_route} from "../lib/Helper";
import { useRouter } from "next/dist/client/router";
import Layout from "../components/HomeLayout";
import Style from "../cssmodule/builder.module.css";

export default function Login() {
    const PAGE_ROUTE = page_route();
  const router = useRouter();
  const URL = url();
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, seterrMessage] = useState("");

  useEffect(() => {
    (
      async () => {
        try {
          if(!auth){
            const response = await fetch(URL.USER, {
              credentials: "include",
              headers: { "Content-Type": "application/json" },
            });
            const content = await response.json();
            if(content)
              setAuth(true);
          }
        } catch (e) {
          setAuth(false);
        }
        
      }
    )();
  },[auth]);

  const login = async () => {
   let dataBody = {
      email: email,
      password: password,
    };
    const response = await fetch(URL.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(dataBody),
    });
    const res = await response.json();
    if (res.message == "success") {
      seterrMessage("");
      router.push(`/profile`);
    } else {
      seterrMessage(res.message);
    }
  };


  return (
    <Layout auth={auth}>
      <div className={Style.homemyresumelift}>
        <div className={Style.clr}></div>

        <div className={Style.bannerhomearea}>
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
                <h1>Welcome back</h1>
                <p>Please Sign In to your account.</p>

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
                          login();
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
        </div>
      </div>
    </Layout>
  );
}
