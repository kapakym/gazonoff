import Heading from "@/components/ui/Heading/Heading";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import StocksPage from "../stocks/StocksPage";
import { QuantityPage } from "./QuantityPage";

export const metadata: Metadata = {
  title: "Welcome",
  ...NO_INDEX_PAGE,
};

export default function ProductPages() {
  return (
    <div>
      <Heading>Товары</Heading>
      <QuantityPage />
    </div>
  );
}
