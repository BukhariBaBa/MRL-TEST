import Link from "next/link";
import Style from "../../cssmodule/builder.module.css";
import _Template from "./helperComponent/_Template";
import { useRouter } from "next/dist/client/router";
import { page_route, url } from "../../lib/Helper";
import { useEffect, useState } from "react";
import $ from "jquery";
import Cookie from "cookie-cutter";

import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";


export default function BasicInfoForm() {
  const PAGE_ROUTE = page_route();
  const URL = url();
  const router = useRouter();
  const changePage = (pageRoute) => {
    router.push(`/builder/${pageRoute}`);
  };

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [professionsList, setprofessionsList] = useState([]);
  const [countryList, setcountryList] = useState([]);
  const [isLoaderOn, setisLoaderOn] = useState(true);

  var loader;
  if (isLoaderOn === true) {
    loader = (
      <div className="animated-background">
        <div className="background-masker btn-divide-left"></div>
      </div>
    );
  }

  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const _validation = (event, inputType) => {
    if (inputType == "first_name") setfirstName(event.target.value);
    if (inputType == "last_name") setlastName(event.target.value);
    if (inputType == "profession") setProfession(event.target.value);
    if (inputType == "email") setEmail(event.target.value);
    if (inputType == "address") setAddress(event.target.value);
    if (inputType == "postal_code") setpostalCode(event.target.value);
    if (inputType == "country") setCountry(event.target.value);

    if (inputType == "email" && event.target.value.match(mailformat)) {
      event.target.classList.remove(Style.error);
      event.target.classList.add(Style.success);
      if (event.target.nextElementSibling != null) {
        event.target.nextElementSibling.classList.add("fa-check");
        event.target.nextElementSibling.classList.remove("fa-times");
        event.target.nextElementSibling.classList.remove(Style.errorIcon);
      }
    } else if (inputType != "email" && event.target.value.length > 2) {
      event.target.classList.remove(Style.error);
      event.target.classList.add(Style.success);
      if (event.target.nextElementSibling != null) {
        event.target.nextElementSibling.classList.add("fa-check");
        event.target.nextElementSibling.classList.remove("fa-times");
        event.target.nextElementSibling.classList.remove(Style.errorIcon);
      }
    } else {
      event.target.classList.add(Style.error);
      event.target.classList.remove(Style.success);
      if (event.target.nextElementSibling != null) {
        event.target.nextElementSibling.classList.remove("fa-check");
        event.target.nextElementSibling.classList.add("fa-times");
        event.target.nextElementSibling.classList.add(Style.errorIcon);
      }
    }
  };
  const handlePhoneChange = (status, phoneNumber, country) => {
    setPhone(phoneNumber);
    if (phone.length > 5) {
      $("#phone").removeClass(Style.error);
      $("#phone").addClass(Style.success);
      $("#phonetick_i").removeClass("fa-times");
      $("#phonetick_i").addClass("fa-check");
      $("#phonetick_i").removeClass(Style.errorIcon);
    } else {
      $("#phone").addClass(Style.error);
      $("#phone").removeClass(Style.success);
      $("#phonetick_i").addClass("fa-times");
      $("#phonetick_i").removeClass("fa-check");
      $("#phonetick_i").addClass(Style.errorIcon);
    }
  };

  const geoIP = (callback) => {
    $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
      var countryCode = resp && resp.country ? resp.country : "us";
      callback(countryCode);
    });
  };

  const saveFormData = () => {
    if (
      firstName.length < 3 ||
      lastName.length < 3 ||
      profession.length < 3 ||
      !email.match(mailformat)
    ) {
      seterrorMessage("Please Fill Required Fields");
    } else {
      let infoData = {
        firstName: firstName,
        lastName: lastName,
        profession: profession,
        email: email,
        phone: phone,
        address: address,
        postalCode: postalCode,
        country: country,
      };
      Cookie.set("basic_information", JSON.stringify(infoData));

      router.push(`/builder/${PAGE_ROUTE.WORK_HISTORY}`);
    }
  };

  const renderCheck = true;
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(URL.PROFESSIONS, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const content = await response.json();
        let list = content.professions.map((profession, i) => {
          return <option key={i} value={profession.title} />;
        });
        setprofessionsList(list);

        const responseCountry = await fetch(URL.COUNTRIES, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const contentCountry = await responseCountry.json();
        let listCountry = contentCountry.countries.map((country, i) => {
          return (
            <option key={i} value={country.nicename}>
              {country.nicename}
            </option>
          );
        });

        setcountryList(listCountry);

        if (Cookie.get("basic_information")) {
          let cookieData = JSON.parse(Cookie.get("basic_information"));
          setfirstName(cookieData.firstName);
          setlastName(cookieData.lastName);
          setProfession(cookieData.profession);
          setEmail(cookieData.email);
          setPhone(cookieData.phone);
          setAddress(cookieData.address);
          setpostalCode(cookieData.postalCode);
          setCountry(cookieData.country);
        }

        setisLoaderOn(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [renderCheck]);

  // Cookie.set('cookiename','value');
  // Cookie.get('cookiename');
  // Cookie.set('cookiename');

  return (
    <>
      <div className={Style.breadcrumb}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className={Style.pagetitle}>Basic Information</h1>
              <ul>
                <li className={Style.item}>
                  <a href="#">Home</a>
                </li>
                <li className={Style.seperator}>»</li>
                <li className={`${Style.itemcurrent} ${Style.item}`}>
                  Basic Information
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
            <div className="col-9">
              <div className={Style.informationrow}>
                <h3>Let’s Begin with Your Basic Information</h3>
                <p>This is important for your employer to reach you!</p>
              </div>

              <div className={Style.formraw}>
                <div className={Style.formraw33}>
                  <label>First Name</label>
                  <input
                    className={`${Style.sasa} ${Style.text}`}
                    type="input"
                    name="firstname"
                    id="firstname"
                    value={firstName}
                    onChange={(e) => {
                      _validation(e, "first_name");
                    }}
                  />
                  <i className="" aria-hidden="true"></i>
                  {loader}
                </div>

                <div className={Style.formraw33}>
                  <label>Last Name</label>
                  <input
                    className={`${Style.sasa} ${Style.text}`}
                    type="input"
                    name="lastname"
                    id="lastname"
                    value={lastName}
                    onChange={(e) => {
                      _validation(e, "last_name");
                    }}
                  />
                  <i className="" aria-hidden="true"></i>
                  {loader}
                </div>

                <div className={Style.formraw75}>
                  <label>Profession</label>
                  <input
                    list="professions"
                    className={`${Style.sasa} ${Style.text}`}
                    type="input"
                    name="profession"
                    id="profession"
                    value={profession}
                    onChange={(e) => {
                      _validation(e, "profession");
                    }}
                  />
                  <i className="" aria-hidden="true"></i>
                  <datalist id="professions">{professionsList}</datalist>
                  {loader}
                </div>

                <div className={Style.formraw33}>
                  <label>Email </label>
                  <input
                    className={`${Style.sasa} ${Style.text}`}
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      _validation(e, "email");
                    }}
                  />
                  <i className="" aria-hidden="true"></i>
                  {loader}
                </div>

                <div className={Style.formraw33}>
                  <label>Contact Number</label>
                  <IntlTelInput
                    inputClassName={`${Style.text}`}
                    fieldName="phone"
                    fieldId="phone"
                    defaultCountry="auto"
                    geoIpLookup={geoIP}
                    onPhoneNumberChange={handlePhoneChange}
                    value={phone}
                  />
                  <i className="" id="phonetick_i" aria-hidden="true"></i>
                  {/* {loader} */}
                </div>

                <div className={Style.formraw33}>
                  <label>Address</label>
                  <input
                    className={`${Style.sasa} ${Style.text}`}
                    type="input"
                    name="address"
                    id="address"
                    value={address}
                    onChange={(e) => {
                      _validation(e, "address");
                    }}
                  />
                  {/* <i className="" aria-hidden="true"></i> */}
                  {loader}
                </div>

                <div className={Style.formraw15}>
                  <label>Postal Code</label>
                  <input
                    className={`${Style.sasa} ${Style.text}`}
                    type="input"
                    name="zipcode"
                    id="zipcode"
                    value={postalCode}
                    onChange={(e) => {
                      _validation(e, "postal_code");
                    }}
                  />
                  {/* <i className="" aria-hidden="true"></i> */}
                  {loader}
                </div>

                <div className={Style.formraw15}>
                  <label>Country</label>
                  <select
                    name="country"
                    id="country"
                    className={`${Style.sasa} ${Style.select}`}
                    onChange={(e) => {
                      _validation(e, "country");
                    }}
                  >
                    <option>---Select---</option>
                    {countryList}
                  </select>
                </div>
              </div>
              <span className={Style.errorMessage}>{errorMessage}</span>
            </div>
            <div className="col-3">
              <div className={Style.resumeHolder}>
                <_Template
                  firstName={firstName}
                  lastName={lastName}
                  profession={profession}
                  phone={phone}
                  email={email}
                  address={address}
                  postalCode={postalCode}
                  country={country}
                />
              </div>
            </div>
            <div className="col-12">
              <div className={Style.prevnextBtn}>
                <a
                  href="#"
                  onClick={(event) => changePage(PAGE_ROUTE.RESUME_TEMPLATE)}
                  className={Style.prevBtn}
                >
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>
                  Back{" "}
                </a>
                <button
                  type="button"
                  className={Style.nextBtn}
                  onClick={saveFormData}
                >
                  Continue {" "}
                  <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.clr}></div>
      </div>{" "}
    </>
  );
}
