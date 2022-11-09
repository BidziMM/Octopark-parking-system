import React, {useEffect} from "react";

export default function Modal({children,isOpen,onClose,disableModalClosing=false ,props}) {
  let modal;
  useEffect(() => {
      modal = document.getElementById("my-modal");
      if(modal && !disableModalClosing){
          window.addEventListener("click", closeOutside)
  }  
  return () => {
      window.removeEventListener("click", closeOutside)
  }
  },[isOpen])
  const closeOutside = (event) => {
      if (event.target == modal) {
          console.log("jestem tym divem")
          onClose()
      }
  }
  if (!isOpen) return null;
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div id='my-modal' className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="text-center">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
