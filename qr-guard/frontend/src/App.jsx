import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components.jsx'
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<AppShell><DashboardPage /></AppShell>} />
        <Route path="/scanner" element={<AppShell><ScannerPage /></AppShell>} />
        <Route path="/scan-result" element={<AppShell><ResultPage /></AppShell>} />
        <Route path="/history" element={<AppShell><HistoryPage /></AppShell>} />
        <Route path="/profile" element={<AppShell><ProfilePage /></AppShell>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
