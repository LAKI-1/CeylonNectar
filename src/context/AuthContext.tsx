import React, { createContext, useState, useContext, useEffect } from 'react';

type UserRole = 'consumer' | 'vendor';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isVendor: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    // Check for user in local storage on component mount
    const storedUser = localStorage.getItem('ceylon_nectar_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock authentication logic - in a real app this would use an API
    if (email && password) {
      const mockUser = {
        id: `user-${Math.floor(Math.random() * 10000)}`,
        name: email.split('@')[0],
        email,
        role,
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('ceylon_nectar_user', JSON.stringify(mockUser));
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    // Mock signup logic - in a real app this would use an API
    if (name && email && password) {
      const mockUser = {
        id: `user-${Math.floor(Math.random() * 10000)}`,
        name,
        email,
        role,
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('ceylon_nectar_user', JSON.stringify(mockUser));
    } else {
      throw new Error("Please fill all fields");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('ceylon_nectar_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isVendor: user?.role === 'vendor',
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;