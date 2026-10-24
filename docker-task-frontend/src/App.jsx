import { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus, RefreshCw, CalendarDays, Sparkles, X, CircleCheck, CircleAlert } from 'lucide-react';
import DashboardHeader from './components/DashboardHeader.jsx';
import SummaryCards from './components/SummaryCards.jsx';
import ExamTable from './components/ExamTable.jsx';
import ExamForm from './components/ExamForm.jsx';
import ExamDetails from './components/ExamDetails.jsx';
import { examService } from './services/examService.js';

function normalizeExams(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.exams)) return data.exams;
  return [];
}

export default function App() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [formExam, setFormExam] = useState(undefined);
  const [detailExam, setDetailExam] = useState(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState('all');
  const [sort, setSort] = useState('asc');
  const [notice, setNotice] = useState(null);

  const loadExams = useCallback(async (quiet = false) => {
    if (quiet) setRefreshing(true); else setLoading(true);
    setError('');
    try { setExams(normalizeExams(await examService.list())); }
    catch (err) { setError(err.message || 'Unable to load exams.'); }
    finally { setLoading(false); setRefreshing(false); }
  }, []);

  useEffect(() => { loadExams(); }, [loadExams]);
  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(null), 4500);
    return () => clearTimeout(timer);
  }, [notice]);

  const filteredExams = useMemo(() => exams.filter((exam) => {
    const matchesSearch = (exam.examTitle || '').toLowerCase().includes(search.trim().toLowerCase());
    const isOnline = exam.online === true || String(exam.online).toLowerCase() === 'true';
    return matchesSearch && (mode === 'all' || (mode === 'online' ? isOnline : !isOnline));
  }).sort((a, b) => (String(a.examDate || '').localeCompare(String(b.examDate || '')) * (sort === 'asc' ? 1 : -1))), [exams, search, mode, sort]);

  async function saveExam(payload) {
    setSaving(true);
    try {
      if (formExam) await examService.update(formExam.id, payload);
      else await examService.create(payload);
      setFormExam(undefined);
      setNotice({ type: 'success', message: formExam ? 'Exam updated successfully.' : 'Exam added successfully.' });
      await loadExams(true);
    } catch (err) { setNotice({ type: 'error', message: err.message || 'Could not save the exam.' }); }
    finally { setSaving(false); }
  }

  async function deleteExam(exam) {
    if (exam.id == null) { setNotice({ type: 'error', message: 'This exam has no ID and cannot be deleted.' }); return; }
    if (!window.confirm(`Delete “${exam.examTitle || 'this exam'}”? This action cannot be undone.`)) return;
    try { await examService.remove(exam.id); setNotice({ type: 'success', message: 'Exam deleted successfully.' }); await loadExams(true); }
    catch (err) { setNotice({ type: 'error', message: err.message || 'Could not delete the exam.' }); }
  }

  return <div className="app-shell"><DashboardHeader onAdd={() => setFormExam(null)} onRefresh={() => loadExams(true)} refreshing={refreshing} />
    <main className="workspace"><div className="content-wrap">
      <div className="welcome-row"><div><div className="eyebrow"><Sparkles size={13} /> YOUR ACADEMIC OVERVIEW</div><h1>Exam Schedule Management</h1><p className="page-subtitle">A clear view of your examination calendar, all in one place.</p></div><button className="btn btn-primary add-button" onClick={() => setFormExam(null)}><Plus size={18} /> Add exam</button></div>
      {error && <div className="alert error-alert d-flex align-items-center justify-content-between gap-3" role="alert"><div className="d-flex align-items-start gap-2"><CircleAlert size={19} /><div><strong>Unable to load exams</strong><div>{error}</div></div></div><button className="btn btn-sm btn-outline-danger" onClick={() => loadExams()}>Retry</button></div>}
      <SummaryCards exams={exams} />
      <ExamTable exams={filteredExams} search={search} setSearch={setSearch} mode={mode} setMode={setMode} sort={sort} setSort={setSort} onClear={() => { setSearch(''); setMode('all'); setSort('asc'); }} onView={setDetailExam} onEdit={(exam) => setFormExam(exam)} onDelete={deleteExam} loading={loading} />
      <footer className="page-footer"><span><CalendarDays size={14} /> ExamSchedule</span><span>Keep your semester on track.</span></footer>
    </div></main>
    {formExam !== undefined && <ExamForm exam={formExam} saving={saving} onClose={() => { if (!saving) setFormExam(undefined); }} onSave={saveExam} />}
    <ExamDetails exam={detailExam} onClose={() => setDetailExam(null)} />
    {notice && <div className={`toast-notice ${notice.type}`} role="status"><div>{notice.type === 'success' ? <CircleCheck size={19} /> : <CircleAlert size={19} />}<span>{notice.message}</span></div><button aria-label="Dismiss notification" onClick={() => setNotice(null)}><X size={16} /></button></div>}
  </div>;
}
