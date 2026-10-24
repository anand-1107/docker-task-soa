import { CalendarDays, Clock3, Hash, Monitor, X } from 'lucide-react';

export default function ExamDetails({ exam, onClose }) {
  if (!exam) return null;
  const online = exam.online === true || String(exam.online).toLowerCase() === 'true';
  return <div className="modal-backdrop-custom" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="dialog-card details-dialog" role="dialog" aria-modal="true" aria-labelledby="details-title">
    <div className="dialog-head"><div><div className="eyebrow">EXAM OVERVIEW</div><h2 id="details-title">{exam.examTitle || 'Exam details'}</h2><p>Complete schedule record</p></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={19} /></button></div>
    <div className="detail-list"><div><Hash /><span>Exam ID</span><strong>{exam.id ?? '—'}</strong></div><div><CalendarDays /><span>Exam date</span><strong>{exam.examDate ? new Date(`${exam.examDate}T00:00:00`).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}</strong></div><div><Clock3 /><span>Duration</span><strong>{exam.durationMinutes ?? '—'} minutes</strong></div><div><Monitor /><span>Mode</span><strong><span className={`mode-badge ${online ? 'online' : 'offline'}`}>{online ? 'Online' : 'Offline'}</span></strong></div></div>
    <div className="dialog-actions"><button className="btn btn-light" onClick={onClose}>Close</button></div>
  </section></div>;
}
