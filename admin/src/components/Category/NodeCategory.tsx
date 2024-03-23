"use client";
import { categoryService } from "@/services/category.service";
import { ICategoryNode } from "@/types/category.types";
import { dataTagSymbol, useQuery } from "@tanstack/react-query";
import { LucideDot, LucideMinus, LucidePlus } from "lucide-react";
import { useState } from "react";

interface PropsCategoryNode {
  node: ICategoryNode;
  collapse?: boolean;
  onSelected?: (id: string) => void;
  selectedId?: string;
  onDoubleClick: (id: string) => void;
}

export default function NodeCategory({
  node,
  collapse = false,
  onSelected,
  selectedId,
  onDoubleClick,
}: PropsCategoryNode) {
  const { id, name } = node;
  const [isCollapse, setIsCollapse] = useState(collapse);

  const { data: categoryData, isPending: isLoading } = useQuery({
    queryKey: ["category_with_child", id],
    queryFn: () => categoryService.getCategoryWithChildren(id),
  });

  console.log(categoryData?.data);

  const handlerCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const handlerSelect = (id: string) => {
    if (onSelected) {
      onSelected(id);
    }
  };

  return (
    <div className="py-1">
      <div className="flex space-x-1">
        <div onClick={handlerCollapse}>
          {!!categoryData?.data.children ? (
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
          className={`hover:bg-gray-500 cursor-pointer px-1`}
          onClick={() => handlerSelect(id)}
          onDoubleClick={() => onDoubleClick(id)}
          style={{ border: id === selectedId ? "1px dotted gray" : "" }}
        >
          {categoryData?.data?.category?.name
            ? categoryData?.data?.category?.name
            : "Корень"}
        </div>
      </div>
      <div className="pl-4">
        {!!categoryData?.data && (
          <div style={{ display: isCollapse ? "block" : "none" }}>
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
