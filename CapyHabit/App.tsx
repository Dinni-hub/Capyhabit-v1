import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Plus, Trash2, Calendar, Leaf, TrendingUp, ChevronLeft, ChevronRight, 
  Bell, StickyNote, X, Clock, CheckCircle2, Circle, MapPin, Check, RotateCcw 
} from 'lucide-react';
import { Habit, Day, Note } from './types';

// --- Komponen Bentuk Awan Gembul (Solid White) untuk Dekorasi ---
const FluffyCloudShape: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 60" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M25,50 C10,50 5,35 15,25 C15,10 35,5 45,15 C50,5 75,5 80,20 C95,20 95,45 80,50 Z" />
  </svg>
);

// --- Komponen Dekorasi Awan Bergerak (Background) ---
const BackgroundClouds: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-8 left-[-20%] text-white/20 w-32 h-20 animate-move-right" style={{ animationDuration: '45s' }}>
       <FluffyCloudShape className="w-full h-full" />
    </div>
    <div className="absolute top-4 right-[-10%] text-white/15 w-40 h-24 animate-move-left" style={{ animationDuration: '60s' }}>
       <FluffyCloudShape className="w-full h-full" />
    </div>
    <div className="absolute top-32 left-[-15%] text-white/10 w-24 h-14 animate-move-right" style={{ animationDuration: '35s', animationDelay: '5s' }}>
       <FluffyCloudShape className="w-full h-full" />
    </div>
    <div className="absolute bottom-20 right-[-20%] text-white/5 w-56 h-32 animate-move-left" style={{ animationDuration: '80s' }}>
       <FluffyCloudShape className="w-full h-full" />
    </div>
    <div className="absolute bottom-10 left-[-10%] text-white/10 w-36 h-20 animate-move-right" style={{ animationDuration: '50s', animationDelay: '10s' }}>
       <FluffyCloudShape className="w-full h-full" />
    </div>
    <Leaf className="absolute top-4 left-4 text-green-800/10 w-8 h-8 rotate-45 animate-bounce-slow" />
    <Leaf className="absolute bottom-4 right-10 text-green-800/10 w-6 h-6 -rotate-12 animate-bounce-slower" />
    
    <style>{`
      @keyframes move-right { from { transform: translateX(0); } to { transform: translateX(120vw); } }
      @keyframes move-left { from { transform: translateX(0); } to { transform: translateX(-120vw); } }
      .animate-move-right { animation: move-right linear infinite; }
      .animate-move-left { animation: move-left linear infinite; }
      @keyframes slow-bounce { 0%, 100% { transform: translateY(0) rotate(45deg); } 50% { transform: translateY(-10px) rotate(50deg); } }
      .animate-bounce-slow { animation: slow-bounce 6s infinite; }
      .animate-bounce-slower { animation: slow-bounce 8s infinite; }
    `}</style>
  </div>
);

// --- Komponen Ikon Yuzu (Jeruk) Spesial ---
const YuzuPointIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
    <circle cx="12" cy="13" r="9" fill="#FFB74D" stroke="#EF6C00" strokeWidth="1.5"/>
    <circle cx="9" cy="10" r="0.5" fill="#EF6C00" opacity="0.6"/>
    <circle cx="15" cy="15" r="0.5" fill="#EF6C00" opacity="0.6"/>
    <circle cx="8" cy="16" r="0.5" fill="#EF6C00" opacity="0.6"/>
    <circle cx="16" cy="11" r="0.5" fill="#EF6C00" opacity="0.6"/>
    <path d="M12 4C12 4 15 2 17 5" stroke="#558B2F" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 4C12 4 9 2 8 5" stroke="#558B2F" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

interface CapybaraImageProps {
  isHappy: boolean;
  message: string;
  currentImageSrc: string;
}

