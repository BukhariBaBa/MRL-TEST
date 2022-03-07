import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { url } from "../../lib/Helper";
import Style from "../../cssmodule/packages.module.css";
import Layout from "../../components/HomeLayout";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";

export default function Success() {
  const URL = url();
  const [auth, setAuth] = useState(false);
  const [userData, setuserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newsub, setnewSub] = useState(false);
  const router = useRouter();

  let cotnent;
  console.log();
  if (router.query.status == "success") {
    // setnewSub(true);
    cotnent = (
      <>
        <div className={`${Style.price_layout_cell} ${Style.cell_bg2}`}>
          <h4></h4>
          <h2 className={Style.price_h}>Payment Success</h2>
          <p>Thanks for payment</p>
          <a
            href="/builder/resume"
            className={`${Style.buy_btn_1} ${Style.btn_bg_color2}`}
          >
            Download Resume
          </a>
        </div>
      </>
    );
  } else if (router.query.status === "cancel") {
    cotnent = (
      <>
        <div className={`${Style.price_layout_cell} ${Style.cell_bg2}`}>
          <h4></h4>
          <h2 className={Style.price_h}>Payment Faild</h2>
          <p>Please check your Credit card provider </p>
          <a
            href="/payments/packages"
            className={`${Style.buy_btn_1} ${Style.btn_bg_color2}`}
          >
            Try Again
          </a>
        </div>
      </>
    );
  } else {
    cotnent = <></>;
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(URL.USER, {
          credentials: "include",
        });
        const content = await response.json();
        setuserData(content);
        setAuth(true);
        if (!newsub) {
          console.log("call");
          new_subscription();
          setnewSub(true);
        }

      } catch (e) {
        setAuth(false);
      }
    })();
  }, []);

  const new_subscription = async() =>{
    let postData = {
      package_id:1,
      payment_status:"success",
      transaction_id:"success",
      reference_id:"success",
      payment_customer_id:"success",
      payment_subscription_id:"success",
    }

    const response = await fetch(URL.PURCHASED_NEW_SUBSCRIPTION, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    const content = await response.json();
    console.log("res:",content)
  }
  return (
    <Layout auth={auth} userData={userData}>
      <div className={Style.pagebg}>
        <div className={Style.packagesbg}></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3>Pricing Packages you can avail to improve your Resume</h3>
              <p>
                You can select any of the below mentioned packages in accordance
                to your need for a perfact Resume
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">{cotnent}</div>
            <div className="col-2"></div>
          </div>
        </div>
        <div className={Style.clr}></div>
      </div>
    </Layout>
  );
}
