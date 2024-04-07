"use client";
import { categoryService } from "@/services/category.service";
import { ICategoryNode } from "@/types/category.types";
import { useQuery } from "@tanstack/react-query";
import {
  Loader,
  Loader2,
  LucideDot,
  LucideMinus,
  LucidePlus,
} from "lucide-react";
import { useState } from "react";
import GlobalLoader from "../ui/GlobalLoader/GlobalLoader";
import { MiniLoader } from "../ui/MiniLoader/MiniLoader";

interface PropsCategoryNode {
  node: ICategoryNode;
  collapse?: boolean;
  onSelected?: (id: ICategoryNode) => void;
  selectedId?: ICategoryNode;
  onDoubleClick: (id: ICategoryNode) => void;
}

export default function NodeCategory({
  node,
  collapse = false,
  onSelected,
  selectedId,
  onDoubleClick,
}: PropsCategoryNode) {
  const { id } = node;
  const [isCollapse, setIsCollapse] = useState(collapse);

  const { data: categoryData, isPending: isLoading } = useQuery({
    queryKey: ["category_with_child", id],
    queryFn: () => categoryService.getCategoryWithChildren(id),
  });

  const handlerCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const handlerSelect = (id: ICategoryNode) => {
    if (onSelected) {
      onSelected(id);
    }
  };

  return (
    <div className="py-1">
      <div className="flex space-x-1">
        <div onClick={handlerCollapse}>
          {!!categoryData?.data.children.length ? (
            <div className="border-[1px] border-dotted border-gray-500">
              {isCollapse ? <LucideMinus /> : <LucidePlus />}
            </div>
          ) : (
            <div className="w-6 flex justify-center relative">
              <LucideDot />
            </div>
          )}
        </div>

        <div
          className={`hover:bg-gray-500 cursor-pointer px-1 flex space-x-2`}
          onClick={() => handlerSelect(node)}
          onDoubleClick={() => onDoubleClick(node)}
          style={{ border: id === selectedId?.id ? "1px dotted gray" : "" }}
        >
          <div>
            {categoryData?.data?.category?.name
              ? categoryData?.data?.category?.name
              : "Корень"}
          </div>

          {isLoading && <MiniLoader />}
        </div>
      </div>
      <div className="pl-4">
        {!!categoryData?.data && isCollapse && (
          <div>
            {categoryData?.data.children.map((item) => (
              <NodeCategory
                node={item}
                key={item.id}
                onSelected={handlerSelect}
                selectedId={selectedId}
                onDoubleClick={onDoubleClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
