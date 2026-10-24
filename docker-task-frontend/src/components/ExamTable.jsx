import { CalendarDays, Eye, Pencil, Search, Trash2 } from 'lucide-react';

function formatDate(date) {
  if (!date) return '—';
  const parsed = new Date(`${date}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? date : parsed.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function ExamTable({ exams, search, setSearch, mode, setMode, sort, setSort, onClear, onView, onEdit, onDelete, loading }) {
  return <section className="table-panel">
    <div className="panel-heading"><div><h2>Exam schedule</h2><p>Manage and review your upcoming examinations</p></div><span className="record-count">{exams.length} {exams.length === 1 ? 'record' : 'records'}</span></div>
    <div className="filter-bar"><div className="search-wrap"><Search size={17} /><input aria-label="Search exam title" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search exams…" /></div><select className="form-select filter-select" aria-label="Filter by exam mode" value={mode} onChange={(event) => setMode(event.target.value)}><option value="all">All modes</option><option value="online">Online</option><option value="offline">Offline</option></select><select className="form-select filter-select sort-select" aria-label="Sort by exam date" value={sort} onChange={(event) => setSort(event.target.value)}><option value="asc">Date: earliest</option><option value="desc">Date: latest</option></select><button className="btn btn-link clear-button" onClick={onClear}>Clear filters</button></div>
    {loading ? <div className="table-state"><span className="spinner-border text-primary" role="status" /><p>Loading your exam schedule…</p></div> : exams.length === 0 ? <div className="table-state empty-state"><div className="empty-icon"><CalendarDays size={24} /></div><h3>No exams found</h3><p>Try adjusting your filters or add an exam to get started.</p></div> : <div className="table-responsive"><table className="table align-middle exam-table mb-0"><thead><tr><th scope="col">ID</th><th scope="col">Exam title</th><th scope="col">Exam date</th><th scope="col">Duration</th><th scope="col">Mode</th><th scope="col" className="text-end">Actions</th></tr></thead><tbody>{exams.map((exam, index) => {
      const online = exam.online === true || String(exam.online).toLowerCase() === 'true';
      return <tr key={exam.id ?? `${exam.examTitle}-${index}`}><td className="id-cell">{exam.id ?? '—'}</td><td className="title-cell">{exam.examTitle || 'Untitled exam'}</td><td>{formatDate(exam.examDate)}</td><td>{exam.durationMinutes ?? '—'} <span className="muted-unit">min</span></td><td><span className={`mode-badge ${online ? 'online' : 'offline'}`}><span />{online ? 'Online' : 'Offline'}</span></td><td><div className="row-actions"><button className="action-btn" title="View exam" aria-label={`View ${exam.examTitle}`} onClick={() => onView(exam)}><Eye size={16} /></button><button className="action-btn" title="Edit exam" aria-label={`Edit ${exam.examTitle}`} onClick={() => onEdit(exam)}><Pencil size={15} /></button><button className="action-btn delete-action" title="Delete exam" aria-label={`Delete ${exam.examTitle}`} onClick={() => onDelete(exam)}><Trash2 size={16} /></button></div></td></tr>;
    })}</tbody></table></div>}
  </section>;
}
