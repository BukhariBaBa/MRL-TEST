import Link from "next/link";
import Style from "../../../cssmodule/builder.module.css";
import { useRouter } from "next/dist/client/router";
export default function _ResumeFullView({_handleCLosePreview}) {
  const router = useRouter();
  const changePage = () => {
      window.location.reload();
    // router.push(`/builder/${pageRoute}`);  
  };
  return (
    <>
      <div id="resumeFullViewWraper" className={Style.resumeFullViewWraper}>
        <img
          src="/assets/images/closebtn.png"
          title="Close"
          alt="close"
          className={Style.closebtn}
          onClick={(e) => {
            changePage();
          }}
        />
        <div id="previewHolder" className={Style.previewHolder}></div>
      </div>
    </>
  );
}
