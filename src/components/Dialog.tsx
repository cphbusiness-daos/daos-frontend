import { useCallback, useRef } from "react";

import { Button } from "./Button";

export function Dialog({
  children,
  title,
  description,
  onConfirm,
  disabled,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  onConfirm: () => void;
  disabled?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const confirmAction = useCallback(() => {
    closeDialog();
    onConfirm();
  }, [onConfirm]);

  const openDialog = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div onClick={disabled ? void 0 : openDialog} className="w-full">
        {children}
      </div>
      <dialog
        ref={dialogRef}
        className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg"
      >
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="mt-2 text-gray-700">{description}</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={closeDialog} variant="outline" type="button">
            Cancel
          </Button>
          <Button onClick={confirmAction} variant="danger" type="button">
            Confirm
          </Button>
        </div>
      </dialog>
    </div>
  );
}
