export const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token'); 
      const user = localStorage.getItem('user')
      return token && user;
    }
    return false;
  };