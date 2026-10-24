import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const blankExam = { examTitle: '', examDate: '', durationMinutes: '', online: false };

export default function ExamForm({ exam, saving, onClose, onSave }) {
  const [form, setForm] = useState(blankExam);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setForm(exam ? { examTitle: exam.examTitle || '', examDate: exam.examDate || '', durationMinutes: exam.durationMinutes ?? '', online: exam.online === true || String(exam.online).toLowerCase() === 'true' } : blankExam);
    setErrors({});
  }, [exam]);

  function submit(event) {
    event.preventDefault();
    const next = {};
    if (!form.examTitle.trim()) next.examTitle = 'Enter an exam title.';
    if (!form.examDate) next.examDate = 'Choose an exam date.';
    if (!Number.isInteger(Number(form.durationMinutes)) || Number(form.durationMinutes) <= 0) next.durationMinutes = 'Enter a positive whole number of minutes.';
    setErrors(next);
    if (Object.keys(next).length) return;
    onSave({ examTitle: form.examTitle.trim(), examDate: form.examDate, durationMinutes: Number(form.durationMinutes), online: Boolean(form.online) });
  }

  const change = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  return <div className="modal-backdrop-custom" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !saving) onClose(); }}>
    <section className="dialog-card" role="dialog" aria-modal="true" aria-labelledby="form-title">
      <div className="dialog-head"><div><div className="eyebrow">EXAM DETAILS</div><h2 id="form-title">{exam ? 'Edit exam' : 'Add an exam'}</h2><p>Fill in the schedule information below.</p></div><button className="icon-button" onClick={onClose} disabled={saving} aria-label="Close"><X size={19} /></button></div>
      <form onSubmit={submit} noValidate>
        <div className="mb-3"><label className="form-label" htmlFor="examTitle">Exam title <span className="required">*</span></label><input id="examTitle" className={`form-control ${errors.examTitle ? 'is-invalid' : ''}`} value={form.examTitle} onChange={change('examTitle')} placeholder="e.g. Java Programming" maxLength={120} autoFocus /><div className="invalid-feedback">{errors.examTitle}</div></div>
        <div className="row g-3"><div className="col-sm-6"><label className="form-label" htmlFor="examDate">Exam date <span className="required">*</span></label><input id="examDate" type="date" className={`form-control ${errors.examDate ? 'is-invalid' : ''}`} value={form.examDate} onChange={change('examDate')} /><div className="invalid-feedback">{errors.examDate}</div></div>
          <div className="col-sm-6"><label className="form-label" htmlFor="durationMinutes">Duration <span className="required">*</span></label><div className="input-group"><input id="durationMinutes" type="number" min="1" step="1" className={`form-control ${errors.durationMinutes ? 'is-invalid' : ''}`} value={form.durationMinutes} onChange={change('durationMinutes')} placeholder="180" /><span className="input-group-text">minutes</span><div className="invalid-feedback">{errors.durationMinutes}</div></div></div></div>
        <fieldset className="mt-3 mb-4"><legend className="form-label">Exam mode</legend><div className="mode-options"><label className={`mode-option ${!form.online ? 'selected' : ''}`}><input type="radio" name="online" checked={!form.online} onChange={() => setForm({ ...form, online: false })} /><span><span className="mode-dot offline-dot" />In person</span></label><label className={`mode-option ${form.online ? 'selected' : ''}`}><input type="radio" name="online" checked={form.online} onChange={() => setForm({ ...form, online: true })} /><span><span className="mode-dot online-dot" />Online</span></label></div></fieldset>
        <div className="dialog-actions"><button type="button" className="btn btn-light" onClick={onClose} disabled={saving}>Cancel</button><button type="submit" className="btn btn-primary px-4" disabled={saving}>{saving && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />}{saving ? 'Saving…' : exam ? 'Save changes' : 'Add exam'}</button></div>
      </form>
    </section>
  </div>;
}
