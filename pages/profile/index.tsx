import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { url } from "../../lib/Helper";

export default function User() {
  const URL = url();
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(URL.USER, {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const content = await response.json();
        router.push(`/profile/${content.user_name}`);
        setAuth(true);
      } catch (e) {
        setAuth(false);
      }
    })();
  }, [auth]);
  return (<></>);
}
