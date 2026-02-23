import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('bookings');
    const [bookings, setBookings] = useState([]);
    const [bookingFilterTab, setBookingFilterTab] = useState('upcoming'); // 'all', 'previous', 'upcoming'
    const [searchQuery, setSearchQuery] = useState('');
    const [serviceFilter, setServiceFilter] = useState('all');
    const [timeFilter, setTimeFilter] = useState('all');

    
    // Profile State
    const [currentId, setCurrentId] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newId, setNewId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [profileMessage, setProfileMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('adminLoggedIn');
        if (!isLoggedIn) {
            navigate('/admin/login');
        } else {
            setCurrentId(localStorage.getItem('adminId'));
            if (activeTab === 'bookings') {
                fetchBookings();
            }
        }
    }, [activeTab, navigate]);

    const fetchBookings = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/admin/bookings');
            const data = await res.json();
            setBookings(data);
        } catch (err) {
            console.error('Failed to fetch bookings', err);
        }
    };

    const handleUpdateCredentials = async (e) => {
        e.preventDefault();
        setProfileMessage({ text: '', type: '' });

        try {
            const res = await fetch('http://localhost:5000/api/admin/credentials', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentId, currentPassword, newId, newPassword })
            });

            const data = await res.json();

            if (data.success) {
                setProfileMessage({ text: 'Credentials updated. Please log in again.', type: 'success' });
                setTimeout(() => {
                    handleLogout();
                }, 2000);
            } else {
                setProfileMessage({ text: data.message || 'Failed to update credentials', type: 'error' });
            }
        } catch (err) {
            setProfileMessage({ text: 'Network error', type: 'error' });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminId');
        navigate('/admin/login');
    };

    // Helper function to check if a booking date is in the past or future
    const categorizeBooking = (dateString, timeString) => {
        if (!dateString) return 'upcoming';
        
        try {
            // dateString format from BookingPage: "Month DD, YYYY" e.g. "February 24, 2026"
            // timeString format: "09:00 AM"
            const dateTimeString = `${dateString} ${timeString}`;
            const bookingDate = new Date(dateTimeString);
            
            // If date is invalid, default to upcoming so it isn't hidden
            if (isNaN(bookingDate.getTime())) return 'upcoming';
            
            const now = new Date();
            
            // Check if booking is strictly before today
            // Or if it's today but the time has passed
            if (bookingDate < now) {
                return 'previous';
            } else {
                return 'upcoming';
            }
        } catch (e) {
            return 'upcoming';
        }
    };

    const getFilteredBookings = () => {
        let filtered = bookings;

        // Apply Tab Filter
        if (bookingFilterTab === 'previous') {
            filtered = filtered.filter(b => categorizeBooking(b.date, b.time) === 'previous');
        } else if (bookingFilterTab === 'upcoming') {
            filtered = filtered.filter(b => categorizeBooking(b.date, b.time) === 'upcoming');
        }
        // If 'all', do nothing to `filtered`

        // Apply Search Filter (by name, email, or phone)
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(b => 
                (b.name && b.name.toLowerCase().includes(query)) ||
                (b.email && b.email.toLowerCase().includes(query)) ||
                (b.phone && b.phone.toLowerCase().includes(query)) ||
                (b.service && b.service.toLowerCase().includes(query))
            );
        }

        // Apply Service Filter
        if (serviceFilter !== 'all') {
            filtered = filtered.filter(b => b.service && b.service.includes(serviceFilter));
        }

        // Apply Time Filter
        if (timeFilter !== 'all') {
            filtered = filtered.filter(b => b.time && b.time === timeFilter);
        }

        return filtered;
    };

    const displayedBookings = getFilteredBookings();

    const uniqueServices = Array.from(new Set(
        bookings.flatMap(b => b.service ? b.service.split(', ') : [])
    )).sort();

    const uniqueTimes = Array.from(new Set(
        bookings.map(b => b.time).filter(Boolean)
    )).sort((a, b) => {
        const timeA = new Date(`1970/01/01 ${a}`);
        const timeB = new Date(`1970/01/01 ${b}`);
        return timeA - timeB;
    });

    return (
        <div className="min-h-screen bg-white dark:bg-[#1a150b] flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-[#fcf8f2] dark:bg-charcoal border-r border-[#e8dfc8] dark:border-[#2a2010] flex flex-col">
                <div className="p-6 border-b border-[#e8dfc8] dark:border-[#2a2010]">
                    <h2 className="text-xl font-black text-charcoal dark:text-white uppercase tracking-tighter">Admin Panel</h2>
                </div>
                <div className="p-4 flex-1 space-y-2">
                    <button 
                        onClick={() => setActiveTab('bookings')}
                        className={`w-full text-left px-4 py-3 rounded-lg font-bold transition-colors ${activeTab === 'bookings' ? 'bg-[#C0392B] text-white' : 'text-charcoal dark:text-[#b8a878] hover:bg-[#e8dfc8] dark:hover:bg-[#252015]'}`}
                    >
                        Bookings
                    </button>
                    <button 
                        onClick={() => setActiveTab('profile')}
                        className={`w-full text-left px-4 py-3 rounded-lg font-bold transition-colors ${activeTab === 'profile' ? 'bg-[#C0392B] text-white' : 'text-charcoal dark:text-[#b8a878] hover:bg-[#e8dfc8] dark:hover:bg-[#252015]'}`}
                    >
                        Profile Settings
                    </button>
                </div>
                <div className="p-4 border-t border-[#e8dfc8] dark:border-[#2a2010]">
                    <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 rounded-lg font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {activeTab === 'bookings' && (
                    <div className="flex flex-col h-full">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <h3 className="text-3xl font-black text-charcoal dark:text-white uppercase tracking-tighter bg-gradient-to-r from-[#C0392B] to-[#e74c3c] bg-clip-text text-transparent">Bookings</h3>
                            
                            {/* Tabs & Search & Filters */}
                            <div className="flex flex-col lg:flex-row flex-wrap gap-4 w-full md:w-auto items-start lg:items-center justify-end">
                                <div className="bg-[#fcf8f2] dark:bg-[#252015] p-1 rounded-lg border border-[#e8dfc8] dark:border-[#2a2010] flex text-sm">
                                    <button 
                                        onClick={() => setBookingFilterTab('all')}
                                        className={`px-4 py-1.5 rounded-md font-bold transition-colors ${bookingFilterTab === 'all' ? 'bg-[#C0392B] text-white shadow-sm' : 'text-charcoal dark:text-[#b8a878] hover:text-[#C0392B]'}`}
                                    >
                                        All
                                    </button>
                                    <button 
                                        onClick={() => setBookingFilterTab('upcoming')}
                                        className={`px-4 py-1.5 rounded-md font-bold transition-colors ${bookingFilterTab === 'upcoming' ? 'bg-[#C0392B] text-white shadow-sm' : 'text-charcoal dark:text-[#b8a878] hover:text-[#C0392B]'}`}
                                    >
                                        Upcoming
                                    </button>
                                    <button 
                                        onClick={() => setBookingFilterTab('previous')}
                                        className={`px-4 py-1.5 rounded-md font-bold transition-colors ${bookingFilterTab === 'previous' ? 'bg-[#C0392B] text-white shadow-sm' : 'text-charcoal dark:text-[#b8a878] hover:text-[#C0392B]'}`}
                                    >
                                        Previous
                                    </button>
                                </div>
                                
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <select 
                                        value={serviceFilter}
                                        onChange={(e) => setServiceFilter(e.target.value)}
                                        className="p-2 h-[40px] rounded-lg border border-[#e8dfc8] dark:border-[#2a2010] bg-white dark:bg-[#252015] text-charcoal dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#C0392B] min-w-[120px]"
                                    >
                                        <option value="all">All Services</option>
                                        {uniqueServices.map(service => (
                                            <option key={service} value={service}>{service}</option>
                                        ))}
                                    </select>

                                    <select 
                                        value={timeFilter}
                                        onChange={(e) => setTimeFilter(e.target.value)}
                                        className="p-2 h-[40px] rounded-lg border border-[#e8dfc8] dark:border-[#2a2010] bg-white dark:bg-[#252015] text-charcoal dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#C0392B] min-w-[100px]"
                                    >
                                        <option value="all">All Times</option>
                                        {uniqueTimes.map(time => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-[#8a7a65] text-sm">search</span>
                                    <input 
                                        type="text" 
                                        placeholder="Search name, phone..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full sm:w-56 pl-9 pr-4 py-2 h-[40px] rounded-lg border border-[#e8dfc8] dark:border-[#2a2010] bg-white dark:bg-[#252015] text-charcoal dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#C0392B]"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white dark:bg-[#252015] rounded-xl shadow-md border border-[#e8dfc8] dark:border-[#2a2010] overflow-hidden flex-1">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#fcf8f2] dark:bg-charcoal text-[#C0392B] border-b border-[#e8dfc8] dark:border-[#2a2010]">
                                            <th className="p-4 font-bold uppercase tracking-wider text-sm">Date & Time</th>
                                            <th className="p-4 font-bold uppercase tracking-wider text-sm">Customer</th>
                                            <th className="p-4 font-bold uppercase tracking-wider text-sm">Contact</th>
                                            <th className="p-4 font-bold uppercase tracking-wider text-sm">Service</th>
                                            <th className="p-4 font-bold uppercase tracking-wider text-sm">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayedBookings.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="p-8 text-center text-gray-500 dark:text-gray-400">
                                                    No bookings found matching criteria.
                                                </td>
                                            </tr>
                                        ) : (
                                            displayedBookings.map((booking) => {
                                                const status = categorizeBooking(booking.date, booking.time);
                                                return (
                                                <tr key={booking._id} className="border-b border-[#e8dfc8] dark:border-[#2a2010] hover:bg-gray-50 dark:hover:bg-[#1a150b]">
                                                    <td className="p-4 text-charcoal dark:text-white font-medium">
                                                        <div>{booking.date}</div>
                                                        <div className="text-sm text-gray-500">{booking.time}</div>
                                                    </td>
                                                    <td className="p-4 text-charcoal dark:text-white font-bold">{booking.name}</td>
                                                    <td className="p-4 text-charcoal dark:text-gray-300 text-sm">
                                                        <div>{booking.phone}</div>
                                                        <div>{booking.email}</div>
                                                    </td>
                                                    <td className="p-4 text-charcoal dark:text-white">{booking.service}</td>
                                                    <td className="p-4">
                                                        <span className={`px-2 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                                                            status === 'upcoming' 
                                                                ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                                                                : 'bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-800 dark:text-gray-400'
                                                        }`}>
                                                            {status}
                                                        </span>
                                                    </td>
                                                </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="max-w-md">
                        <h3 className="text-3xl font-black text-charcoal dark:text-white uppercase tracking-tighter mb-8 bg-gradient-to-r from-[#C0392B] to-[#e74c3c] bg-clip-text text-transparent">Update Credentials</h3>
                        
                        {profileMessage.text && (
                            <div className={`px-4 py-3 rounded relative mb-6 ${profileMessage.type === 'error' ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'}`}>
                                {profileMessage.text}
                            </div>
                        )}

                        <form onSubmit={handleUpdateCredentials} className="space-y-4">
                            <div className="bg-[#fcf8f2] dark:bg-charcoal p-6 rounded-xl border border-[#e8dfc8] dark:border-[#2a2010] space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-charcoal dark:text-gray-300 mb-2">Current Admin ID</label>
                                    <input 
                                        type="text" 
                                        value={currentId}
                                        readOnly
                                        className="w-full px-4 py-3 rounded-lg border border-[#e8dfc8] dark:border-[#2a2010] bg-gray-100 dark:bg-[#1a150b] text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-charcoal dark:text-white mb-2">Current Password</label>
                                    <input 
                                        type="password" 
                                        required
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-[#e8dfc8] dark:border-[#2a2010] bg-white dark:bg-[#252015] text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C0392B]"
                                    />
                                </div>
                            </div>
                            
                            <div className="bg-[#fcf8f2] dark:bg-charcoal p-6 rounded-xl border border-[#e8dfc8] dark:border-[#2a2010] space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-charcoal dark:text-white mb-2">New Admin ID</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={newId}
                                        onChange={(e) => setNewId(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-[#e8dfc8] dark:border-[#2a2010] bg-white dark:bg-[#252015] text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C0392B]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-charcoal dark:text-white mb-2">New Password</label>
                                    <input 
                                        type="password" 
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-[#e8dfc8] dark:border-[#2a2010] bg-white dark:bg-[#252015] text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C0392B]"
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-[#C0392B] hover:bg-[#992d22] text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg mt-4"
                            >
                                Update Credentials
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
