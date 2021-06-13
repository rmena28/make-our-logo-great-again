import { FC, useEffect, useState } from "react";
import "./Modal.css";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
};

const Modal: FC<ModalProps> = ({
  open,
  onClose,
  title,
  message,
  children,
  // autoCloseTimeout = 3000,
}) => {
  const [autoCloseTimeout, setAutoCloseTimeout] = useState<any>();
  useEffect(() => {
    if (open) {
      let timeout = setTimeout(() => {
        onClose();
      }, 10000);
      setAutoCloseTimeout(timeout);
    } else {
      clearTimeout(autoCloseTimeout);
    }
    return () => {
      if (autoCloseTimeout) {
        clearTimeout(autoCloseTimeout);
      }
    };
  }, [open]);

  return (
    <>
      {open ? (
        <div className="modal">
          <div className="modal-header">
            <label>{title}</label>
          </div>
          <div className="modal-content">
            {children}
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                onClose();
              }}
              className="button"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Modal;
