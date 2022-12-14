import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Modal({title, msg, closeModal, status}) {
  return (
    <div
      class="relative z-10 "
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div onClick={closeModal} class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <AiOutlineCloseCircle color='red'/>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <div class="mt-2">
                    <p class="text-lg text-gray-800">
                      {msg}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-20 px-4 py-3 sm:px-6 sm:flex sm:flex-row">
                <button onClick={closeModal} type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:text-base">ZAMKNIJ POWIADOMIENIE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
