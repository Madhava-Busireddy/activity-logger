import "./ConfirmModal.css";

function ConfirmModal({ open, title, message, onConfirm, onCancel, confirmLabel = "Yes, Clear", cancelLabel = "Cancel" }) {
  if (!open) return null;

  return (
    <div className="confirm-modal__overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-modal__actions">
          <button className="confirm-modal__cancel" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className="confirm-modal__confirm" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;