import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import HireMe from './pages/HireMe';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import RequestDetails from './pages/RequestDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-darkBg text-slate-900 dark:text-slate-100">
            {/* Scroll Telemetry Progress Bar */}
            <ScrollProgress />
            
            {/* Navigation Bar */}
            <Navbar />

            {/* Main Content Router */}
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/hire-me" element={<HireMe />} />
                
                {/* Admin Portals */}
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/request/:id" 
                  element={
                    <ProtectedRoute>
                      <RequestDetails />
                    </ProtectedRoute>
                  } 
                />

                {/* 404 Fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Footer Panel */}
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
