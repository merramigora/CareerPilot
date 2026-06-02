import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Briefcase, CalendarCheck, CheckCircle, Clock, Plus, Trash2 } from 'lucide-react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import './styles.css';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const starterJobs = [
  { id: 1, company: 'Microsoft', role: 'Software Engineer Intern', location: 'Redmond, WA', status: 'Interview', dateApplied: '2026-05-12', notes: 'Review arrays, graphs, and behavioral stories.' },
  { id: 2, company: 'Nordstrom', role: 'Junior Software Developer', location: 'Seattle, WA', status: 'Applied', dateApplied: '2026-05-18', notes: 'Submitted resume version focused on Java and React.' },
  { id: 3, company: 'Costco IT', role: 'Application Developer I', location: 'Issaquah, WA', status: 'Assessment', dateApplied: '2026-05-21', notes: 'Practice SQL and basic REST API questions.' },
  { id: 4, company: 'Amazon', role: 'SDE New Grad', location: 'Seattle, WA', status: 'Rejected', dateApplied: '2026-04-30', notes: 'Did not move forward. Reuse experience for future applications.' }
];

const statuses = ['Applied', 'Assessment', 'Interview', 'Final Interview', 'Offer', 'Rejected'];

function App() {
  const [jobs, setJobs] = useState(starterJobs);
  const [form, setForm] = useState({ company: '', role: '', location: '', status: 'Applied', dateApplied: '', notes: '' });

  const stats = useMemo(() => {
    const total = jobs.length;
    const interviews = jobs.filter(j => j.status.includes('Interview')).length;
    const offers = jobs.filter(j => j.status === 'Offer').length;
    const rejected = jobs.filter(j => j.status === 'Rejected').length;
    const active = jobs.filter(j => j.status !== 'Rejected' && j.status !== 'Offer').length;
    return { total, interviews, offers, rejected, active };
  }, [jobs]);

  const statusCounts = statuses.map(status => jobs.filter(job => job.status === status).length);

  const addJob = (e) => {
    e.preventDefault();
    if (!form.company.trim() || !form.role.trim()) return;
    setJobs([{ ...form, id: Date.now(), dateApplied: form.dateApplied || new Date().toISOString().slice(0, 10) }, ...jobs]);
    setForm({ company: '', role: '', location: '', status: 'Applied', dateApplied: '', notes: '' });
  };

  const deleteJob = (id) => setJobs(jobs.filter(job => job.id !== id));

  const updateStatus = (id, status) => setJobs(jobs.map(job => job.id === id ? { ...job, status } : job));

  return (
    <div className="app">
      <header className="hero">
        <nav>
          <div className="brand"><Briefcase size={24}/> CareerPilot</div>
          <span>Built by Merra Migora</span>
        </nav>
        <section className="heroContent">
          <div>
            <p className="eyebrow">Full-Stack Job Search Dashboard</p>
            <h1>Track applications, interviews, and progress in one place.</h1>
            <p className="heroText">I built CareerPilot because job searching can get messy fast. This dashboard keeps applications, notes, statuses, and interview prep organized without depending on a spreadsheet.</p>
          </div>
          <div className="heroCard">
            <strong>{stats.active}</strong>
            <span>Active applications</span>
          </div>
        </section>
      </header>

      <main>
        <section className="statsGrid">
          <StatCard icon={<Briefcase />} label="Total Applications" value={stats.total}/>
          <StatCard icon={<CalendarCheck />} label="Interviews" value={stats.interviews}/>
          <StatCard icon={<CheckCircle />} label="Offers" value={stats.offers}/>
          <StatCard icon={<Clock />} label="Rejected" value={stats.rejected}/>
        </section>

        <section className="dashboardGrid">
          <div className="panel wide">
            <h2>Add a new application</h2>
            <form onSubmit={addJob} className="jobForm">
              <input placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}/>
              <input placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}/>
              <input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}/>
              <input type="date" value={form.dateApplied} onChange={e => setForm({ ...form, dateApplied: e.target.value })}/>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>{statuses.map(s => <option key={s}>{s}</option>)}</select>
              <textarea placeholder="Notes or next steps" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}/>
              <button><Plus size={18}/> Add Application</button>
            </form>
          </div>

          <div className="panel chartPanel">
            <h2>Status Breakdown</h2>
            <Doughnut data={{ labels: statuses, datasets: [{ data: statusCounts }] }} />
          </div>
        </section>

        <section className="panel">
          <div className="sectionHeader">
            <div>
              <h2>Applications</h2>
              <p>Update each status as the process changes.</p>
            </div>
          </div>
          <div className="jobList">
            {jobs.map(job => (
              <article className="jobCard" key={job.id}>
                <div>
                  <h3>{job.company}</h3>
                  <p>{job.role} • {job.location || 'Remote / Not listed'}</p>
                  <small>Applied: {job.dateApplied}</small>
                  <p className="notes">{job.notes}</p>
                </div>
                <div className="jobActions">
                  <select value={job.status} onChange={e => updateStatus(job.id, e.target.value)}>{statuses.map(s => <option key={s}>{s}</option>)}</select>
                  <button className="danger" onClick={() => deleteJob(job.id)}><Trash2 size={16}/></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Applications by Status</h2>
          <Bar data={{ labels: statuses, datasets: [{ label: 'Applications', data: statusCounts }] }} />
        </section>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return <div className="statCard"><div className="icon">{icon}</div><div><strong>{value}</strong><span>{label}</span></div></div>;
}

createRoot(document.getElementById('root')).render(<App />);
