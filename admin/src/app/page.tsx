import Image from "next/image";
import { redirect } from "next/navigation";
import Auth from "./auth/Auth";

export default function Home() {
  redirect("/auth");
  return <main>Home page</main>;
}
