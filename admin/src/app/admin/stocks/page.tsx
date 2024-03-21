import Heading from "@/components/ui/Heading/Heading";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import StocksPage from "./StocksPage";

export const metadata: Metadata = {
  title: "Welcome",
  ...NO_INDEX_PAGE,
};

export default function Stocks() {
  return (
    <div>
      <Heading>Склады</Heading>
      <StocksPage />
    </div>
  );
}
