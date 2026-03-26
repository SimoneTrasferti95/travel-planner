import type { ModalProps } from "../types/ModalType";

export const ModalWrapper: React.FC<ModalProps> = ({ title, children, onClose }) => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
    <div style={{ backgroundColor: 'grey', padding: '20px',border:'2px solid white', borderRadius: '8px', minWidth: '300px' }}>
      <h2 style={{color:'black'}}>{title}</h2>
      <div style={{ margin: '20px 0' }}>{children}</div>
      <button onClick={onClose}>Chiudi</button>
    </div>
  </div>
);