import React from "react";
import ReactDOM from "react-dom";

function ModalInfo({ open, children, onClose }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-container bg-white sm:w-1/2 w-full h-1/2 flex flex-col items-center rounded font-gowun text-2xl p-2 text-center">
        <div className="button" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-10 h-10 text-zinc-800 hover:text-zinc-700 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div className="content flex flex-col h-full justify-center">

            {children}

        </div>

        <div className="boutons font-outfit flex w-full sm:px-28 px-4 justify-center gap-8 mt-12"></div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default ModalInfo;
