import React, { useState } from 'react';
    
    const CreateUser: React.FC = () => {
        const [formData, setFormData] = useState({
            username: '',
            email: '',
            login: '',
            password: '',
            password_confirmation: ''
        });

        const [error, setError] = useState<string | null>(null);
        const [success, setSuccess] = useState(false);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setError(null);
            setSuccess(false);

            if (formData.password !== formData.password_confirmation) {
                setError('Введенные пароли отличаются');
                return;
            }
        
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
        
                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.message || 'Ошибка при регистрации');
                    return;
                }
        
                setSuccess(true);

            } catch (err) {
                setError('Ошибка подключения к серверу');
            }
        };

        return (
            <div className="container mt-4 w-50">
                <h2>Регистрация</h2>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">Пользователь успешно зарегистрирован!</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Имя на сайте</label>
                        <input type="text" className="form-control" id="username" name="username" autoComplete="off" required onChange={handleChange} value={formData.username}/>
                    </div>
            
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" autoComplete="email" required onChange={handleChange} value={formData.email}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="login" className="form-label">Логин</label>
                        <input type="text" className="form-control" id="login" name="login" autoComplete="username" required onChange={handleChange} value={formData.login}/>
                    </div>
            
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input type="password" className="form-control" id="password" name="password" autoComplete="new-password" required onChange={handleChange} value={formData.password}/>
                    </div>
            
                    <div className="mb-3">
                        <label htmlFor="password_confirmation" className="form-label">Подтвердите пароль</label>
                        <input type="password" className="form-control" id="password_confirmation" name="password_confirmation" autoComplete="new-password" required onChange={handleChange} value={formData.password_confirmation}/>
                    </div>
            
                    <div className="mb-3 text-center">
                        <button type="submit" className="btn btn-primary w-50">Зарегистрироваться</button>
                    </div>
                </form>
            </div>
          );
    }
  
  export default CreateUser;