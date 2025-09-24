import React, { useState, useEffect, useRef } from 'react';
import { Edit, X } from 'lucide-react';

interface CaseNotesProps {
  caseId: string;
}

const CaseNotes: React.FC<CaseNotesProps> = ({ caseId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(`case_notes_${caseId}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [caseId]);

  // Auto-save notes with debounce
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      if (notes.trim()) {
        localStorage.setItem(`case_notes_${caseId}`, notes);
      } else {
        localStorage.removeItem(`case_notes_${caseId}`);
      }
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [notes, caseId]);

  // Focus textarea when panel opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key to close panel
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  return (
    <>
      {/* Floating Notes Button */}
      <button
        onClick={handleToggle}
        className="btn btn-primary position-fixed d-flex align-items-center justify-content-center"
        style={{
          bottom: '20px',
          right: '20px',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          zIndex: 1050,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease',
        }}
        title="Case Notes"
        aria-label="Open case notes"
      >
        <Edit size={20} color="white" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="position-fixed"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 1040,
          }}
          onClick={handleClose}
        />
      )}

      {/* Notes Panel */}
      <div
        className="position-fixed bg-white border rounded-top case-notes-panel"
        style={{
          bottom: isOpen ? '0' : '-400px',
          left: '20px',
          right: '20px',
          height: '400px',
          zIndex: 1060,
          transition: 'bottom 0.3s ease-in-out',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
          maxHeight: '80vh',
        }}
      >
        {/* Panel Header */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h6 className="mb-0 text-dark fw-semibold">Case Notes</h6>
          <button
            onClick={handleClose}
            className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center"
            style={{ width: '32px', height: '32px' }}
            aria-label="Close notes"
          >
            <X size={16} />
          </button>
        </div>

        {/* Notes Content */}
        <div className="p-3 h-100">
          <textarea
            ref={textareaRef}
            value={notes}
            onChange={handleNotesChange}
            placeholder="Notes for this case...&#10;&#10;• Suspicious persons&#10;• Important evidence&#10;• Theories and assumptions&#10;• Next steps"
            className="form-control border-0 h-100 case-notes-textarea"
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '22px',
              lineHeight: '1.4',
              outline: 'none',
              boxShadow: 'none',
              resize: 'none',
            }}
            rows={12}
          />
        </div>

        {/* Auto-save indicator */}
        <div className="position-absolute" style={{ bottom: '12px', right: '16px' }}>
          <small className="text-muted">
            <i className="bi bi-cloud-check me-1"></i>
            Auto-saved
          </small>
        </div>
      </div>
    </>
  );
};

export default CaseNotes;