import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import {
  AboutPage,
  DashboardPage,
  HistoryPage,
  LandingPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ResultPage,
  ScannerPage,
} from './pages.jsx'

function ProtectedRoute({ children }) {
  const { token, loading } = useAuth()

  if (loading) {
    return <div className="auth-page cyber-grid"><main className="auth-layout page-width"><section className="auth-panel animate-rise"><p className="eyebrow">AUTHENTICATION</p><h1>Checking your session…</h1></section></main></div>
  }

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

function PublicOnlyRoute({ children }) {
  const { token, loading } = useAuth()

  if (loading) {
    return <div className="auth-page cyber-grid"><main className="auth-layout page-width"><section className="auth-panel animate-rise"><p className="eyebrow">AUTHENTICATION</p><h1>Preparing your workspace…</h1></section></main></div>
  }

  if (token) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
      <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><AppShell><DashboardPage /></AppShell></ProtectedRoute>} />
      <Route path="/scanner" element={<ProtectedRoute><AppShell><ScannerPage /></AppShell></ProtectedRoute>} />
      <Route path="/scan-result" element={<ProtectedRoute><AppShell><ResultPage /></AppShell></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><AppShell><HistoryPage /></AppShell></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><AppShell><ProfilePage /></AppShell></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
