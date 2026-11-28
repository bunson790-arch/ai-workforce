import { useState } from 'react';
import {
  ArrowRight, BriefcaseBusiness, ChevronRight, Crown, Mail, Megaphone,
  Menu, Search, Settings, ShieldCheck, Users, WalletCards, X,
} from 'lucide-react';

type Department = {
  name: string;
  shortName: string;
  icon: typeof Crown;
  accent: string;
  glow: string;
};

const departments: Department[] = [
  { name: 'CEO & Executive Management', shortName: 'CEO & Executive', icon: Crown, accent: '#318cff', glow: '#236dd0' },
  { name: 'Marketing Department', shortName: 'Marketing', icon: Megaphone, accent: '#31cfa4', glow: '#168864' },
  { name: 'Communications Department', shortName: 'Communications', icon: Mail, accent: '#b55dff', glow: '#7840ac' },
  { name: 'Sales Department', shortName: 'Sales', icon: BriefcaseBusiness, accent: '#ff8d36', glow: '#bb5c1d' },
  { name: 'Research Department', shortName: 'Research', icon: Search, accent: '#45cbed', glow: '#2286a2' },
  { name: 'Technology Department', shortName: 'Technology', icon: Settings, accent: '#8c78ff', glow: '#5d4bc1' },
  { name: 'Human Resources & Administration', shortName: 'Human Resources', icon: Users, accent: '#84cd43', glow: '#4f8227' },
  { name: 'Finance & Payments Department', shortName: 'Finance & Payments', icon: WalletCards, accent: '#5e91ff', glow: '#3f62a9' },
];

function App() {
  const [activeDepartment, setActiveDepartment] = useState(departments[0]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const leftDepartments = departments.filter((_, index) => index === 0 || index === 1 || index === 2 || index === 3);
  const rightDepartments = departments.filter((_, index) => index === 4 || index === 5 || index === 6 || index === 7);

  return (
    <main className="company-screen">
      <div className="background-grid" aria-hidden="true" />
      <header className="company-header">
        <button className="mobile-trigger" aria-label="Open navigation" onClick={() => setMobileMenu(true)}>
          <Menu size={19} />
        </button>
        <div className="company-brand">
          <div className="brand-orb"><BriefcaseBusiness size={18} /></div>
          <div>
            <strong>Workforce</strong>
            <span>AI Company</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="search-trigger" aria-label="Search"><Search size={17} /><span>Search</span></button>
          <button className="notification-trigger" aria-label="Notifications" onClick={() => setNotificationOpen((open) => !open)}> <span className="notification-dot" /><ShieldCheck size={17} /></button>
          <div className="owner-avatar">BS</div>
        </div>
        {notificationOpen && <div className="notification-card"><strong>Company status</strong><span>All systems operational</span></div>}
      </header>

      <section className="company-map" aria-label="AI company department map">
        <div className="map-heading">
          <span>AI Workforce</span>
          <h1>Company Departments</h1>
          <p>Select a department to open its workspace</p>
        </div>

        <div className="department-layout">
          <div className="department-column department-column-left">
            {leftDepartments.map((department, index) => {
              const Icon = department.icon;
              return (
                <button
                  className={`department-card ${activeDepartment.name === department.name ? 'department-card-active' : ''}`}
                  style={{ '--accent': department.accent, '--glow': department.glow, '--delay': `${index * 80}ms` } as React.CSSProperties}
                  key={department.name}
                  onClick={() => setActiveDepartment(department)}
                >
                  <span className="department-icon"><Icon size={26} strokeWidth={2.2} /></span>
                  <span className="department-title"><strong>{department.shortName}</strong>{department.name !== department.shortName && <small>{department.name.split(' Department')[0] === 'CEO & Executive' ? 'Management' : 'Department'}</small>}</span>
                  <ChevronRight className="department-arrow" size={23} />
                </button>
              );
            })}
          </div>

          <div className="core-zone">
            <svg className="network-lines network-lines-left" viewBox="0 0 260 520" preserveAspectRatio="none" aria-hidden="true">
              <path d="M260 258 C170 258 207 70 0 70" /><path d="M260 258 C155 258 210 190 0 190" /><path d="M260 258 C145 258 210 315 0 315" /><path d="M260 258 C170 258 207 448 0 448" />
            </svg>
            <div className="core-orbit core-orbit-one" />
            <div className="core-orbit core-orbit-two" />
            <button className="core-button" onClick={() => setActiveDepartment(departments[0])} aria-label="Open CEO and Executive Management">
              <span className="core-logo"><span /><span /><span /></span>
              <strong>AI Company</strong>
              <strong>Core</strong>
            </button>
            <svg className="network-lines network-lines-right" viewBox="0 0 260 520" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 258 C90 258 50 70 260 70" /><path d="M0 258 C105 258 50 190 260 190" /><path d="M0 258 C115 258 50 315 260 315" /><path d="M0 258 C90 258 50 448 260 448" />
            </svg>
          </div>

          <div className="department-column department-column-right">
            {rightDepartments.map((department, index) => {
              const Icon = department.icon;
              return (
                <button
                  className={`department-card ${activeDepartment.name === department.name ? 'department-card-active' : ''}`}
                  style={{ '--accent': department.accent, '--glow': department.glow, '--delay': `${(index + 4) * 80}ms` } as React.CSSProperties}
                  key={department.name}
                  onClick={() => setActiveDepartment(department)}
                >
                  <span className="department-icon"><Icon size={26} strokeWidth={2.2} /></span>
                  <span className="department-title"><strong>{department.shortName}</strong>{department.shortName !== 'Research' && department.shortName !== 'Technology' && <small>Department</small>}</span>
                  <ChevronRight className="department-arrow" size={23} />
                </button>
              );
            })}
          </div>
        </div>

        <button className="active-department-bar" onClick={() => setNotificationOpen(true)}>
          <span className="active-status" style={{ background: activeDepartment.accent }} />
          <span><small>Selected department</small><strong>{activeDepartment.name}</strong></span>
          <span className="open-label">Open workspace <ArrowRight size={15} /></span>
        </button>
      </section>

      {mobileMenu && <div className="mobile-backdrop" onClick={() => setMobileMenu(false)}><aside className="mobile-panel" onClick={(event) => event.stopPropagation()}><div className="mobile-panel-head"><strong>Departments</strong><button onClick={() => setMobileMenu(false)} aria-label="Close navigation"><X size={18}/></button></div>{departments.map((department) => {const Icon = department.icon; return <button key={department.name} onClick={() => {setActiveDepartment(department); setMobileMenu(false);}}><span style={{ color: department.accent }}><Icon size={18}/></span><span>{department.name}</span><ChevronRight size={16}/></button>})}</aside></div>}
    </main>
  );
}

export default App;
