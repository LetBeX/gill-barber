import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { mockData } from '../data/mockData';

const BookingPage = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        services: [],
        stylist: '',
        date: '',
        time: ''
    });

    const [message, setMessage] = useState('');
    
    // Calendar State
    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendarDays, setCalendarDays] = useState([]);

    const availableServices = [
        "Haircut",
        "Shave",
        "Face mask"
    ];

    useEffect(() => {
        if (location.state?.selectedService) {
            const serviceToAdd = location.state.selectedService;
            setFormData(prev => ({
                ...prev,
                services: prev.services.includes(serviceToAdd) 
                    ? prev.services 
                    : [...prev.services, serviceToAdd]
            }));
        }
    }, [location.state]);

    useEffect(() => {
        generateCalendar(currentDate);
    }, [currentDate]);

    const generateCalendar = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const days = [];
        // Add empty slots for days before the 1st
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }
        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        setCalendarDays(days);
    };

    const handlePrevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleService = (service) => {
        setFormData(prev => {
            const exists = prev.services.includes(service);
            return {
                ...prev,
                services: exists 
                    ? prev.services.filter(s => s !== service)
                    : [...prev.services, service]
            };
        });
    };

    const handleDateSelect = (day) => {
        if (!day) return;
        const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        // Format: "October 5, 2023"
        const formattedDate = selected.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        setFormData(prev => ({ ...prev, date: formattedDate }));
    };

    const handleTimeSelect = (time) => {
        setFormData(prev => ({ ...prev, time: time }));
    };

    // Load bookings from API on mount
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch('https://gill-barber.onrender.com/api/admin/bookings');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setBookingsList(data);
                }
            } catch (err) {
                console.error('Failed to fetch bookings:', err);
            }
        };
        fetchBookings();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic Validation
        if (!formData.name || !formData.phone || formData.services.length === 0 || !formData.date || !formData.time) {
            setMessage('Please fill in all required fields and select at least one service.');
            return;
        }

        const bookingPayload = {
            name: formData.name,
            email: formData.email || 'no_email_provided',
            phone: formData.phone,
            service: formData.services.join(', '),
            date: formData.date,
            time: formData.time
        };

        try {
            const res = await fetch('https://gill-barber.onrender.com/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingPayload)
            });

            const data = await res.json();

            if (data.success) {
                console.log('Booking Saved:', data.booking);
                setMessage(`Booking confirmed for ${formData.name}! We have sent a confirmation to ${formData.phone}.`);
                
                // Update local list
                setBookingsList(prevList => [data.booking, ...prevList]);
                
                // Reset form
                setFormData(prev => ({
                    ...prev,
                    name: '',
                    email: '',
                    phone: '',
                    services: [],
                    stylist: '',
                    date: '',
                    time: ''
                }));
                
                // Clear success message after 5 seconds
                setTimeout(() => setMessage(''), 5000);
            } else {
                setMessage(data.message || 'Failed to create booking.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setMessage('Network error. Failed to reach server.');
        }
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Local state to display bookings for verification
    const [bookingsList, setBookingsList] = useState([]);

    return (
        <div className="max-w-[1200px] mx-auto w-full px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Booking Form Section (Left) */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-black tracking-tight text-charcoal dark:text-white">Book Your Appointment</h1>
                        <p className="text-muted dark:text-[#b8a878] text-lg">Professional barbering and grooming services tailored for men.</p>
                    </div>
                    
                    {message && (
                        <div className={`p-4 rounded-lg text-sm font-bold ${message.includes('confirmed') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="bg-white dark:bg-[#181510] p-8 rounded-xl shadow-sm border border-[#e8dfc8] dark:border-[#2a2010] flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-charcoal dark:text-white">Full Name *</label>
                                <input 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleInputChange} 
                                    className="form-input" 
                                    placeholder="John Doe" 
                                    type="text"
                                    required
                                />
                           </div>
                           <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-charcoal dark:text-white">Email *</label>
                                <input 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleInputChange} 
                                    className="form-input" 
                                    placeholder="john@example.com" 
                                    type="email"
                                    required
                                />
                           </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-charcoal dark:text-white">Phone Number *</label>
                            <input 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleInputChange} 
                                className="form-input" 
                                placeholder="+1 (555) 000-0000" 
                                type="tel"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-[#140d1b] dark:text-white">Select Services (Select Multiple) *</label>
                            <div className="flex flex-wrap gap-3">
                                {availableServices.map(service => (
                                    <button
                                        key={service}
                                        type="button"
                                        onClick={() => toggleService(service)}
                                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                                            formData.services.includes(service)
                                                ? 'bg-[#C0392B] text-white border-[#C0392B] shadow-md'
                                                : 'bg-background-light dark:bg-[#1e1a10] text-muted dark:text-[#b8a878] border-transparent hover:border-[#C0392B]/30'
                                        }`}
                                    >
                                        {service}
                                        {formData.services.includes(service) && <span className="ml-2">✓</span>}
                                    </button>
                                ))}
                            </div>
                            {formData.services.length === 0 && <p className="text-xs text-muted/60 mt-1">Please select at least one service</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-charcoal dark:text-white">Preferred Stylist</label>
                            <select 
                                name="stylist" 
                                value={formData.stylist} 
                                onChange={handleInputChange} 
                                className="form-input appearance-none cursor-pointer"
                            >
                                <option value="">No Preference (Any)</option>
                                <option value="Alex Rivera (Senior)">Alex Rivera (Senior)</option>
                                <option value="Jordan Smith (Master)">Jordan Smith (Master)</option>
                                <option value="Casey Lee (Junior)">Casey Lee (Junior)</option>
                            </select>
                        </div>
                        
                        {/* Date & Time Selector */}
                        <div className="flex flex-col gap-4">
                            <label className="text-sm font-semibold text-charcoal dark:text-white">Select Date &amp; Time *</label>
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Calendar Component */}
                                <div className="flex-1 bg-background-light dark:bg-[#1e1a10] rounded-xl p-4 border border-[#d4c6a8] dark:border-[#3a3020]">
                                     <div className="flex items-center justify-between mb-4">
                                        <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-primary/10 rounded-full transition-colors">
                                            <span className="material-symbols-outlined cursor-pointer hover:text-[#C0392B]">chevron_left</span>
                                        </button>
                                        <span className="font-bold text-sm select-none">
                                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                        </span>
                                        <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-[#C0392B]/10 rounded-full transition-colors">
                                            <span className="material-symbols-outlined cursor-pointer hover:text-[#C0392B]">chevron_right</span>
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-muted mb-2 select-none">
                                        <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1">
                                        {calendarDays.map((day, index) => {
                                            if (day === null) {
                                                return <div key={`empty-${index}`} className="aspect-square"></div>;
                                            }
                                            
                                            // Check to see if this specific day is selected
                                            // Construct date string to compare with formData.date
                                            const thisDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                            const dateString = thisDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                                            const isSelected = formData.date === dateString;
                                            const isToday = new Date().toDateString() === thisDate.toDateString();

                                            return (
                                                <div 
                                                    key={day} 
                                                    onClick={() => handleDateSelect(day)}
                                                    className={`
                                                        aspect-square flex items-center justify-center text-xs rounded-full cursor-pointer transition-all select-none
                                                        ${isSelected ? 'bg-[#C0392B] text-white shadow-md scale-105' : 'hover:bg-[#C0392B]/10 text-charcoal dark:text-white'}
                                                        ${isToday && !isSelected ? 'border border-[#C0392B] text-[#C0392B] font-bold' : ''}
                                                    `}
                                                >
                                                    {day}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <p className="text-xs text-center mt-3 text-[#C0392B] font-bold h-4">
                                        {formData.date ? `Selected: ${formData.date}` : ''}
                                    </p>
                                </div>
                                
                                {/* Time Slots */}
                                <div className="flex-1 flex flex-col gap-2 overflow-y-auto max-h-[180px] md:max-h-[320px]">
                                    <p className="text-xs font-bold text-muted uppercase tracking-wider">Available Slots</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'].map(time => (
                                            <button 
                                                type="button"
                                                key={time} 
                                                onClick={() => handleTimeSelect(time)}
                                                className={`py-2 text-xs font-medium border rounded-lg transition-colors ${formData.time === time ? 'border-[#C0392B] bg-[#C0392B] text-white' : 'border-[#d4c6a8] dark:border-[#3a3020] hover:border-[#C0392B] hover:text-[#C0392B] text-charcoal dark:text-white'}`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-[#C0392B] text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#C0392B]/20 transition-all active:scale-[0.98] mt-4">
                            Confirm Booking
                        </button>
                        <p className="text-center text-xs text-muted dark:text-[#b8a878]">By booking, you agree to our 24h cancellation policy. You'll receive a confirmation via SMS.</p>
                    </form>
                </div>

                {/* Contact & Info Sidebar (Right) */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                     {/* Contact Details */}
                      <div className="bg-white dark:bg-[#181510] p-8 rounded-xl shadow-sm border border-[#e8dfc8] dark:border-[#2a2010]">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white">
                            <span className="material-symbols-outlined text-[#C0392B]">info</span>
                            Contact Information
                        </h3>
                        <div className="flex flex-col gap-6">
                            {[
                                {icon: 'location_on', title: 'Our Location', desc: '7215 Goreway Dr #1c17', desc2: 'Mississauga, ON L4T 0B4, Canada'},
                                {icon: 'call', title: 'Phone Number', desc: '+1 647-679-9829'},
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="size-10 rounded-lg bg-[#C0392B]/10 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[#C0392B]">{item.icon}</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm dark:text-white">{item.title}</p>
                                        <p className="text-muted dark:text-[#b8a878] text-sm">{item.desc}{item.desc2 && <><br/>{item.desc2}</>}</p>
                                    </div>
                                </div>
                            ))}
                             <div className="flex items-start gap-4">
                                <div className="size-10 rounded-lg bg-[#C0392B]/10 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[#C0392B]">schedule</span>
                                </div>
                                <div className="w-full">
                                    <p className="font-semibold text-sm mb-2 dark:text-white">Business Hours</p>
                                    <div className="grid grid-cols-2 gap-y-1 text-sm">
                                        <span className="text-muted dark:text-[#b8a878]">Mon - Fri</span><span className="text-right font-medium dark:text-white">9:00 AM - 9:00 PM</span>
                                        <span className="text-muted dark:text-[#b8a878]">Saturday</span><span className="text-right font-medium dark:text-white">9:00 AM - 8:00 PM</span>
                                        <span className="text-muted dark:text-[#b8a878]">Sunday</span><span className="text-right font-medium dark:text-white">9:00 AM - 7:00 PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>

                     {/* Minimalist Map Placeholder */}
                     <div className="relative w-full h-[300px] rounded-xl overflow-hidden border border-[#e8dfc8] dark:border-[#2a2010] group bg-slate-200 dark:bg-[#1e1a10] flex items-center justify-center">
                        <div className="text-center">
                             <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                             <div className="relative z-10 size-10 rounded-full bg-[#C0392B] flex items-center justify-center text-white shadow-xl mx-auto mb-2">
                                <span className="material-symbols-outlined text-2xl">location_on</span>
                             </div>
                             <p className="text-xs font-bold uppercase tracking-tighter text-charcoal dark:text-white">Gill Barber · Westwood Square, Mississauga</p>
                        </div>
                     </div>
                </div>
            </div>


            {/* Verification Section: Recent Bookings */}
            {bookingsList.length > 0 && (
                <div className="mt-16 border-t border-[#e8dfc8] dark:border-[#2a2010] pt-12">
                    <h2 className="text-2xl font-black mb-6 dark:text-white">Recent Bookings (In-Memory Verification)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookingsList.map((booking) => (
                            <div key={booking.id} className="bg-white dark:bg-[#181510] p-6 rounded-xl border border-[#e8dfc8] dark:border-[#2a2010] shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-lg dark:text-white">{booking.name}</h3>
                                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">{booking.status}</span>
                                </div>
                                <div className="space-y-2 text-sm text-muted dark:text-[#b8a878]">
                                    <p className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-base">calendar_month</span>
                                        {booking.date} at {booking.time}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-base">content_cut</span>
                                        {booking.service}
                                    </p>
                                    {booking.phone && (
                                        <p className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-base">phone</span>
                                            {booking.phone}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingPage;
