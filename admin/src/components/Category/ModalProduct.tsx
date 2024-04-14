import { fileService } from "@/services/file.service";
import { productService } from "@/services/product.service";
import { ICategoryNode } from "@/types/category.types";
import {
  ICreateFiles,
  ICreateFilesRes,
  IPhotosUri,
  IProductForm,
  TCreateProduct,
  TUpdateProduct,
} from "@/types/product.types";
import { useMutation } from "@tanstack/react-query";
import { FilePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import Button from "../ui/Button/Button";
import { EButtonType } from "../ui/Button/button.enums";
import { Field } from "../ui/Field/Field";
import GlobalLoader from "../ui/GlobalLoader/GlobalLoader";
import Modal from "../ui/Modal/Modal";
import { EModalEnum } from "../ui/Modal/mode.enums";
import { ParamsField } from "../ui/ParamsField/ParamsField";
import { TextField } from "../ui/TextField/TextField";

interface PropsModalCategory {
  onClose: () => void;
  mode?: EModalEnum;
  category?: ICategoryNode;
  productId?: string;
}

export function ModalProduct({
  onClose,
  mode = EModalEnum.CREATE,
  category,
  productId,
}: PropsModalCategory) {
  const [previewPhotos, setPreviewPhotos] = useState<IPhotosUri[] | []>([]);
  const [mainPhoto, setMainPhoto] = useState<string>();

  const { register, handleSubmit, reset, setValue, resetField, control } =
    useForm<IProductForm>({
      mode: "onChange",
      defaultValues: {
        categoryId: category?.name,
      },
    });

  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: "params",
    });

  const { mutate: createProduct, isPending: isPendingCreate } = useMutation({
    mutationKey: ["createCategory"],
    mutationFn: (data: TCreateProduct) => productService.createProduct(data),
    onSuccess: () => {
      onClose();
    },
  });

  const {
    mutateAsync: createFiles,
    isPending: isPendingFiles,
    data: dataFiles,
  } = useMutation({
    mutationKey: ["createFiles"],
    mutationFn: (data: ICreateFiles) => fileService.createFiles(data),
    onSuccess: () => {},
  });

  const { mutate: updateProduct, isPending: isPendingUpdate } = useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: ({ id, data }: { id: string; data: TUpdateProduct }) =>
      productService.updateProduct(id, data),
    onSuccess: (data) => {
      onClose();
    },
  });

  const {
    mutate: getProduct,
    isPending: isLoadingProduct,
    data: productData,
  } = useMutation({
    mutationKey: ["get_products", productId],
    mutationFn: (id: string) => productService.getProduct(id),
  });

  const {
    mutate: removeFile,
    isPending: isLoadingRemoveFile,
    data: removeData,
  } = useMutation({
    mutationKey: ["remove_file"],
    mutationFn: (file: string) => fileService.removeFile(file),
  });

  useEffect(() => {
    if (productId && mode !== EModalEnum.CREATE) {
      getProduct(productId);
    }
  }, []);

  useEffect(() => {
    if (productData) {
      console.log(productData);
      setValue("name", productData.data.name);
      setValue("price", productData.data.price);
      setValue("vendor_code", productData.data.vendor_code);
      setValue("description", productData.data.description);
      if (productData.data.params) {
        setValue("params", JSON.parse(productData.data.params));
      }
      if (productData.data.photos?.length) {
        setPreviewPhotos(
          productData.data.photos.map((item) => ({
            name: item,
            url: process.env.NEXT_PUBLIC_STATIC_SERVER + item,
            isUploaded: true,
          }))
        );
      }
      setMainPhoto(productData.data.photoMain);
    }
  }, [productData]);

  const onSubmit: SubmitHandler<IProductForm> = async (data) => {
    let photos: ICreateFilesRes[] | [] = [];

    if (data.photos?.length) {
      const photosData = new FormData();
      Array.from(data.photos).forEach((item) => {
        photosData.append("file", item, item.name);
      });
      photos = (await createFiles({ folder: "product", data: photosData }))
        .data;
    }

    if (mode === EModalEnum.EDIT) {
      const updatePhotos = [
        ...previewPhotos
          .filter((item) => productData?.data.photos?.includes(item.name))
          .map((item) => item.name),
        ...photos.map((item) => item.url),
      ];

      const isPhotoMainRes = photos.find((item) => item.name === mainPhoto);
      const isPhotoMain = isPhotoMainRes ? isPhotoMainRes.url : mainPhoto;

      if (productData?.data.id) {
        updateProduct({
          id: productData?.data.id,
          data: {
            photos: updatePhotos,
            price: Number(data.price),
            params: data.params?.length ? JSON.stringify(data.params) : "",
            photoMain: isPhotoMain,
          },
        });
      }
    }

    if (mode === EModalEnum.CREATE) {
      const isPhotoMainRes = photos.find((item) => item.name === mainPhoto);
      const isPhotoMain = isPhotoMainRes
        ? isPhotoMainRes.url
        : photos.length
          ? photos[0].url
          : undefined;

      createProduct({
        ...data,
        price: Number(data.price),
        bestsellers: false,
        raiting: 0,
        new: true,
        categoryId: category?.id ? category.id : "root",
        photos: photos.length ? photos.map((item) => item.url) : [],
        photoMain: isPhotoMain,
        params: data.params?.length ? JSON.stringify(data.params) : "",
      });
    }
    onClose();
  };

  const handleOnChangePhotos = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPreviewPhotos([
        ...previewPhotos.filter((item) => item.isUploaded),
        ...Array.from(event.target.files).map((photo) => ({
          name: photo.name,
          url: URL.createObjectURL(photo),
          isUploaded: false,
        })),
      ]);
    }
  };

  const handleSetMainPhoto = (name: string) => {
    setMainPhoto(name);
  };

  const handleAppendParams = () => {
    append({ name: "Новый параметр", value: "значение параметра" });
  };

  const handleDeletePhoto = (photo: IPhotosUri) => {
    const filterPreview = previewPhotos.filter(
      (item) => item.name !== photo.name
    );
    if (photo.isUploaded && productData?.data.id) {
      removeFile(photo.name);
      updateProduct({
        id: productData?.data.id,
        data: {
          photos: productData?.data.photos?.filter(
            (item) => item !== photo.name
          ),
        },
      });
    }
    setPreviewPhotos(filterPreview);
  };

  return (
    <Modal
      title={
        mode === EModalEnum.CREATE
          ? "Добавление товара"
          : "Редактирование товара"
      }
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
      onReset={reset}
      renderButtons={() => (
        <>
          <Button type="submit">
            {mode === EModalEnum.CREATE ? "Добавить" : "Сохранить"}
          </Button>
          <Button typeButton={EButtonType.WARRNING} onClick={onClose}>
            Закрыть
          </Button>
        </>
      )}
    >
      {(isPendingCreate || isPendingUpdate || isLoadingProduct) && (
        <GlobalLoader />
      )}
      <div className="space-y-2">
        <Field
          label="Категория"
          {...register("categoryId", { disabled: true })}
        />
        <Field label="Название" {...register("name", { minLength: 3 })} />
        <div className="flex space-x-2">
          <div className="w-1/2">
            <Field label="Стоимость" {...register("price", { minLength: 3 })} />
          </div>
          <div className="w-1/2">
            <Field
              label="Код товара"
              {...register("vendor_code", { minLength: 3 })}
            />
          </div>
        </div>

        <TextField
          label="Описание"
          {...register("description", { minLength: 3 })}
        />
        <div>
          <label
            htmlFor={"upload-photo"}
            className="flex justify-center items-center space-x-2 cursor-pointer p-2 bg-gray-800 rounded-lg mb-2 hover:bg-gray-500"
          >
            <FilePlus />
            <div>Добавить фото...</div>
          </label>
          <input
            multiple
            type="file"
            {...register("photos", {
              onChange: (e) => handleOnChangePhotos(e),
            })}
            // onChange={}
            id="upload-photo"
            className="hidden"
          />
          <div className="flex w-full overflow-x-auto space-x-2">
            {!!previewPhotos?.length &&
              previewPhotos.map((item: IPhotosUri) => (
                <div
                  key={item.url}
                  className="border-[1px] border-solid border-gray-500 px-1 rounded-lg cursor-pointer min-w-[100px]"
                >
                  <img
                    src={item.url}
                    onClick={() => handleSetMainPhoto(item.name)}
                    className={`aspect-square w-24 h-24 p-2 rounded-lg hover:scale-125 ${item.name === mainPhoto && "bg-gray-800 hover:scale-100"} `}
                  />
                  {item.name !== mainPhoto && (
                    <div
                      onClick={() => handleDeletePhoto(item)}
                      className="w-full mt-2 flex justify-centeflex justify-center items-center space-x-2 cursor-pointer p-2 bg-gray-800 rounded-lg mb-2"
                    >
                      <div>Удалить</div>
                    </div>
                  )}
                </div>
              ))}
          </div>
          <ParamsField register={register} fields={fields} remove={remove} />
          <div
            onClick={handleAppendParams}
            className="w-full mt-2 flex justify-centeflex justify-center items-center space-x-2 cursor-pointer p-2 bg-gray-800 rounded-lg mb-2 hover:bg-gray-500"
          >
            <div>Добавить параметр товара</div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
