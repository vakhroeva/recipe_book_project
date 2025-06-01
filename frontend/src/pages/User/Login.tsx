import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
  
  const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      login: '',
      password: ''
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
  
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login/`, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Ошибка при авторизации');
          return;
        }

        const data = await response.json();
        login(data.token, data.user.id);
        const userId = data.user.id;
        
        navigate(`/recipe/user/${userId}`);

      } catch (err) {
        setError('Ошибка подключения к серверу');
      }
    };

      return (
        <div className="container mt-4 w-50">
          <h2>Авторизация</h2>

          {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="login" className="form-label">Логин</label>
                <input type="text" className="form-control" id="login" name="login" autoComplete="username" required onChange={handleChange} value={formData.login}/>
              </div>
        
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Пароль</label>
                <input type="password" className="form-control" id="password" name="password" autoComplete="password" required onChange={handleChange} value={formData.password}/>
              </div>
      
              <div className="mb-3 text-center">
                <button type="submit" className="btn btn-primary w-50">Войти</button>
              </div>
            </form>
        </div>
      );
  }

export default Login;