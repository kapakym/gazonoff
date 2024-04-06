import Heading from "@/components/ui/Heading/Heading";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import CategoryPage from "./CategoryPage";

export const metadata: Metadata = {
  title: "Welcome",
  ...NO_INDEX_PAGE,
};

export default function Category() {
  return (
    <div className="">
      <Heading>Категории товаров</Heading>
      <CategoryPage />
    </div>
  );
}
