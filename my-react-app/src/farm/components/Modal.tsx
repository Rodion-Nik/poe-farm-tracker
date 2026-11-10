import type { ReactNode } from "react";

type ModalProps = {
  title: string;
  onClose: () => void;
  wide?: boolean;
  children?: ReactNode;
};

export function Modal({ title, onClose, wide, children }: ModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={wide ? "modal-window modal-window--wide" : "modal-window"}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="button modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}