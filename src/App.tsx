import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import ResultsPage from './pages/ResultsPage'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/results/:id" element={<ResultsPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
