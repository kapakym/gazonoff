import Heading from "@/components/ui/Heading/Heading";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import StocksPage from "./CategoryPage";

export const metadata: Metadata = {
  title: "Welcome",
  ...NO_INDEX_PAGE,
};

export default function Category() {
  return (
    <div>
      <Heading>Категории товаров</Heading>
      <StocksPage />
    </div>
  );
}
