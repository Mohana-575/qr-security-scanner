import { useEffect, useRef, useState } from 'react'
import {
  Activity, ArrowDownLeft, ArrowRight, ArrowUpRight, BadgeCheck, Check, CheckCircle2,
  CircleAlert, Clock3, FileImage, Fingerprint, Globe2, KeyRound, LockKeyhole, Mail,
  QrCode, ScanLine, SearchCheck, ShieldAlert, ShieldCheck, ShieldX, Sparkles, Upload,
  UserRound, X,
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Brand, MetricCard, PageIntro, PublicNavigation, ScanTable, StatusBadge } from './components.jsx'
import { useAuth } from './context/AuthContext.jsx'
import { dashboardTotals, featuredScan, sampleScans } from './mockData.js'

function PublicFooter() {
  return <footer className="public-footer"><div className="page-width footer-inner"><Brand /><p>Scan Smart. Stay Safe. <span>© 2026 QR Guard</span></p><div><Link to="/about">About</Link><Link to="/login">Sign in</Link></div></div></footer>
}

export function LandingPage() {
  return <div className="public-page"><PublicNavigation /><main>
    <section className="hero-section cyber-grid"><div className="page-width hero-layout"><div className="hero-copy animate-rise"><p className="eyebrow hero-eyebrow"><i className="signal-dot" /> QR DESTINATION INTELLIGENCE</p><h1>Scan Smart.<br /><span>Stay Safe.</span></h1><p className="hero-description">A QR code is a link you can’t see. Reveal where it leads before you tap, with clear signals that help you decide what’s safe.</p><div className="button-row"><Link className="button button-primary" to="/scanner">Analyze a QR code <ArrowRight size={16} /></Link><Link className="button button-quiet" to="/dashboard">Explore the demo <ArrowUpRight size={15} /></Link></div><div className="hero-proof"><span><Check size={14} />No links opened automatically</span><span><Check size={14} />Clear, explainable signals</span></div></div>
      <div className="hero-visual animate-rise delay-1"><div className="hero-visual-top"><span className="eyebrow">LIVE PREVIEW <i className="pulse-dot" /></span><span className="mono-label">REPORT / 01</span></div><div className="preview-qr-block"><div className="qr-tile"><QrCode size={74} strokeWidth={1.2} /></div><span className="preview-scan-line" /><i className="corner corner-tl" /><i className="corner corner-tr" /><i className="corner corner-bl" /><i className="corner corner-br" /></div><div className="preview-divider" /><div className="preview-destination"><div><p className="eyebrow">DESTINATION CHECK</p><p className="preview-domain">secure-paypaI-check<span>.example</span></p><p className="preview-url">http://secure-paypaI-check.example/...</p></div><span className="preview-score"><strong>94</strong><small>RISK</small></span></div><div className="preview-result"><StatusBadge level="Dangerous" /><span><ShieldAlert size={14} />4 risk signals detected</span></div><p className="preview-note"><LockKeyhole size={12} /> Demo analysis · destination not opened</p></div></div><div className="page-width hero-bottom"><span>BUILT FOR THE MOMENT BEFORE YOU TAP</span><div><span>URL STRUCTURE</span><i /><span>BRAND SIGNALS</span><i /><span>RISK EXPLANATION</span></div></div></section>
    <section id="how-it-works" className="section-block page-width"><div className="section-heading-row"><div><p className="eyebrow">THREE STEPS. MORE CONTEXT.</p><h2>Make the invisible<br />destination visible.</h2></div><p className="section-intro">QR Guard gives you a useful pause between scanning a code and trusting what’s behind it.</p></div><div className="steps-grid"><article className="step-item"><span className="step-number">01 <ScanLine size={17} /></span><h3>Choose a QR image</h3><p>Upload a clear image of the code. Nothing is opened or executed during analysis.</p><Link to="/scanner">Try the scanner <ArrowRight size={14} /></Link></article><article className="step-item"><span className="step-number">02 <SearchCheck size={17} /></span><h3>Inspect the destination</h3><p>Review URL structure, connection security, brand clues, and other risk indicators.</p><span className="step-caption">URL-FIRST ANALYSIS</span></article><article className="step-item"><span className="step-number">03 <ShieldCheck size={17} /></span><h3>Decide with confidence</h3><p>See a clear risk level, the reasons behind it, and a practical next step.</p><span className="step-caption">EXPLAINABLE RESULTS</span></article></div></section>
    <section className="security-section"><div className="page-width security-layout"><div><p className="eyebrow">SAFETY IS THE DEFAULT</p><h2>Useful context.<br /><span>No risky shortcuts.</span></h2><p className="section-intro">The scan should inform you, not make a decision for you. QR Guard keeps the destination visible and the reasoning plain.</p><Link className="text-link" to="/about">Our approach <ArrowRight size={15} /></Link></div><div className="security-list"><article><span className="feature-icon"><Globe2 size={19} /></span><div><h3>URL inspection, not navigation</h3><p>Decoded destinations are treated as text. The app never visits them automatically.</p></div><CheckCircle2 /></article><article><span className="feature-icon"><Fingerprint size={19} /></span><div><h3>Brand impersonation clues</h3><p>Surface lookalike spelling and unusual host patterns for a closer look.</p></div><CheckCircle2 /></article><article><span className="feature-icon"><Activity size={19} /></span><div><h3>Risk score with reasons</h3><p>See which signals contribute to a result instead of an unexplained label.</p></div><CheckCircle2 /></article><article><span className="feature-icon"><LockKeyhole size={19} /></span><div><h3>Privacy-minded by design</h3><p>This frontend demo uses local sample data and sends no images or URLs to a server.</p></div><CheckCircle2 /></article></div></div></section>
    <section className="section-block page-width example-section"><div className="section-heading-row"><div><p className="eyebrow">A RESULT SHOULD EXPLAIN ITSELF</p><h2>See the signals.<br />Make your call.</h2></div><Link className="text-link" to="/scan-result" state={{ scan: featuredScan }}>Open sample report <ArrowUpRight size={15} /></Link></div><div className="example-report"><div className="example-score"><div className="score-gauge" style={{ '--score-angle': '292deg' }}><div><strong>94</strong><small>RISK SCORE</small></div></div><StatusBadge level="Dangerous" /><p>High confidence warning</p></div><div className="example-detail"><div className="example-url"><span className="eyebrow">DECODED DESTINATION</span><code>{featuredScan.url}</code></div><div className="example-findings"><p className="eyebrow">WHY THIS WAS FLAGGED</p>{featuredScan.indicators.slice(0, 3).map((item) => <div key={item.label}><CircleAlert size={15} /><span>{item.label}</span><small>HIGH</small></div>)}</div><p className="example-disclaimer"><LockKeyhole size={13} />Reserved example domain · illustrative result, not a live reputation check</p></div></div></section>
    <section className="page-width cta-section"><div><p className="eyebrow">TAKE A CLOSER LOOK</p><h2>Know where it leads<br />before you go.</h2></div><Link className="button button-primary" to="/scanner">Start with a QR image <ArrowRight size={16} /></Link><QrCode className="cta-mark" size={82} strokeWidth={1} /></section>
  </main><PublicFooter /></div>
}

