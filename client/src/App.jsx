import { Routes, Route } from 'react-router-dom'
import './App.css'

import Login from './components/login'
import Dashboard from './components/dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App