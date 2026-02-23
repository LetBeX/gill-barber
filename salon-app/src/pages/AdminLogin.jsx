import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, password })
            });

            const data = await response.json();

            if (data.success) {
                // Store logged in state simply in localStorage (or context)
                localStorage.setItem('adminLoggedIn', 'true');
                localStorage.setItem('adminId', id);
                navigate('/admin/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Unable to reach server');
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#1a150b] flex items-center justify-center px-4">
            <div className="bg-[#fcf8f2] dark:bg-charcoal p-8 rounded-2xl shadow-xl max-w-md w-full border border-[#e8dfc8] dark:border-[#2a2010]">
                <h2 className="text-3xl font-black text-center mb-6 text-charcoal dark:text-white uppercase tracking-tighter">Admin Login</h2>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-charcoal dark:text-white mb-2">Admin ID</label>
                        <input 
                            type="text" 
                            required
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-[#e8dfc8] dark:border-[#2a2010] bg-white dark:bg-[#252015] text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C0392B]"
                            placeholder="Enter Admin ID"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-charcoal dark:text-white mb-2">Password</label>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-[#e8dfc8] dark:border-[#2a2010] bg-white dark:bg-[#252015] text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C0392B]"
                            placeholder="Enter Password"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-[#C0392B] hover:bg-[#992d22] text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
