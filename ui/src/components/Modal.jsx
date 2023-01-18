import React from "react";
import ReactDOM from "react-dom";

function Modal({open, children, onClose, onConfirm}) {
  if (!open) return null;

  return ReactDOM.createPortal(

    <div className="modal-overlay">
      <div className="modal-container bg-white sm:w-1/2 w-full h-1/2 flex flex-col items-center justify-center rounded font-gowun text-2xl p-2 text-center">
        
        {children}

        <div className="boutons font-outfit flex w-full sm:px-28 px-4 justify-center gap-8 mt-12">
          <button
            className="bg-zinc-800 text-orange-200 sm:text-xl text-md p-1 w-1/2 rounded"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="bg-zinc-800 text-orange-200 sm:text-xl text-md p-1 w-1/2 rounded"
            onClick={onConfirm}
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")

  );
}

export default Modal;
