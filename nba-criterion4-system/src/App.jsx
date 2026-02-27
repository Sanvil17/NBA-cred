import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/auth/LoginPage';
import StudentDashboard from './pages/student/StudentDashboard';
import AchievementUpload from './pages/student/AchievementUpload';
import MyAchievements from './pages/student/MyAchievements';
import AdminDashboard from './pages/admin/AdminDashboard';
import VerificationQueue from './pages/admin/VerificationQueue';
import AnalyticsDashboard from './pages/admin/AnalyticsDashboard';
import SARExport from './pages/admin/SARExport';
import StudentDirectory from './pages/admin/StudentDirectory';

function ProtectedRoute({ children, allowedRoles }) {
    const { currentUser, isAuthenticated } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
        return <Navigate to={currentUser.role === 'STUDENT' ? '/student' : '/admin'} replace />;
    }
    return children;
}

function AppRoutes() {
    const { isAuthenticated, currentUser } = useAuth();

    return (
        <Routes>
            <Route
                path="/login"
                element={isAuthenticated
                    ? <Navigate to={currentUser.role === 'STUDENT' ? '/student' : '/admin'} replace />
                    : <LoginPage />}
            />

            {/* Student Routes */}
            <Route
                path="/student"
                element={
                    <ProtectedRoute allowedRoles={['STUDENT']}>
                        <AppLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<StudentDashboard />} />
                <Route path="upload" element={<AchievementUpload />} />
                <Route path="achievements" element={<MyAchievements />} />
            </Route>

            {/* Admin Routes */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'HOD']}>
                        <AppLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<AdminDashboard />} />
                <Route path="verify" element={<VerificationQueue />} />
                <Route path="analytics" element={<AnalyticsDashboard />} />
                <Route path="sar-export" element={<SARExport />} />
                <Route path="students" element={<StudentDirectory />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}
