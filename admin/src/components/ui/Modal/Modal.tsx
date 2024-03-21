import React, { PropsWithChildren } from "react";

interface PropsModal extends PropsWithChildren {
  renderButtons?: () => React.ReactNode;
  visible?: boolean;
  onClose: () => void;
  title?: string;
  onSubmit?: () => void;
}

export default function Modal({
  renderButtons,
  visible = true,
  onClose,
  title,
  children,
  onSubmit,
}: PropsModal) {
  const handlerCloseModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.stopPropagation();
    onClose();
  };

  const handlerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.stopPropagation();
  };
  return (
    <>
      {visible && (
        <div
          id="static-modal"
          data-modal-backdrop="static"
          aria-hidden="true"
          onClick={handlerCloseModal}
          className=" flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
        >
          <div
            className="relative p-4 w-full max-w-2xl max-h-full"
            onClick={handlerClick}
          >
            <form
              className="relative bg-white rounded-lg shadow dark:bg-gray-700"
              onSubmit={onSubmit}
            >
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="static-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4">{children}</div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                {renderButtons && renderButtons()}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
