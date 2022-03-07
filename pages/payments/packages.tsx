import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { url } from "../../lib/Helper";
import Style from "../../cssmodule/packages.module.css";
import Layout from "../../components/HomeLayout";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useRouter } from 'next/router';

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
export default function Packages() {
  const URL = url();
  const [auth, setAuth] = useState(false);
  const [userData, setuserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(URL.USER, {
          credentials: "include",
        });
        const content = await response.json();
        setuserData(content);
        setAuth(true);
      } catch (e) {
        setAuth(false);
      }
    })();
  }, [auth]);

  const stripePromise = loadStripe(publishableKey);
  const createCheckOutSession = async (priceID) => {
    setLoading(true);
    const stripe = await stripePromise;
    
    let item = {
      price_id: priceID,
      unique_id:"123",
    }
    const checkoutSession = await axios.post('/api/create-stripe-session', {
      item: item,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
    setLoading(false);
  };


  return (
    <Layout auth={auth} userData={userData}>
      <div className={Style.pagebg}>
	  <div className={Style.packagesbg}></div>
          <div className="container">
            <div className="row">
				<div className="col-12">
					<h3>Pricing Packages you can avail to improve your Resume</h3>
					<p>You can select any of the below mentioned packages in accordance to your need for a perfact Resume</p>
				</div>
			</div>
			<div className="row">
				<div className="col-4">
					<div className={`${Style.price_layout_cell} ${Style.cell_bg2}`}>
						<h4>one time</h4>
						<h2>$ 2.99/<span>DL</span></h2>
						<p>1 Download of CV of Your Choosen Template <br /> Access to 20+ templates <br /> Access to 20K Skills, job specific phrases and work history <br /> ATS optimized resume<br />Fast and Easy Formatting <br /> <br /> <br /> </p>
						<a href="#" className={`${Style.buy_btn_1} ${Style.btn_bg_color}`} onClick={()=>createCheckOutSession("price_1Ju9A5EIJ18wSm0aYfltkUGQ")}>Charged OneTime</a>
					</div>
				</div>
				<div className="col-4">
					<div className={`${Style.price_layout_cell} ${Style.cell_bg2}`}>
						<h4>Value</h4>
						<h2 className={Style.price_h}>$ 1.99/<span>M</span></h2>
						<p>3 months unlimited access to resume builder<br />Access to 20+ templates <br />Access to 20K Skills, job specific phrases and work history<br /> ATS optimized resume<br />Fast and Easy Formatting<br /> <br /> <br /> </p>
						<a href="#" className={`${Style.buy_btn_1} ${Style.btn_bg_color2}`}>Charged quarterly</a>
					</div>
				</div>
				<div className="col-4">
					<div className={`${Style.price_layout_cell} ${Style.cell_bg2}`}>
						<h4>business</h4>
						<h2>$ 1.00/<span>M</span></h2>
						<p>12 months unlimited access to resume builder<br />3-days free trial, charged after trial day expires<br />Access to 20+ templates <br />Access to 20K Skills, job specific phrases and work history<br /> ATS optimized resume<br />Fast and Easy Formatting <br /> <br /></p>
						<a href="#" className={`${Style.buy_btn_1} ${Style.btn_bg_color}`}>Charged quarterly</a>
					</div>
				</div>
				
			</div>

        </div>
          <div className={Style.clr}></div>
      </div>
    </Layout>
  );
}
