import React from "react";

// PUBLIC_INTERFACE
type ConfirmDialogProps = {
  open: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
};

/**
 * A modal dialog that asks user to confirm an action.
 */
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  message,
  onClose,
  onConfirm,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-[#19191d] rounded-xl shadow-xl p-7 w-96 max-w-[96vw] mx-2 relative">
        <span
          onClick={onClose}
          title="Close"
          className="absolute right-5 top-5 text-xl text-gray-400 cursor-pointer hover:text-black dark:hover:text-white"
        >
          ×
        </span>
        <div className="font-semibold text-xl mb-4 text-[color:var(--accent,#ffca28)]">Confirm</div>
        <div className="mb-6 text-gray-700 dark:text-gray-200">{message}</div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-gray-100 hover:bg-gray-200 transition text-black"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded bg-[color:var(--accent,#ffca28)] text-black font-medium hover:bg-yellow-400 transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