function AuthPage({ register = false }) {
  const navigate = useNavigate()
  const { login, register: registerUser, token } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  useEffect(() => {
    if (token) {
      navigate('/dashboard', { replace: true })
    }
  }, [token, navigate])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function submit(event) {
    event.preventDefault()
    setError('')

    if (register) {
      if (!form.username.trim()) {
        setError('Username is required.')
        return
      }

      if (form.password.length < 12) {
        setError('Password must be at least 12 characters long.')
        return
      }

      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match.')
        return
      }
    }

    setBusy(true)

    try {
      if (register) {
        await registerUser({
          username: form.username.trim(),
          email: form.email.trim(),
          password: form.password,
        })
      } else {
        await login({
          email: form.email.trim(),
          password: form.password,
        })
      }

      navigate('/dashboard', { replace: true })
    } catch (requestError) {
      const detail = requestError.response?.data?.detail
      const message = detail || 'Unable to complete authentication. Please try again.'
      setError(message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-page cyber-grid">
      <header className="auth-header page-width">
        <Brand />
        <Link to="/" className="nav-public-link"><ArrowDownLeft size={15} />Back to home</Link>
      </header>
      <main className="auth-layout page-width">
        <section className="auth-panel animate-rise">
          <div className="auth-heading">
            <p className="eyebrow">{register ? 'START YOUR WORKSPACE' : 'YOUR QR GUARD WORKSPACE'}</p>
            <h1>{register ? 'Create your workspace' : 'Welcome back'}</h1>
            <p>{register ? 'A clearer view of every QR destination starts here.' : 'Sign in to review your scans and security signals.'}</p>
          </div>
          <form onSubmit={submit} className="auth-form">
            {register && (
              <label className="field-label">
                Username
                <span className="field-wrap">
                  <UserRound size={16} />
                  <input autoComplete="username" name="username" placeholder="jordan_works" value={form.username} onChange={handleChange} required />
                </span>
              </label>
            )}
            <label className="field-label">
              Email address
              <span className="field-wrap">
                <Mail size={16} />
                <input autoComplete="email" name="email" placeholder="you@example.com" type="email" value={form.email} onChange={handleChange} required />
              </span>
            </label>
            <label className="field-label">
              Password
              <span className="field-wrap">
                <KeyRound size={16} />
                <input
                  autoComplete={register ? 'new-password' : 'current-password'}
                  name="password"
                  placeholder={register ? 'At least 12 characters' : 'Enter your password'}
                  type={showPassword ? 'text' : 'password'}
                  minLength={12}
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button className="field-action" type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <X size={16} /> : <Sparkles size={16} />}
                </button>
              </span>
            </label>
            {register && (
              <label className="field-label">
                Confirm password
                <span className="field-wrap">
                  <KeyRound size={16} />
                  <input autoComplete="new-password" name="confirmPassword" placeholder="Repeat your password" type="password" minLength={12} value={form.confirmPassword} onChange={handleChange} required />
                </span>
              </label>
            )}
            {!register && (
              <div className="auth-form-extra">
                <label className="check-label"><input type="checkbox" />Keep me signed in</label>
                <button type="button" className="text-button">Forgot password?</button>
              </div>
            )}
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button button-primary" type="submit" disabled={busy}>
              {busy ? (register ? 'Creating account?' : 'Signing in?') : (register ? 'Create account' : 'Sign in to workspace')}
            </button>
          </form>
          <div className="auth-divider"><span>or continue with</span></div>
          <div className="auth-alternatives">
            <button type="button" className="button button-quiet auth-alternative"><Mail size={15} />Google</button>
            <button type="button" className="button button-quiet auth-alternative"><ShieldCheck size={15} />SSO</button>
          </div>
          <p className="auth-switch">{register ? 'Already have an account?' : 'Need an account?'} <Link to={register ? '/login' : '/register'}>{register ? 'Sign in' : 'Create one'}</Link></p>
        </section>
      </main>
    </div>
  )
}
export function LoginPage() { return <AuthPage /> }
export function RegisterPage() { return <AuthPage register /> }

