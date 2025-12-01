import React, { useState, useEffect, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Editor from './pages/Editor';
import Settings from './pages/Settings';
import { User, AuthState } from './types';

// 1. Create the Context
export const AuthContext = React.createContext<AuthState>({
    user: null, 
    login: () => {}, 
    logout: () => {}
});

// 2. Create the Logic Hook (Internal use only)
const useAuthSource = () => {
    const [user, setUser] = useState<User | null>(null);

    // Persist login state in session storage for refresh
    useEffect(() => {
        const storedUser = sessionStorage.getItem('samiullah_blog_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (username: string) => {
        const newUser = { username, isAuthenticated: true };
        setUser(newUser);
        sessionStorage.setItem('samiullah_blog_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('samiullah_blog_user');
    };

    return { user, login, logout };
};

// 3. Export the Consumer Hook (For components to use)
export const useAuth = () => {
    return useContext(AuthContext);
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    const { user } = useAuth();
    
    if (!user || !user.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const App: React.FC = () => {
  // Initialize the auth state once at the top level
  const auth = useAuthSource();

  return (
    <HelmetProvider>
        <AuthContext.Provider value={auth}>
            <HashRouter>
                <Layout user={auth.user} onLogout={auth.logout}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/post/:id" element={<PostDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={
                        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
                            <h1 className="text-3xl font-bold text-white mb-4">About Me</h1>
                            <p className="text-slate-400 leading-relaxed">
                                I am Samiullah, an SDET specializing in building robust test automation frameworks using Playwright and TypeScript.
                                This blog serves as a knowledge base for advanced testing concepts, CI/CD integrations, and JavaScript best practices.
                            </p>
                        </div>
                    } />
                    
                    {/* Protected Admin Routes */}
                    <Route path="/admin" element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    } />
                    <Route path="/editor" element={
                        <ProtectedRoute>
                            <Editor />
                        </ProtectedRoute>
                    } />
                    <Route path="/editor/:id" element={
                        <ProtectedRoute>
                            <Editor />
                        </ProtectedRoute>
                    } />
                </Routes>
                </Layout>
            </HashRouter>
        </AuthContext.Provider>
    </HelmetProvider>
  );
};

export default App;