export interface User {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

const USERS_KEY = 'exam_simulator_users';
const CURRENT_USER_KEY = 'exam_simulator_current_user';

const getUsers = (): Record<string, User & { password: string }> => {
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : {};
};

const saveUsers = (users: Record<string, User & { password: string }>) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const authService = {
  register: (email: string, password: string, fullName: string): AuthResponse => {
    const users = getUsers();

    if (users[email]) {
      return { success: false, error: 'User already exists' };
    }

    const user: User = {
      id: crypto.randomUUID(),
      email,
      fullName,
      createdAt: new Date().toISOString(),
    };

    users[email] = { ...user, password };
    saveUsers(users);

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return { success: true, user };
  },

  login: (email: string, password: string): AuthResponse => {
    const users = getUsers();
    const userWithPassword = users[email];

    if (!userWithPassword) {
      return { success: false, error: 'User not found' };
    }

    if (userWithPassword.password !== password) {
      return { success: false, error: 'Invalid password' };
    }

    const { password: _, ...user } = userWithPassword;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return { success: true, user };
  },

  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem(CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(CURRENT_USER_KEY);
  },
};