export function DashboardPage() {
  const [range, setRange] = useState('7 days')
  const icons = { scans: QrCode, safe: ShieldCheck, suspicious: ShieldAlert, dangerous: ShieldX }
  return <><PageIntro eyebrow="MONITORING / OVERVIEW" title="Your scan overview" description="A clear view of the destinations you’ve checked." action={<label className="range-select"><span className="sr-only">Time range</span><select value={range} onChange={(event) => setRange(event.target.value)}><option>7 days</option><option>30 days</option><option>All time</option></select><Clock3 size={15} /></label>} /><div className="metric-grid">{dashboardTotals.map((item) => <MetricCard key={item.label} {...item} icon={icons[item.icon]} />)}</div><section className="table-panel"><div className="panel-heading"><div><p className="eyebrow">ACTIVITY</p><h2>Recent scans</h2></div><Link className="text-link" to="/history">View all <ArrowRight size={14} /></Link></div><ScanTable scans={sampleScans.slice(0, 3)} /><div className="panel-footnote"><span><i className="signal-dot" />Updated just now</span><span>Sample data · {range.toLowerCase()}</span></div></section><section className="dashboard-bottom"><div className="tip-panel"><span className="tip-icon"><Sparkles size={17} /></span><div><p className="eyebrow">A QUICK REMINDER</p><h3>A QR code is just a way to hide a link.</h3><p>Check the destination before sharing personal information or payment details.</p></div><Link to="/scanner" className="text-link">Scan a code <ArrowRight size={15} /></Link></div><div className="dashboard-note"><p className="eyebrow">DEMO WORKSPACE</p><p>Numbers and reports are sample data. Scans are not sent to a backend.</p></div></section></>
}