// --- Komponen Gambar Kapibara dengan Reaksi ---
const CapybaraImage: React.FC<CapybaraImageProps> = ({ isHappy, message, currentImageSrc }) => (
  <div className="relative group w-72 h-72 mx-auto flex items-center justify-center z-10 transition-all duration-300 mt-10 md:mt-0">
    
    {/* Bubble Chat: Awan Super Gembul */}
    <div className={`absolute -top-16 -right-16 z-30 transition-all duration-500 transform ${isHappy ? 'scale-110 rotate-2' : 'scale-100 rotate-0'} animate-float-slow`}>
       <div className="relative filter drop-shadow-xl w-[240px] h-[160px]">
          <svg viewBox="0 0 240 160" className="w-full h-full text-white fill-current">
            <path d="M 50,80 
                     A 30,30 0 0 1 60,35 
                     A 40,40 0 0 1 130,25 
                     A 40,40 0 0 1 190,55 
                     A 35,35 0 0 1 200,105 
                     A 30,30 0 0 1 160,135 
                     A 40,40 0 0 1 100,135 
                     A 30,30 0 0 1 50,110 
                     A 25,25 0 0 1 50,80 Z" />
             <circle cx="55" cy="125" r="9" />
             <circle cx="40" cy="140" r="6" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pb-2 pl-4 pr-2 text-center z-10">
            <span className="text-xl animate-bounce mb-0.5">🍊</span>
            <span key={message} className="text-[#5D4037] font-bold text-xs leading-tight animate-fade-in-fast max-w-[140px]">
              {message}
            </span>
          </div>
       </div>
    </div>

    {/* Efek Glow */}
    <div className={`absolute w-64 h-64 bg-[#FFF8E1] rounded-full blur-2xl transition-transform duration-700 ${isHappy ? 'scale-110 bg-yellow-100 opacity-30' : 'scale-100 opacity-0'}`}></div>
    
    {/* Gambar Utama */}
    <div className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ${isHappy ? 'scale-105' : 'hover:scale-105'}`}>
      <img
        key={currentImageSrc} 
        src={currentImageSrc} 
        alt="Kapibara Santuy"
        className={`w-full h-full object-contain transition-all duration-700 ${isHappy ? 'scale-105' : 'animate-fade-in'}`}
      />
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isHappy ? 'opacity-100' : 'opacity-0'}`}>
         <div className="absolute -top-4 -right-4 text-3xl animate-bounce">💖</div>
         <div className="absolute top-1/2 -left-6 text-2xl animate-pulse">✨</div>
      </div>
    </div>

    <style>{`
      @keyframes fade-in { from { opacity: 0.6; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      @keyframes fade-in-fast { from { opacity: 0; transform: translateY(2px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
      .animate-fade-in { animation: fade-in 0.5s ease-out; }
      .animate-fade-in-fast { animation: fade-in-fast 0.3s ease-out; }
      .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
    `}</style>
  </div>
);

// --- KOMPONEN BARU: NOTIFIKASI TOAST (KOTAK DI LAYAR) ---
const NotificationToast: React.FC<{ message: string, onClose: () => void }> = ({ message, onClose }) => (
  <div className="fixed top-24 right-4 z-[999] animate-slide-in">
    <div className="bg-white border-l-8 border-[#FFB74D] rounded-r-xl shadow-2xl p-4 flex items-start gap-3 max-w-sm">
      <div className="bg-[#FFF3E0] p-2 rounded-full">
        <Clock size={24} className="text-[#EF6C00]" />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-[#5D4037] text-lg leading-tight mb-1">Pengingat Santuy!</h4>
        <p className="text-sm text-[#8D6E63]">{message}</p>
        <p className="text-[10px] text-gray-400 mt-2 text-right">Barusan saja</p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
        <X size={18} />
      </button>
    </div>
    <style>{`
      @keyframes slide-in { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      .animate-slide-in { animation: slide-in 0.5s cubic-bezier(0.25, 1, 0.5, 1); }
    `}</style>
  </div>
);

const formatReminderDisplay = (isoString: string) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('id-ID', { 
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
  }).format(date);
};

