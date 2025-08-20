import React from "react";
import { Button } from "@/components/ui/Button";

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onCancel} />
      <div className="relative z-10 w-[90%] max-w-md rounded-xl border border-gray-700 bg-[#1a1a1a] p-6 shadow-xl">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-6">{description}</p>
        <div className="flex justify-end gap-3">
          <Button onClick={onCancel} className="bg-gray-700 hover:bg-gray-800 text-white">
            {cancelText}
          </Button>
          <Button onClick={onConfirm} className="bg-red-700 hover:bg-red-800 text-white">
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}