export function ScannerPage() {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  function acceptFile(candidate) {
    if (!candidate) return
    if (!candidate.type.startsWith('image/')) { setError('Choose an image file such as PNG, JPG, or WEBP.'); setFile(null); return }
    if (candidate.size > 10 * 1024 * 1024) { setError('This image is larger than 10 MB. Choose a smaller file.'); setFile(null); return }
    setError('')
    setFile(candidate)
    const reader = new FileReader()
    reader.addEventListener('load', () => setPreview(String(reader.result)))
    reader.readAsDataURL(candidate)
  }
  function dropFile(event) { event.preventDefault(); setDragging(false); acceptFile(event.dataTransfer.files?.[0]) }
  function previewScan() { if (file) navigate('/scan-result', { state: { scan: { ...featuredScan, scannedAt: 'Just now', fileName: file.name } } }) }
  return <><PageIntro eyebrow="ANALYSIS / NEW SCAN" title="Inspect a QR code" description="Choose an image to preview the scan workflow. This frontend demo does not decode or upload the file." action={<span className="local-chip"><LockKeyhole size={12} />LOCAL DEMO</span>} /><div className="scanner-layout"><section className={`upload-panel${dragging ? ' is-dragging' : ''}`} onDragOver={(event) => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={dropFile}><input ref={inputRef} className="sr-only" type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(event) => acceptFile(event.target.files?.[0])} aria-label="Choose QR image" />{file && preview ? <div className="upload-preview"><img src={preview} alt="Selected QR image preview" /><div className="preview-file"><FileImage size={19} /><span><strong>{file.name}</strong><small>{(file.size / 1024 / 1024).toFixed(2)} MB · ready to preview</small></span><button type="button" className="icon-link" onClick={() => setFile(null)} aria-label="Remove selected file"><X size={16} /></button></div></div> : <div className="upload-empty"><span className="upload-icon"><Upload size={23} /></span><h2>Drop your QR image here</h2><p>or select a file from your device</p><button type="button" className="button button-secondary" onClick={() => inputRef.current?.click()}>Browse files <ArrowUpRight size={15} /></button><span className="upload-spec">PNG, JPG, WEBP · MAX 10 MB</span></div>}{file && <button type="button" className="button button-secondary change-file" onClick={() => inputRef.current?.click()}>Choose a different image</button>}</section><aside className="scanner-aside"><div className="scanner-instructions"><p className="eyebrow">BEFORE YOU SCAN</p><h3>What happens to your image?</h3><ul><li><Check size={14} /><span>Selected locally in your browser</span></li><li><Check size={14} /><span>Not uploaded or stored by this demo</span></li><li><Check size={14} /><span>Decoded links are never opened automatically</span></li></ul></div><div className="scanner-tip"><ShieldCheck size={17} /><p>Use a clear, well-lit image with the complete QR code in frame.</p></div></aside></div>{error && <p className="form-error" role="alert"><CircleAlert size={15} />{error}</p>}<div className="scanner-actions"><p><LockKeyhole size={13} />Demo only — the scan button opens an illustrative sample report.</p><button type="button" className="button button-primary" disabled={!file} onClick={previewScan}>Preview scan result <ArrowRight size={16} /></button></div></>
}

