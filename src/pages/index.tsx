import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   // TODO: เพิ่มเงื่อนไขว่า user login หรือยัง (ตอนนี้ redirect ไป login ทันที)
  //   router.push("/login");
  // }, []);

  return <div>Redirecting...</div>;
}

