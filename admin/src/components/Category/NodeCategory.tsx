"use client";
import { categoryService } from "@/services/category.service";
import { ICategoryNode } from "@/types/category.types";
import { useMutation } from "@tanstack/react-query";
import {
  LucideCircleDot,
  LucideDot,
  LucideMinus,
  LucidePlus,
} from "lucide-react";
import { useEffect, useState } from "react";

interface PropsCategoryNode {
  node: ICategoryNode;
  collapse?: boolean;
  onSelected?: (id: string) => void;
  selectedId?: string;
  updateId?: { id: string };
  onDoubleClick: (id: string) => void;
}

export default function NodeCategory({
  node,
  collapse = false,
  onSelected,
  selectedId,
  updateId,
  onDoubleClick,
}: PropsCategoryNode) {
  const { id, name } = node;
  const [isCollapse, setIsCollapse] = useState(false);

  useEffect(() => {
    if (collapse) {
      getCategory(id);
    }
  }, []);

  useEffect(() => {
    if (isCollapse) {
      getCategory(id);
    }
  }, [isCollapse]);

  useEffect(() => {
    if (categoryData?.data.find((item) => item.id === updateId?.id)) {
      console.log({ updateId });
      getCategory(id);
    }
  }, [updateId]);

  const {
    data: categoryData,
    mutate: getCategory,
    isPending: isLoading,
  } = useMutation({
    mutationKey: ["categories"],
    mutationFn: (id: string) => categoryService.getCategoryWithChildren(id),
  });

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
          {node._count.childrens ? (
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
          {name}
        </div>
      </div>
      <div className="pl-4">
        {!!categoryData?.data && (
          <div style={{ display: isCollapse ? "block" : "none" }}>
            {categoryData?.data.map((item) => (
              <NodeCategory
                node={item}
                key={item.id}
                onSelected={handlerSelect}
                selectedId={selectedId}
                updateId={updateId}
                onDoubleClick={onDoubleClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
