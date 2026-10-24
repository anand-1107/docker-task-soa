import { CalendarDays, Plus, RefreshCw } from 'lucide-react';

export default function DashboardHeader({ onAdd, onRefresh, refreshing }) {
  return <header className="topbar d-flex align-items-center justify-content-between gap-3">
    <div className="d-flex align-items-center gap-3">
      <div className="brand-mark"><CalendarDays size={21} /></div>
      <div><div className="brand-name">Exam<span>Schedule</span></div><div className="brand-caption">ACADEMIC PLANNER</div></div>
    </div>
    <button className="btn btn-light btn-sm refresh-top" onClick={onRefresh} disabled={refreshing} aria-label="Refresh exams"><RefreshCw size={16} className={refreshing ? 'spin' : ''} /></button>
  </header>;
}