const StickyNoteItem: React.FC<{ 
  note: Note; 
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}> = ({ note, onDelete, onToggle }) => {
  const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0'];
  const colors = [
    'bg-[#FFF9C4]', 'bg-[#FFE0B2]', 'bg-[#F8BBD0]', 'bg-[#E1F5FE]', 'bg-[#C8E6C9]'
  ];
  const pinColors = ['text-red-600', 'text-blue-600', 'text-[#EF6C00]', 'text-green-700'];

  const randomRot = rotations[note.id % rotations.length];
  const randomColor = colors[note.id % colors.length];
  const randomPinColor = pinColors[note.id % pinColors.length];

  return (
    <div className={`relative group p-6 pt-12 mb-8 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${randomRot} ${randomColor} ${note.completed ? 'brightness-95 contrast-75' : ''} border-b-8 border-black/10 rounded-sm overflow-hidden`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-transform group-hover:scale-110">
        <div className="relative">
          <MapPin size={32} className={`${randomPinColor} fill-current drop-shadow-[0_4px_3px_rgba(0,0,0,0.4)]`} />
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white/40 rounded-full blur-[1px]"></div>
        </div>
      </div>
      <button 
        onClick={() => onDelete(note.id)} 
        className="absolute top-2 right-2 text-[#5D4037]/20 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-black/5 z-20"
      >
        <X size={18} />
      </button>

      <div className="flex gap-4 items-start relative z-10">
        <button 
          onClick={() => onToggle(note.id)}
          className={`
            relative flex-shrink-0 w-8 h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center cursor-pointer
            ${note.completed 
              ? 'bg-green-500 border-green-600 shadow-inner scale-105' 
              : 'bg-white border-[#8D6E63]/40 hover:border-green-500 hover:bg-green-50 shadow-md active:scale-95'}
          `}
        >
          {note.completed ? (
            <Check size={20} className="text-white animate-[check-pop_0.4s_ease-out]" />
          ) : (
            <div className="w-full h-full rounded-full flex items-center justify-center opacity-0 hover:opacity-100">
               <Check size={16} className="text-green-300" />
            </div>
          )}
        </button>
        
        <div className="flex-1">
          <p className={`
            text-lg text-[#5D4037] font-bold leading-tight font-handwriting transition-all duration-500
            ${note.completed ? 'line-through decoration-green-700/50 decoration-4 opacity-50 italic' : ''}
          `}>
            {note.text}
          </p>

          {note.reminderTime && (
            <div className={`
              flex items-center gap-1.5 mt-3 text-[10px] font-black tracking-widest uppercase w-fit px-2.5 py-1 rounded-md shadow-sm border
              ${note.completed 
                ? 'bg-gray-100 text-gray-400 border-gray-200' 
                : 'bg-orange-100/60 text-[#EF6C00] border-orange-200/50'}
            `}>
              <Calendar size={12} /> {formatReminderDisplay(note.reminderTime)}
            </div>
          )}
        </div>
      </div>

      {note.completed && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.1] rotate-[-20deg] scale-125 z-0">
          <div className="border-8 border-green-900 px-6 py-2 rounded-2xl text-green-900 font-black text-5xl uppercase">
            DONE
          </div>
        </div>
      )}
      
      <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 right-0 w-0 h-0 border-t-[16px] border-t-transparent border-r-[16px] border-r-black/10"></div>
      </div>

      <style>{`
        @keyframes check-pop {
          0% { transform: scale(0) rotate(-45deg); opacity: 0; }
          70% { transform: scale(1.3) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default function App() {
  const capybaraImages = [
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(1).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(10).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(11).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(12).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(13).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(14).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(15).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(16).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(17).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(18).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(19).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(2).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(3).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(4).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(5).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(6).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(7).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(8).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(9).png",
    "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download.png"
  ];

  const cheerQuotes = [
    "Ayo semangat!", "Satu langkah lagi!", "Kamu hebat!", "Konsistensi adalah kunci",
    "Bangga sama kamu", "Sedikit demi sedikit", "Waktunya rutinitas!", "Kesempatan baru!",
    "Yuzu buat kamu", "Tambah yuzu lagi!", "Satu centang lagi", "Jangan menyerah",
    "Progres tetap progres", "Yuzu senang!", "Fokus pada tujuan", "Usaha tak sia-sia",
    "Hari ini lebih baik", "Kamu pasti bisa!", "Kapibara menanti", "Versi terbaikmu",
    "Buktikan konsisten!", "Mulai aja dulu", "Investasi diri", "Kapibara senyum", "Tutup dengan bangga!"
  ];

  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('kapibaraTableHabits');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Minum Air Putih', checks: {} },
      { id: 2, name: 'Meditasi', checks: {} },
      { id: 3, name: 'Baca Buku', checks: {} }
    ];
  });
  
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('kapibaraNotes');
    return saved ? JSON.parse(saved) : [];
  });

  const [newHabit, setNewHabit] = useState('');
  const [newNote, setNewNote] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [monthOffset, setMonthOffset] = useState(0);
  
  const [isHappy, setIsHappy] = useState(false);
  const [happyMessage, setHappyMessage] = useState('Halo! Ayo santuy & produktif.');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // State untuk Notifikasi Kotak (Toast)
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  const notificationInterval = useRef<number | null>(null);

  useEffect(() => {
    localStorage.setItem('kapibaraTableHabits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('kapibaraNotes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    }

    notificationInterval.current = window.setInterval(() => {
      const now = new Date();
      const currentDateTimeStr = new Date(now.getTime() - (now.getTimezoneOffset() * 60000))
        .toISOString()
        .slice(0, 16);

      notes.forEach(note => {
        if (!note.completed && note.reminderTime === currentDateTimeStr) {
          // Trigger In-App Notification (Kotak di layar)
          setActiveNotification(note.text);
          
          // Trigger System Notification (Opsional)
          if (Notification.permission === "granted") {
             new Notification("CapyReminder! 🍊", {
               body: note.text,
               icon: "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(9).png"
             });
          }
        }
      });
    }, 60000); 

    return () => {
      if (notificationInterval.current) clearInterval(notificationInterval.current);
    };
  }, [notes]);

  const getViewDate = () => {
    const d = new Date();
    d.setDate(1); 
    d.setMonth(d.getMonth() + monthOffset);
    return d;
  };

  const viewDate = getViewDate();

  const headerDateString = monthOffset === 0 
    ? new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
    : new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(viewDate);

  const formatMonth = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();
  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
  const currentMonthPrefix = new Date(Date.UTC(currentYear, currentMonth, 2)).toISOString().slice(0, 7); 

  const totalChecksThisMonth = habits.reduce((acc, habit) => {
    return acc + Object.keys(habit.checks).filter(date => date.startsWith(currentMonthPrefix)).length;
  }, 0);

  const totalPossibleChecks = habits.length * daysInCurrentMonth;
  const monthlyProgressPercentage = totalPossibleChecks > 0 ? (totalChecksThisMonth / totalPossibleChecks) * 100 : 0;
  
  let motivationStatus = "Ayo Mulai!";
  if (monthlyProgressPercentage > 0 && monthlyProgressPercentage < 30) motivationStatus = "Awal yang Bagus! 🌱";
  else if (monthlyProgressPercentage >= 30 && monthlyProgressPercentage < 60) motivationStatus = "Makin Konsisten! 🚀";
  else if (monthlyProgressPercentage >= 60 && monthlyProgressPercentage < 90) motivationStatus = "Luar Biasa! 🔥";
  else if (monthlyProgressPercentage >= 90) motivationStatus = "Master Kapibara! 👑";

  const daysArray: Day[] = Array.from({ length: daysInCurrentMonth }, (_, i) => {
    const d = new Date(currentYear, currentMonth, i + 1);
    return {
      date: i + 1,
      dayName: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'][d.getDay()], 
      fullDate: new Date(Date.UTC(currentYear, currentMonth, i + 1)).toISOString().split('T')[0]
    };
  });

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    setHabits([...habits, { id: Date.now(), name: newHabit, checks: {} }]);
    setNewHabit('');
  };

  const deleteHabit = (id: number) => {
    if(confirm('Hapus rutinitas ini?')) {
      setHabits(habits.filter(h => h.id !== id));
    }
  };

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const noteObj: Note = {
      id: Date.now(),
      text: newNote,
      completed: false,
      reminderTime: reminderTime, 
      createdAt: new Date().toISOString()
    };
    setNotes([noteObj, ...notes]);
    setNewNote('');
    setReminderTime('');
    
    if (reminderTime && Notification.permission !== "granted") {
      alert("Aktifkan notifikasi browser agar pengingat bisa muncul!");
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const toggleNote = (id: number) => {
    setNotes(notes.map(n => {
      if (n.id === id) {
        const newState = !n.completed;
        if (newState) triggerHappyReaction(); 
        return { ...n, completed: newState };
      }
      return n;
    }));
  };

  const triggerHappyReaction = useCallback(() => {
    const newImgIndex = Math.floor(Math.random() * capybaraImages.length);
    const newQuote = cheerQuotes[Math.floor(Math.random() * cheerQuotes.length)];
    setHappyMessage(newQuote);
    setCurrentImageIndex(newImgIndex);
    setIsHappy(true);
    setTimeout(() => setIsHappy(false), 2000);
  }, [capybaraImages.length, cheerQuotes]);

  const toggleCheck = (habitId: number, dateKey: string) => {
    setHabits(habits.map(h => {
      if (h.id === habitId) {
        const newChecks = { ...h.checks };
        let isChecking = false;
        if (newChecks[dateKey]) { delete newChecks[dateKey]; } 
        else { newChecks[dateKey] = true; isChecking = true; }
        if (isChecking) triggerHappyReaction();
        return { ...h, checks: newChecks };
      }
      return h;
    }));
  };

  const testNotification = () => {
    setActiveNotification("Halo! Pengingat kamu akan muncul di sini.");
    
    if (Notification.permission === "granted") {
      new Notification("Notifikasi Aktif! 🍊", {
        body: "Halo! Pengingat kamu akan muncul di sini.",
        icon: "https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(9).png"
      });
    } else {
      Notification.requestPermission();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] font-sans text-[#5D4037] pb-10">
      
      {/* Toast Notification In-App */}
      {activeNotification && (
        <NotificationToast 
          message={activeNotification} 
          onClose={() => setActiveNotification(null)} 
        />
      )}
      
      {/* --- HEADER --- */}
      <div className="bg-[#8D6E63] text-[#FFF8E1] pt-10 pb-8 rounded-b-[40px] shadow-lg mb-6 relative overflow-hidden">
        <BackgroundClouds />
        
        <div className="relative z-20 max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
          
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <div className="mb-2 relative inline-block">
              <div className="relative inline-block">
                <h1 className="text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-white to-[#FFCC80] drop-shadow-md z-10 relative" style={{ filter: 'drop-shadow(2px 2px 0px rgba(93, 64, 55, 0.5))' }}>
                  CapyHabit
                </h1>
                <img 
                  src="https://raw.githubusercontent.com/Dinni-hub/kapibara.v4/main/download%20(9).png" 
                  alt="Mini Capy"
                  className="absolute right-20 -top-8 w-24 h-24 z-0 object-contain"
                />
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <button 
                  onClick={() => setMonthOffset(prev => prev - 1)}
                  className="bg-[#5D4037]/40 p-1.5 rounded-full text-white hover:bg-[#5D4037]/60 transition-colors border border-[#A1887F]/30"
                  title="Bulan Sebelumnya"
                >
                  <ChevronLeft size={14} />
                </button>
                
                <div className="flex items-center gap-2 text-xs font-medium bg-[#5D4037]/40 px-3 py-1.5 rounded-full border border-[#A1887F]/30 text-white min-w-[160px] justify-center">
                  <Calendar size={12} />
                  <span>{headerDateString}</span>
                </div>

                <button 
                  onClick={() => setMonthOffset(prev => prev + 1)}
                  className="bg-[#5D4037]/40 p-1.5 rounded-full text-white hover:bg-[#5D4037]/60 transition-colors border border-[#A1887F]/30"
                  title="Bulan Berikutnya"
                >
                  <ChevronRight size={14} />
                </button>

                {monthOffset !== 0 && (
                  <button 
                    onClick={() => setMonthOffset(0)}
                    className="ml-2 flex items-center gap-1 text-[10px] font-bold bg-white/20 hover:bg-white/30 px-2 py-1 rounded-full text-white transition-all shadow-sm border border-white/20"
                    title="Kembali ke Hari Ini"
                  >
                    <RotateCcw size={10} />
                  </button>
                )}
              </div>
            </div>

            <div className="bg-[#6D4C41]/60 backdrop-blur-sm p-4 rounded-2xl border border-[#A1887F]/30 flex items-center gap-4 shadow-sm hover:scale-105 transition-transform duration-300">
              <div className="bg-[#FFF3E0] p-3 rounded-full shadow-inner">
                <YuzuPointIcon size={28} />
              </div>
              <div>
                <p className="text-xs text-[#D7CCC8] uppercase tracking-wider font-bold mb-1">Yuzu Bulan Ini</p>
                <p className="text-3xl font-bold text-white leading-none">{totalChecksThisMonth} <span className="text-lg font-normal text-[#D7CCC8]">Yuzu</span></p>
              </div>
            </div>

            <div className="bg-[#6D4C41]/60 backdrop-blur-sm p-4 rounded-2xl border border-[#A1887F]/30 shadow-sm">
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-2 text-[#FFCC80]">
                  <TrendingUp size={16} />
                  <span className="font-bold text-xs uppercase tracking-wider">Progress {formatMonth(viewDate)}</span>
                </div>
                <span className="text-xl font-bold text-white">{Math.round(monthlyProgressPercentage).toFixed(1)}%</span>
              </div>
              <div className="h-3 w-full bg-[#3E2723]/50 rounded-full overflow-hidden border border-[#8D6E63]">
                <div 
                  className="h-full bg-gradient-to-r from-orange-400 to-yellow-300 transition-all duration-700 ease-out relative"
                  style={{ width: `${monthlyProgressPercentage}%` }}
                ></div>
              </div>
              <div className="mt-2 text-right">
                <span className="text-[#D7CCC8] text-xs font-medium italic">
                  {motivationStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            <CapybaraImage isHappy={isHappy} message={happyMessage} currentImageSrc={capybaraImages[currentImageIndex]} />
          </div>
        </div>
      </div>

      {/* --- Konten Utama (Tabel) --- */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-20">
        
        {/* KOLOM TABEL RUTINITAS */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-center relative z-30">
             <h2 className="text-xl font-bold text-[#8D6E63] flex items-center gap-2">
               <Calendar className="text-orange-400" size={24} /> 
               Tabel Rutinitas
             </h2>
             <form onSubmit={addHabit} className="flex items-center gap-1 bg-[#FFF8E1] p-1 pl-3 rounded-full shadow-sm border border-[#D7CCC8] hover:shadow-md transition-shadow relative z-50">
                <input 
                  type="text" 
                  value={newHabit} 
                  onChange={(e) => setNewHabit(e.target.value)} 
                  placeholder="Rutinitas" 
                  className="w-24 focus:w-48 transition-all px-1 py-1 bg-transparent focus:outline-none text-[#5D4037] text-sm font-medium placeholder-[#A1887F]" 
                />
                <button 
                  type="submit" 
                  className="bg-[#8D6E63] hover:bg-[#6D4C41] text-white p-1.5 rounded-full transition-colors shadow-sm cursor-pointer relative z-50"
                  title="Tambah"
                >
                  <Plus size={16} />
                </button>
             </form>
          </div>

          <div className="bg-[#FFF8E1] rounded-3xl shadow-xl overflow-hidden border border-[#D7CCC8] relative z-10">
            <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#D7CCC8]">
              <table className="w-full min-w-max border-collapse">
                <thead>
                  <tr className="bg-[#8D6E63] text-white">
                    <th className="sticky left-0 z-30 bg-[#8D6E63] p-3 text-left min-w-[50px]">No</th>
                    <th className="sticky left-[50px] z-30 bg-[#8D6E63] p-3 text-left min-w-[180px] border-r border-[#A1887F] shadow-lg">Rutinitas</th>
                    {daysArray.map((day) => (
                      <th key={day.date} className="p-1 text-center min-w-[38px] border-r border-[#A1887F]/30">
                        <div className="text-[8px] uppercase font-bold text-[#D7CCC8]">{day.dayName}</div>
                        <div className="text-xs font-bold">{day.date}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {habits.length === 0 ? (
                    <tr><td colSpan={daysArray.length + 2} className="p-8 text-center text-[#A1887F] italic opacity-60">Tambahkan rutinitas di atas! 👆</td></tr>
                  ) : (
                    habits.map((habit, index) => (
                      <tr key={habit.id} className="hover:bg-[#FFCC80]/10 transition-colors group">
                        <td className="sticky left-0 z-20 bg-[#FFF8E1] p-3 font-bold text-[#8D6E63] border-b border-[#D7CCC8]">{index + 1}</td>
                        <td className="sticky left-[50px] z-20 bg-[#FFF8E1] p-3 border-b border-[#D7CCC8] border-r border-[#D7CCC8] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-[#5D4037] text-sm truncate max-w-[120px]">{habit.name}</span>
                            <button onClick={() => deleteHabit(habit.id)} className="opacity-0 group-hover:opacity-100 text-[#EF9A9A] hover:text-red-500 transition-opacity"><Trash2 size={12} /></button>
                          </div>
                        </td>
                        {daysArray.map((day) => {
                          const isChecked = habit.checks[day.fullDate];
                          const isToday = day.fullDate === new Date().toISOString().split('T')[0];
                          return (
                            <td key={day.date} className={`p-1 text-center border-b border-[#EFEBE9] border-r border-dashed border-[#D7CCC8]/50 ${isToday ? 'bg-orange-50 ring-1 ring-inset ring-orange-200' : ''}`}>
                              <button
                                onClick={() => toggleCheck(habit.id, day.fullDate)}
                                className={`
                                  w-8 h-8 rounded-full flex items-center justify-center transition-all mx-auto cursor-pointer relative z-10
                                  ${isChecked 
                                    ? 'bg-[#FFB74D] text-white shadow-sm transform scale-110' 
                                    : 'bg-white border border-[#D7CCC8] text-transparent hover:bg-[#E0E0E0] hover:scale-105'}
                                `}
                              >
                                {isChecked ? <span className="text-[12px]">🍊</span> : '•'}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-[10px] text-[#A1887F] text-center italic">Geser tabel untuk melihat semua tanggal 👉</p>
        </div>

        {/* KOLOM BULLETIN BOARD */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#8D6E63] flex items-center gap-2">
              <StickyNote className="text-orange-400" size={24} /> 
              Bulletin Board
            </h2>
            <button onClick={testNotification} className="text-[#8D6E63]/50 hover:text-orange-500" title="Cek Notifikasi"><Bell size={18}/></button>
          </div>
          
          <div className="bg-[#B58E6B] rounded-3xl p-6 shadow-2xl border-4 border-[#8D6E63]/40 flex flex-col gap-6 min-h-[500px] relative overflow-hidden">
            <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cork-board.png")' }}></div>
            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.15)] pointer-events-none z-0"></div>

            <form onSubmit={addNote} className="flex flex-col gap-3 relative z-10">
              <textarea 
                value={newNote} 
                onChange={(e) => setNewNote(e.target.value)} 
                placeholder="Ada rencana atau tugas besok? Tulis di sini..." 
                className="w-full p-4 rounded-xl bg-white/95 border-2 border-[#D7CCC8] focus:outline-none focus:border-[#FFB74D] text-sm text-[#5D4037] h-28 shadow-lg resize-none placeholder-[#A1887F]/60"
              />
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 flex-1 bg-white/95 border-2 border-[#D7CCC8] rounded-full px-4 py-2 shadow-sm">
                   <Calendar size={16} className="text-[#A1887F]" />
                   <input 
                     type="datetime-local" 
                     value={reminderTime} 
                     onChange={(e) => setReminderTime(e.target.value)} 
                     className="bg-transparent text-xs font-bold focus:outline-none text-[#5D4037] w-full"
                   />
                </div>
                <button type="submit" className="bg-[#FFB74D] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-[#FFA726] hover:scale-105 active:scale-95 transition-all">
                  Pin!
                </button>
              </div>
            </form>

            <div className="flex flex-col gap-2 overflow-y-auto pr-2 relative z-10 max-h-[600px] scrollbar-thin scrollbar-thumb-[#8D6E63]/40">
              {notes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 opacity-40">
                  <StickyNote size={56} className="text-[#5D4037] mb-3" />
                  <p className="text-center text-[#5D4037] text-sm font-black tracking-widest uppercase">Papan Pin Kosong</p>
                  <p className="text-[10px] text-[#5D4037] mt-1 italic">Tulis catatan di atas untuk memulai</p>
                </div>
              ) : (
                notes.map((note) => (
                  <StickyNoteItem 
                    key={note.id} 
                    note={note} 
                    onDelete={deleteNote} 
                    onToggle={toggleNote}
                  />
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}