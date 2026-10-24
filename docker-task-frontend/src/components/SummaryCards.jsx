import { BookOpen, Clock3, Monitor, PenLine } from 'lucide-react';

const cards = [
  { key: 'total', label: 'Total exams', icon: BookOpen, tone: 'blue' },
  { key: 'online', label: 'Online exams', icon: Monitor, tone: 'violet' },
  { key: 'offline', label: 'Offline exams', icon: PenLine, tone: 'amber' },
  { key: 'hours', label: 'Scheduled duration', icon: Clock3, tone: 'green', suffix: ' hrs' },
];

export default function SummaryCards({ exams }) {
  const online = exams.filter((exam) => exam.online === true || String(exam.online).toLowerCase() === 'true').length;
  const values = { total: exams.length, online, offline: exams.length - online, hours: (exams.reduce((sum, exam) => sum + (Number(exam.durationMinutes) || 0), 0) / 60).toLocaleString(undefined, { maximumFractionDigits: 1 }) };
  return <div className="row g-3 mb-4">{cards.map(({ key, label, icon: Icon, tone, suffix = '' }) => <div className="col-6 col-xl-3" key={key}>
    <div className="summary-card"><div className={`summary-icon ${tone}`}><Icon size={19} /></div><div className="summary-label">{label}</div><div className="summary-value">{values[key]}<span>{suffix}</span></div></div>
  </div>)}</div>;
}
