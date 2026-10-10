import {
  Activity, ArrowRight, ArrowUpRight, CircleHelp, Clock3, History, Info,
  LayoutDashboard, LockKeyhole, ScanLine, ShieldCheck, UserRound,
} from 'lucide-react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'

const appLinks = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/scanner', label: 'QR scanner', icon: ScanLine },
  { to: '/history', label: 'Scan history', icon: History },
  { to: '/profile', label: 'Profile', icon: UserRound },
  { to: '/about', label: 'About QR Guard', icon: Info },
]

export function Brand({ compact = false }) {
  return <Link to="/" className="brand-lockup" aria-label="QR Guard home"><span className="brand-mark"><ShieldCheck size={20} /></span>{!compact && <span className="brand-name">QR <span>GUARD</span></span>}</Link>
}

export function PublicNavigation() {
  return <header className="public-nav"><div className="page-width nav-inner"><Brand /><nav aria-label="Main navigation"><Link className="nav-public-link nav-about" to="/about">About</Link><Link className="nav-public-link" to="/login">Sign in</Link><Link className="button button-primary button-small" to="/register">Get started <ArrowUpRight size={14} /></Link></nav></div></header>
}

function AppNavLink({ item }) {
  const Icon = item.icon
  return <NavLink to={item.to} className={({ isActive }) => `app-nav-link${isActive ? ' is-active' : ''}`}><Icon size={17} /><span>{item.label}</span></NavLink>
}

export function AppShell({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const currentLink = appLinks.find((item) => item.to === location.pathname)

  const initials = user?.username
    ? user.username
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('') || 'U'
    : 'U'

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-frame">
      <aside className="app-sidebar">
        <div className="sidebar-brand"><Brand /></div><p className="eyebrow sidebar-label">WORKSPACE</p>
        <nav className="sidebar-nav" aria-label="Workspace navigation">{appLinks.map((item) => <AppNavLink item={item} key={item.to} />)}</nav>
        <div className="sidebar-bottom"><div className="sidebar-note"><span className="signal-dot" /><span><strong>Authenticated</strong><small>{user?.email ?? 'Secure session'}</small></span></div><div className="sidebar-user"><span className="avatar">{initials}</span><span><strong>{user?.username ?? 'User'}</strong><small>{user ? 'Secure workspace' : 'Guest'}</small></span><Link to="/profile" className="icon-link" aria-label="Open profile"><UserRound size={16} /></Link></div></div>
      </aside>
      <div className="app-main">
        <header className="app-topbar"><div className="page-width topbar-inner"><div className="topbar-title"><span className="mobile-brand"><Brand compact /></span><span className="topbar-context"><i className="signal-dot" />{currentLink?.label ?? 'Workspace'}</span></div><div className="topbar-actions"><button type="button" className="button button-quiet button-small" onClick={handleLogout}>Logout</button><Link to="/profile" className="topbar-avatar" aria-label="Profile">{initials}</Link></div></div></header>
        <nav className="mobile-app-nav" aria-label="Workspace navigation">{appLinks.slice(0, 4).map((item) => <AppNavLink item={item} key={item.to} />)}</nav>
        <main className="page-width app-content">{children}</main>
        <footer className="page-width app-footer"><span>QR GUARD <i>/</i> SCAN SMART. STAY SAFE.</span><Link to="/about">About this demo <CircleHelp size={13} /></Link></footer>
      </div>
    </div>
  )
}

export function PageIntro({ eyebrow, title, description, action }) {
  return <div className="page-intro"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1>{description && <p className="page-description">{description}</p>}</div>{action && <div className="page-intro-action">{action}</div>}</div>
}

const statusClasses = { safe: 'status-safe', suspicious: 'status-suspicious', dangerous: 'status-dangerous' }
export function StatusBadge({ level }) { return <span className={`status-badge ${statusClasses[level.toLowerCase()] ?? ''}`}>{level}</span> }

export function MetricCard({ label, value, note, icon: Icon, tone }) {
  return <article className="metric-card"><div className="metric-head"><span>{label}</span><span className={`metric-icon ${tone}`}><Icon size={17} /></span></div><p className="metric-value">{value}</p><p className="metric-note"><Activity size={13} />{note}</p></article>
}

export function ScanTable({ scans }) {
  return <div className="table-scroll"><table className="scan-table"><thead><tr><th>Destination</th><th>Risk level</th><th>Score</th><th>Date scanned</th><th><span className="sr-only">View report</span></th></tr></thead><tbody>{scans.map((scan) => <tr key={scan.id}><td><Link className="scan-destination" to="/scan-result" state={{ scan }}><span className="scan-symbol"><Activity size={15} /></span><span><strong>{scan.site}</strong><small>{scan.domain}</small></span></Link></td><td><StatusBadge level={scan.level} /></td><td><span className="score-number">{scan.score}<small>/100</small></span></td><td><span className="scan-time"><Clock3 size={13} />{scan.scannedAt}</span></td><td><Link className="table-arrow" to="/scan-result" state={{ scan }} aria-label={`View ${scan.site} report`}><ArrowRight size={15} /></Link></td></tr>)}</tbody></table></div>
}