import Image from "next/image";
import { redirect } from "next/navigation";
import Auth from "./Auth";

export default function AuthPage() {
  return (
    <div>
      <Auth />
    </div>
  );
}
