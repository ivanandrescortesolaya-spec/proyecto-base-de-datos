import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>SENA - Sistema de Matrícula</h1>
          <nav>
            <Link to="/">Inicio</Link>
            <Link to="/aprendices">Aprendices</Link>
            <Link to="/matriculas">Matrículas</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aprendices" element={<Aprendices />} />
            <Route path="/matriculas" element={<Matriculas />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div>
      <h2>Bienvenido al Sistema de Matrícula SENA</h2>
      <p>Selecciona una opción del menú para comenzar.</p>
    </div>
  )
}

function Aprendices() {
  return (
    <div>
      <h2>Gestión de Aprendices</h2>
      <p>Módulo en construcción...</p>
    </div>
  )
}

function Matriculas() {
  return (
    <div>
      <h2>Gestión de Matrículas</h2>
      <p>Módulo en construcción...</p>
    </div>
  )
}

export default App
