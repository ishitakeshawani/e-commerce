export const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token'); 
      const user = localStorage.getItem('user')
      return token && user;
    }
    return false;
  };

export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user')
    return user;
  }
  return "";
}