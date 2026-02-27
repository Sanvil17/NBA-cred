import { createContext, useContext, useState, useCallback } from 'react';
import { users, getStudentByUserId } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = useCallback((email, password) => {
        setIsLoading(true);
        setError(null);

        // Simulate network delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = users.find(u => u.email === email && u.password === password);
                if (user) {
                    const studentProfile = user.role === 'STUDENT' ? getStudentByUserId(user.id) : null;
                    const session = { ...user, studentProfile };
                    setCurrentUser(session);
                    setIsLoading(false);
                    resolve(session);
                } else {
                    const err = 'Invalid email or password';
                    setError(err);
                    setIsLoading(false);
                    reject(err);
                }
            }, 600);
        });
    }, []);

    const logout = useCallback(() => {
        setCurrentUser(null);
        setError(null);
    }, []);

    const isStudent = currentUser?.role === 'STUDENT';
    const isAdmin = currentUser?.role === 'ADMIN' || currentUser?.role === 'HOD';

    return (
        <AuthContext.Provider value={{
            currentUser,
            isLoading,
            error,
            login,
            logout,
            isStudent,
            isAdmin,
            isAuthenticated: !!currentUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
