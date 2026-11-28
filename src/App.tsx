import { useMemo, useState } from 'react';
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, BriefcaseBusiness,
  Check, CheckCheck, ChevronDown, ChevronRight, CircleHelp, Clock3, Command,
  FileText, LayoutDashboard, Menu, MessageSquareText, MoreHorizontal, Plus,
  Search, Settings2, ShieldCheck, Sparkles, Target, TrendingUp, Users, X,
} from 'lucide-react';

type Department = {
  name: string;
  short: string;
  color: string;
  icon: typeof BriefcaseBusiness;
  employees: number;
  tasks: number;
};
type Task = { id: number; title: string; department: string; person: string; initials: string; due: string; priority: 'High' | 'Normal'; status: 'In progress' | 'In review' | 'Queued' };
type Approval = { id: number; title: string; detail: string; type: string; department: string; initials: string; color: string };

const departments: Department[] = [
  { name: 'CEO & Executive Management', short: 'Executive', color: '#b8a2ff', icon: Sparkles, employees: 4, tasks: 8 },
  { name: 'Marketing Department', short: 'Marketing', color: '#f5a46f', icon: Target, employees: 5, tasks: 12 },
  { name: 'Communications Department', short: 'Communications', color: '#76cdb5', icon: MessageSquareText, employees: 4, tasks: 6 },
  { name: 'Sales Department', short: 'Sales', color: '#80a9ff', icon: TrendingUp, employees: 4, tasks: 9 },
  { name: 'Research Department', short: 'Research', color: '#e5c76f', icon: Search, employees: 4, tasks: 5 },
  { name: 'Technology Department', short: 'Technology', color: '#7ac4df', icon: Settings2, employees: 4, tasks: 7 },
  { name: 'Human Resources & Administration', short: 'People & Admin', color: '#e79bc3', icon: Users, employees: 3, tasks: 4 },
  { name: 'Finance & Payments Department', short: 'Finance', color: '#8ecb87', icon: ShieldCheck, employees: 4, tasks: 3 },
];

const initialTasks: Task[] = [
  { id: 1, title: 'Review Q4 go-to-market strategy', department: 'CEO & Executive Management', person: 'Maya Chen', initials: 'MC', due: 'Today, 2:30 PM', priority: 'High', status: 'In review' },
  { id: 2, title: 'Prepare launch campaign brief', department: 'Marketing Department', person: 'Jordan Lee', initials: 'JL', due: 'Today, 4:00 PM', priority: 'High', status: 'In progress' },
  { id: 3, title: 'Qualify 12 inbound product leads', department: 'Sales Department', person: 'Alex Morgan', initials: 'AM', due: 'Today, 5:00 PM', priority: 'Normal', status: 'In progress' },
  { id: 4, title: 'Summarize competitor pricing changes', department: 'Research Department', person: 'Sam Rivera', initials: 'SR', due: 'Tomorrow, 10:00 AM', priority: 'Normal', status: 'Queued' },
  { id: 5, title: 'Draft customer onboarding sequence', department: 'Communications Department', person: 'Avery Kim', initials: 'AK', due: 'Tomorrow, 11:30 AM', priority: 'Normal', status: 'In progress' },
];

const initialApprovals: Approval[] = [
  { id: 1, title: 'Launch awareness campaign', detail: 'Proposed budget: $1,200 · 14-day run', type: 'Ad spend', department: 'Marketing Department', initials: 'JL', color: '#f5a46f' },
  { id: 2, title: 'Send revised service agreement', detail: 'External agreement · Acme Studio', type: 'Legal review', department: 'Sales Department', initials: 'AM', color: '#80a9ff' },
  { id: 3, title: 'Publish product announcement', detail: 'LinkedIn · Scheduled for tomorrow', type: 'External post', department: 'Communications Department', initials: 'AK', color: '#76cdb5' },
];