export function ResultPage() {
  const location = useLocation()
  const scan = location.state?.scan ?? featuredScan
  const dangerous = scan.level === 'Dangerous'
  const safe = scan.level === 'Safe'
  const angle = `${Math.max(18, scan.score * 2.92)}deg`
  return <><PageIntro eyebrow={`REPORT / ${scan.id}`} title="Scan result" description={scan.fileName ? `Illustrative result for ${scan.fileName}.` : 'Review the destination and the signals behind this sample result.'} action={<Link className="button button-secondary button-small" to="/history">Scan history <ArrowUpRight size={14} /></Link>} /><section className={`result-hero ${dangerous ? 'result-danger' : safe ? 'result-safe' : 'result-warning'}`}><div className="result-score"><div className="score-gauge" style={{ '--score-angle': angle }}><div><strong>{scan.score}</strong><small>OUT OF 100</small></div></div><StatusBadge level={scan.level} /></div><div className="result-summary"><p className="eyebrow">RISK ASSESSMENT</p><h2>{dangerous ? 'Do not open this destination.' : safe ? 'No major warning signs found.' : 'Take a closer look before continuing.'}</h2><p>{scan.explanation}</p><span className="result-id"><i className="signal-dot" />{scan.id}<i />{scan.scannedAt}</span></div></section><div className="result-grid"><section className="report-panel"><div className="panel-heading"><div><p className="eyebrow">DECODED DESTINATION</p><h2>URL details</h2></div><Globe2 /></div><div className="url-block"><span className="url-protocol">{scan.url.startsWith('https:') ? 'HTTPS' : 'HTTP'}</span><code>{scan.url}</code></div><div className="domain-detail"><span>HOSTNAME</span><strong>{scan.domain}</strong></div><p className="no-navigation-note"><LockKeyhole size={14} />QR Guard displays this link as text; it has not been opened.</p></section><section className="report-panel"><div className="panel-heading"><div><p className="eyebrow">SIGNAL BREAKDOWN</p><h2>Security indicators</h2></div><span className="indicator-count">{scan.indicators.length} CHECKS</span></div><div className="indicator-list">{scan.indicators.map((item) => <div className="indicator-row" key={item.label}><span className={`indicator-state ${item.state}`}>{item.state === 'positive' ? <Check size={13} /> : item.state === 'negative' ? <X size={13} /> : <CircleAlert size={13} />}</span><span>{item.label}</span><small className={item.state}>{item.state === 'positive' ? 'PASS' : item.state === 'negative' ? 'FLAG' : 'REVIEW'}</small></div>)}</div></section><section className="report-panel explanation-panel"><div className="panel-heading"><div><p className="eyebrow">HOW TO READ THIS RESULT</p><h2>Explanation</h2></div><SearchCheck /></div><p>{scan.explanation}</p><div className="explanation-note"><Sparkles size={15} /><span>This score is a guide based on the signals shown. It is not a guarantee of safety or harm.</span></div></section><section className={`recommendation-panel ${dangerous ? 'recommendation-danger' : ''}`}><span className="recommendation-icon">{dangerous ? <ShieldAlert size={19} /> : <BadgeCheck size={19} />}</span><div><p className="eyebrow">RECOMMENDED NEXT STEP</p><h2>{dangerous ? 'Keep your information safe.' : 'Stay aware as you continue.'}</h2><p>{scan.recommendation}</p></div><Link to="/scanner" className="recommendation-link" aria-label="Scan another QR code"><ArrowRight size={18} /></Link></section></div><div className="result-bottom-actions"><Link className="text-link" to="/scanner"><ScanLine size={15} />Scan another QR code</Link><span>DEMO REPORT · NO LIVE THREAT INTELLIGENCE</span></div></>
}

