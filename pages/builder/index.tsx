import Head from "next/head";
import Layout from "../../components/BuilderLayout";
import { useRouter } from "next/dist/client/router";
import { page_route } from "../../lib/Helper";
import { useEffect } from "react";

export default function Home() {
  const PAGE_ROUTE = page_route();
  const router = useRouter();

  useEffect(() => {
    router.push(`/builder/${PAGE_ROUTE.EXPERIENCE}`);
  }, []);

  return (
    <Layout>
      {/* <SelectYear /> */}
      {/* <ChoseTemplate/> */}
      {/* <BasicInfoForm/> */}
      {/* <WorkHistoryForm/> */}
      {/* <WorkHistoryContentForm/> */}
      {/* <WorkHistorySummery/> */}
      <p>Loading</p>
    </Layout>
  );
}