function App() {
  const [activeDepartment, setActiveDepartment] = useState('CEO & Executive Management');
  const [tasks, setTasks] = useState(initialTasks);
  const [approvals, setApprovals] = useState(initialApprovals);
  const [query, setQuery] = useState('');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [toast, setToast] = useState('');
  const [mobileNav, setMobileNav] = useState(false);
  const [period, setPeriod] = useState('This week');

  const selected = departments.find((department) => department.name === activeDepartment) ?? departments[0];
  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const matchesDepartment = activeDepartment === 'CEO & Executive Management' || task.department === activeDepartment;
    return matchesDepartment && `${task.title} ${task.person} ${task.department}`.toLowerCase().includes(query.toLowerCase());
  }), [activeDepartment, query, tasks]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  }

  function decideApproval(id: number, decision: 'approved' | 'declined') {
    setApprovals((current) => current.filter((approval) => approval.id !== id));
    notify(`Request ${decision}. The team has been updated.`);
  }

  function createTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!taskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now(), title: taskTitle.trim(), department: activeDepartment, person: 'Unassigned', initials: '—',
      due: 'Not scheduled', priority: 'Normal', status: 'Queued',
    };
    setTasks((current) => [newTask, ...current]);
    setTaskTitle('');
    setShowTaskModal(false);
    notify('Task added to the department queue.');
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark"><Command size={19} strokeWidth={2.2} /></div>
          <span className="brand-name">workforce<span className="brand-period">.</span></span>
          <button className="icon-button mobile-close" aria-label="Close navigation" onClick={() => setMobileNav(false)}><X size={18} /></button>
        </div>
        <button className="workspace-switcher">
          <div className="workspace-logo">N</div>
          <span className="workspace-copy"><strong>Northstar Studio</strong><small>Business workspace</small></span>
          <ChevronDown size={15} className="muted-icon" />
        </button>
        <div className="nav-caption">WORKSPACE</div>
        <nav className="main-nav">
          <button className={`nav-link ${activeDepartment === 'CEO & Executive Management' ? 'nav-active' : ''}`} onClick={() => { setActiveDepartment('CEO & Executive Management'); setMobileNav(false); }}>
            <LayoutDashboard size={17} /><span>Executive overview</span><span className="nav-count">⌘ 1</span>
          </button>
          <div className="nav-caption department-caption">DEPARTMENTS <button title="Department options"><MoreHorizontal size={17} /></button></div>
          {departments.map((department, index) => {
            const Icon = department.icon;
            const isActive = activeDepartment === department.name && department.name !== 'CEO & Executive Management';
            return <button key={department.name} className={`nav-link dept-link ${isActive ? 'nav-active' : ''}`} onClick={() => { setActiveDepartment(department.name); setMobileNav(false); }}>
              <span className="department-dot" style={{ backgroundColor: department.color }}><Icon size={13} /></span>
              <span>{department.short}</span>{index === 7 && <span className="phase-tag">LATER</span>}
            </button>;
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="usage-card"><div className="usage-top"><span>AI workforce</span><span>28 / 32</span></div><div className="usage-track"><span /></div><small>28 employees active across 8 departments</small></div>
          <button className="nav-link utility-link" onClick={() => notify('Help center is coming soon.')}><CircleHelp size={17} /><span>Help & support</span></button>
          <button className="profile-row" onClick={() => notify('Account menu opened.')}><div className="profile-avatar">BS</div><span className="profile-copy"><strong>Bunson Studio</strong><small>Owner account</small></span><MoreHorizontal size={18} className="muted-icon" /></button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Menu size={19} /></button>
          <div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14} /><strong>{selected.short}</strong></div>
          <div className="topbar-actions">
            <label className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search anything..." /><kbd>⌘ K</kbd></label>
            <button className="icon-button notification-button" aria-label="Notifications" onClick={() => notify('You’re all caught up.')}><Bell size={18} /><i /></button>
            <div className="top-avatar">BS</div>
          </div>
        </header>

        <div className="page-wrap">
          <section className="welcome-row">
            <div><div className="eyebrow"><span className="live-dot" /> COMPANY STATUS <span className="eyebrow-divider">·</span> ALL SYSTEMS OPERATIONAL</div><h1>{activeDepartment === 'CEO & Executive Management' ? 'Good morning, Bunson' : selected.name}<span className="wave">{activeDepartment === 'CEO & Executive Management' ? ' ✳' : ''}</span></h1><p className="welcome-subtitle">{activeDepartment === 'CEO & Executive Management' ? 'Here’s what’s happening across your company today.' : `Your ${selected.short.toLowerCase()} team at a glance.`}</p></div>
            <div className="welcome-actions"><button className="button button-secondary" onClick={() => notify('Company report is being prepared.')}><FileText size={16} /> View report</button><button className="button button-primary" onClick={() => setShowTaskModal(true)}><Plus size={17} /> Create a task</button></div>
          </section>

          <section className="stat-grid" aria-label="Company metrics">
            <article className="stat-card"><div className="stat-head"><span>Active employees</span><span className="stat-icon violet"><Users size={16} /></span></div><div className="stat-value">28 <span className="stat-total">/ 32</span></div><div className="stat-foot"><span className="trend-positive"><ArrowUpRight size={14} /> 4 new</span><span>across 8 departments</span></div><div className="mini-bars" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
            <article className="stat-card"><div className="stat-head"><span>Tasks completed</span><span className="stat-icon green"><CheckCheck size={16} /></span></div><div className="stat-value">86 <span className="stat-unit">this week</span></div><div className="stat-foot"><span className="trend-positive"><ArrowUpRight size={14} /> 12.8%</span><span>vs. last week</span></div><div className="sparkline green-spark"><svg viewBox="0 0 170 34" preserveAspectRatio="none"><path d="M0 27 C16 22 17 26 29 20 S48 24 61 15 79 21 92 12 111 19 123 10 144 15 158 6 164 8 170 3" /></svg></div></article>
            <article className="stat-card"><div className="stat-head"><span>Pending approvals</span><span className="stat-icon amber"><Clock3 size={16} /></span></div><div className="stat-value">{approvals.length.toString().padStart(2, '0')} <span className="stat-unit">need your review</span></div><div className="stat-foot"><span className="pending-label"><span /> Requires your attention</span></div><div className="approval-dots"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
            <article className="stat-card"><div className="stat-head"><span>Company performance</span><span className="stat-icon blue"><Activity size={16} /></span></div><div className="stat-value">94<span className="stat-unit">/ 100</span></div><div className="stat-foot"><span className="trend-positive"><ArrowUpRight size={14} /> 6.2%</span><span>healthy company score</span></div><div className="performance-line"><span /></div></article>
          </section>

          <section className="middle-grid">
            <article className="panel task-panel">
              <div className="panel-heading"><div><div className="panel-title-row"><h2>{activeDepartment === 'CEO & Executive Management' ? 'Priority tasks' : `${selected.short} tasks`}</h2><span className="subtle-count">{visibleTasks.length}</span></div><p>Keep an eye on what’s moving forward</p></div><button className="text-button" onClick={() => notify('Showing all tasks in this workspace.')}>All tasks <ArrowRight size={15} /></button></div>
              <div className="task-table"><div className="task-head"><span>TASK</span><span>ASSIGNEE</span><span>DUE DATE</span><span>STATUS</span></div>
                {visibleTasks.length ? visibleTasks.slice(0, 5).map((task) => <div className="task-row" key={task.id}><div className="task-title-cell"><span className={`task-check ${task.status === 'In review' ? 'task-check-review' : ''}`}>{task.status === 'In review' ? <Clock3 size={12} /> : null}</span><div><strong>{task.title}</strong><small>{departments.find((department) => department.name === task.department)?.short ?? task.department}</small></div></div><div className="assignee"><span className="person-avatar">{task.initials}</span><span>{task.person}</span></div><div className="due-date"><span>{task.due}</span>{task.priority === 'High' && <i className="priority-dot" title="High priority" />}</div><div><span className={`status-pill status-${task.status.toLowerCase().replace(' ', '-')}`}><i />{task.status}</span></div></div>) : <div className="empty-state">No tasks match your search. Try another term.</div>}
              </div>
              <button className="table-footer" onClick={() => setShowTaskModal(true)}>+ Add a task to {selected.short}</button>
            </article>

            <article className="panel approvals-panel"><div className="panel-heading"><div><div className="panel-title-row"><h2>Needs your approval</h2>{approvals.length > 0 && <span className="approval-badge">{approvals.length}</span>}</div><p>Actions waiting for your go-ahead</p></div><button className="icon-button more-button" aria-label="More approval options" onClick={() => notify('Approval settings opened.')}><MoreHorizontal size={18} /></button></div>
              {approvals.length ? <div className="approval-list">{approvals.map((approval) => <div className="approval-item" key={approval.id}><div className="approval-person" style={{ background: `${approval.color}22`, color: approval.color }}>{approval.initials}</div><div className="approval-info"><strong>{approval.title}</strong><span>{approval.detail}</span><div className="approval-meta"><span>{approval.type}</span><i />{departments.find((department) => department.name === approval.department)?.short}</div><div className="approval-actions"><button className="approve-button" onClick={() => decideApproval(approval.id, 'approved')}><Check size={14} /> Approve</button><button className="decline-button" onClick={() => decideApproval(approval.id, 'declined')}>Decline</button></div></div></div>)}</div> : <div className="empty-approvals"><span><CheckCheck size={21}/></span><strong>All caught up</strong><small>No requests need your attention right now.</small></div>}
              <button className="approval-footer" onClick={() => notify('Opening your approval history.')}>View approval history <ArrowRight size={14} /></button>
            </article>
          </section>

          <section className="bottom-grid">
            <article className="panel departments-panel"><div className="panel-heading"><div><h2>Department pulse</h2><p>A quick look at team activity</p></div><button className="select-button" onClick={() => setPeriod(period === 'This week' ? 'Today' : 'This week')}>{period}<ChevronDown size={14} /></button></div><div className="department-pulse-grid">{departments.slice(0, 6).map((department, index) => {const Icon = department.icon; const percent = [78, 64, 86, 59, 72, 48][index]; return <button className="pulse-card" key={department.name} onClick={() => setActiveDepartment(department.name)}><div className="pulse-top"><span className="pulse-icon" style={{ color: department.color, background: `${department.color}19` }}><Icon size={16}/></span><span className="pulse-menu"><MoreHorizontal size={16}/></span></div><strong>{department.short}</strong><span className="pulse-meta">{department.employees} employees <i/> {department.tasks} tasks</span><div className="pulse-progress"><span style={{ width: `${percent}%`, background: department.color }}/></div><small>{percent}% capacity <span>{percent > 65 ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}</span></small></button>})}</div></article>
            <article className="panel activity-panel"><div className="panel-heading"><div><h2>Company activity</h2><p>Latest updates from your team</p></div><button className="text-button" onClick={() => notify('Showing the complete activity log.')}>View all <ArrowRight size={15}/></button></div><div className="activity-list"><div className="activity-item"><span className="activity-icon activity-green"><Check size={14}/></span><div><p><strong>Maya Chen</strong> completed <b>Weekly business review</b></p><small>Executive · 12 minutes ago</small></div></div><div className="activity-item"><span className="activity-icon activity-orange"><Target size={14}/></span><div><p><strong>Jordan Lee</strong> submitted an ad campaign for approval</p><small>Marketing · 38 minutes ago</small></div></div><div className="activity-item"><span className="activity-icon activity-blue"><MessageSquareText size={14}/></span><div><p><strong>Avery Kim</strong> drafted 3 customer replies</p><small>Communications · 1 hour ago</small></div></div><div className="activity-item"><span className="activity-icon activity-violet"><TrendingUp size={14}/></span><div><p><strong>Alex Morgan</strong> qualified 4 new prospects</p><small>Sales · 2 hours ago</small></div></div></div><button className="activity-footer" onClick={() => notify('Opening team messages.')}> <MessageSquareText size={15}/> Go to team inbox <ArrowRight size={14}/></button></article>
          </section>
          <footer className="page-footer"><span>Workforce <i>·</i> Your company, working together.</span><span><span className="footer-status"/> All systems operational <i>·</i> Last synced just now</span></footer>
        </div>
      </main>

      {showTaskModal && <div className="modal-backdrop" onClick={(event) => { if (event.target === event.currentTarget) setShowTaskModal(false); }}><form className="task-modal" onSubmit={createTask}><div className="modal-top"><div><span className="modal-icon"><Plus size={18}/></span><h2>Create a task</h2><p>Add work to a department queue.</p></div><button type="button" className="icon-button" aria-label="Close" onClick={() => setShowTaskModal(false)}><X size={18}/></button></div><label className="field-label" htmlFor="task-title">Task title</label><input id="task-title" className="modal-input" autoFocus placeholder="What needs to get done?" value={taskTitle} onChange={(event) => setTaskTitle(event.target.value)} required/><label className="field-label" htmlFor="task-department">Department</label><select id="task-department" className="modal-input" value={activeDepartment} onChange={(event) => setActiveDepartment(event.target.value)}>{departments.map((department) => <option key={department.name}>{department.name}</option>)}</select><div className="modal-hint"><ShieldCheck size={15}/> Tasks are queued for review and assignment.</div><div className="modal-actions"><button type="button" className="button button-secondary" onClick={() => setShowTaskModal(false)}>Cancel</button><button className="button button-primary" type="submit"><Plus size={16}/> Create task</button></div></form></div>}
      {toast && <div className="toast"><CheckCheck size={17}/>{toast}</div>}
    </div>
  );
}

export default App;