export function HistoryPage() {
  const [filter, setFilter] = useState('All scans')
  const scans = filter === 'All scans' ? sampleScans : sampleScans.filter((item) => item.level === filter)
  return <><PageIntro eyebrow="MONITORING / HISTORY" title="Scan history" description="Review destinations analyzed in this demo workspace." action={<Link className="button button-primary button-small" to="/scanner"><ScanLine size={15} />New scan</Link>} /><section className="table-panel history-panel"><div className="history-controls"><div className="history-count"><strong>{scans.length}</strong><span>sample reports</span></div><label className="range-select"><span className="sr-only">Filter by result</span><select value={filter} onChange={(event) => setFilter(event.target.value)}><option>All scans</option><option>Safe</option><option>Suspicious</option><option>Dangerous</option></select><Activity size={15} /></label></div><ScanTable scans={scans} /><div className="panel-footnote"><span>Showing sample scan results</span><span>Nothing is stored on a server</span></div></section></>
}

export function ProfilePage() {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)

  function submit(event) {
    event.preventDefault()
    setSaved(true)
  }

  const initials = user?.username
    ? user.username
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('') || 'U'
    : 'U'

  return <><PageIntro eyebrow="WORKSPACE / PROFILE" title="Profile settings" description="Manage the details shown in your current secure workspace." /><div className="profile-layout"><section className="report-panel profile-panel"><div className="profile-person"><span className="profile-avatar">{initials}</span><div><h2>{user?.username ?? 'Secure user'}</h2><p>{user ? 'Authenticated workspace member' : 'Not signed in'}</p></div></div><form onSubmit={submit} className="profile-form"><div className="profile-form-grid"><label className="field-label">Username<span className="profile-input"><input defaultValue={user?.username ?? ''} name="username" /></span></label><label className="field-label">Email address<span className="profile-input"><input defaultValue={user?.email ?? ''} name="email" type="email" /></span></label><label className="field-label">Workspace<span className="profile-input"><input defaultValue="Personal workspace" name="workspace" /></span></label><label className="field-label">Time zone<span className="profile-input"><select defaultValue="UTC"><option>Pacific Time</option><option>Mountain Time</option><option>Central Time</option><option>Eastern Time</option><option>UTC</option></select></span></label></div><div className="profile-form-bottom"><p><LockKeyhole size={14} />Your profile is currently tied to your authenticated session.</p><button className="button button-primary button-small" type="submit">{saved ? <><Check size={15} />Saved</> : <>Save changes <ArrowRight size={15} /></>}</button></div></form></section><aside className="profile-side"><div className="profile-plan"><p className="eyebrow">CURRENT PLAN</p><div><Sparkles size={17} /><strong>Protected workspace</strong></div><p>Account details update from your secure backend session.</p><span><i className="signal-dot" />ACTIVE SESSION</span></div><div className="profile-security"><ShieldCheck size={18} /><p><strong>Privacy by default</strong><span>Your JWT is kept in local storage and sent only to the API on authenticated requests.</span></p></div></aside></div></>
}

export function AboutPage() {
  return <div className="public-page"><PublicNavigation /><main><section className="about-hero cyber-grid"><div className="page-width"><p className="eyebrow"><i className="signal-dot" />ABOUT QR GUARD</p><h1>Make the hidden<br /><span>destination visible.</span></h1><p>QR Guard is designed around a simple idea: you should be able to understand a link before deciding whether to trust it.</p><Link className="button button-primary" to="/scanner">Explore the scanner <ArrowRight size={16} /></Link></div></section><section className="page-width about-principles"><article><span>01 / CONTEXT</span><h2>Clarity before curiosity.</h2><p>QR codes make links convenient, but their destinations are hidden. We put the address and its characteristics in plain view.</p></article><article><span>02 / CONTROL</span><h2>You make the decision.</h2><p>Risk levels and indicators support your judgment. They are not promises that a destination is safe or malicious.</p></article><article><span>03 / CAUTION</span><h2>Inspect, never auto-open.</h2><p>A decoded URL is treated as data. QR Guard does not automatically visit or execute the destination.</p></article></section><section className="page-width about-demo"><div><p className="eyebrow">CURRENT BUILD</p><h2>Interface prototype</h2><p>This version runs on realistic mock data only. File selection stays in your browser; there is no API connection, QR decoding, account, or live threat-intelligence lookup yet.</p></div><span><Activity size={15} />FRONTEND ONLY</span></section></main><PublicFooter /></div>
}