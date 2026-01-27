"use client";
import { useState } from "react";
import Image from "next/image";
import profilePic from "../assets/logopicture.jpg";
import cert1 from "../assets/AI + YOU CAREER IN COMPUTER SCIENCE.jpg";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <main className={`min-h-screen p-6 md:p-12 font-sans transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header / Intro */}
        <header className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <div className="flex flex-row items-center gap-4 pr-14 md:pr-0">
            <div className="relative w-16 h-16 md:w-24 md:h-24 shrink-0 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
              <Image 
                src={profilePic} 
                alt="John Luiz Sierra Austria" 
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <h1 className="text-xl md:text-5xl font-bold tracking-tight mb-1 md:mb-2">John Luiz Sierra Austria</h1>
              <p className={`text-sm md:text-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Aspiring Software & Web Developer | CS Student</p>
            </div>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className={`absolute top-0 right-0 md:static p-3 rounded-full shadow-sm transition-all shrink-0 ${isDarkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
        </header>

        {/* BENTO GRID LAYOUT starts here */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          
          {/* CARD 1: About Me (Large, spans 2 columns, 2 rows) */}
          <div className={`md:col-span-2 md:row-span-2 p-8 rounded-3xl shadow-sm border flex flex-col justify-between transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-indigo-500"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                About Me
              </h2>
              <div className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} leading-relaxed text-base md:text-lg space-y-4`}>
                <p>
                  I am a dedicated <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Computer Science student</strong> at the University of Rizal System (Class of 2026) with a strong passion for <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>software and web development</strong>. I possess a versatile technical skillset, including proficiency in <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Node.js, PHP, MySQL, Java, and Python</strong>, along with modern front-end design using <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Tailwind CSS</strong>.
                </p>
                <p>
                  My academic journey is highlighted by my capstone project, <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>'FITTECH'</strong>, where I successfully integrated hardware and software by developing a gym management system powered by <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Near Field Communication (NFC)</strong> and <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>AI technology</strong>. Beyond coding, I am a proactive leader with experience as a <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Youth President</strong>, where I honed my <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>project management</strong>, mentorship, and communication skills.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <button 
                onClick={() => setIsModalOpen(true)}
                className={`inline-block px-6 py-3 rounded-full font-medium transition ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* CARD 2: Projects (Spans 2 columns) */}
          <div className={`md:col-span-2 p-8 rounded-3xl shadow-sm text-white relative overflow-hidden group transition-colors ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-slate-900'}`}>
            <div className="relative z-10 flex flex-col gap-5">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                Projects
              </h3>
              <div>
                <h4 className="text-lg font-bold text-indigo-300">FITTECH</h4>
                <p className="text-slate-300 text-sm leading-snug">Near Field Communication (NFC) Empowered Gym Management & AI-Enhanced Personal Training.</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-indigo-300">AklatURSM</h4>
                <p className="text-slate-300 text-sm leading-snug">Library Management System.</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-indigo-300">NFC Cards Portfolio</h4>
                <p className="text-slate-300 text-sm leading-snug">Smart NFC cards for church invitations and digital portfolio sharing.</p>
              </div>
            </div>
            {/* Decorative Circle */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-slate-800 rounded-full opacity-50 group-hover:scale-110 transition duration-500"></div>
          </div>

          {/* CARD 3: Education */}
          <div className={`p-6 rounded-3xl shadow-sm border transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="text-lg font-bold mb-2">Education</h3>
            <p className="font-semibold text-lg">BS Computer Science</p>
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-sm`}>University of Rizal System</p>
            <p className={`${isDarkMode ? 'text-slate-500' : 'text-slate-600'} text-xs mt-1`}>2021 - 2026</p>
          </div>

          {/* CARD 4: Leadership */}
          <div className={`p-6 rounded-3xl shadow-sm border transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="text-lg font-bold mb-2">Leadership</h3>
            <p className="font-semibold text-lg">Youth President</p>
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-sm`}>TLSCF Church</p>
            <p className={`${isDarkMode ? 'text-slate-500' : 'text-slate-600'} text-xs mt-2`}>Project Management & Mentorship</p>
          </div>

           {/* CARD 5: Tech Stack (Wide card at bottom) */}
           <div className={`md:col-span-2 p-8 rounded-3xl shadow-sm text-white flex flex-col justify-center transition-colors ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-slate-900'}`}>
            <h3 className="text-xl font-bold mb-4 text-slate-400 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Tailwind CSS', 'MySQL', 'PHP', 'Java', 'Python', 'Git', 'SQL', 'HTML', 'JavaScript', 'C#', 'VB.NET'].map((tech) => (
                <span key={tech} className="bg-slate-800 px-4 py-2 rounded-lg text-sm font-medium border border-slate-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CARD 6: Location */}
           <div className="md:col-span-2 bg-linear-to-br from-orange-400 to-red-500 p-8 rounded-3xl shadow-sm text-white flex flex-col justify-between">
             <div>
                <h3 className="text-lg font-bold opacity-90 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 opacity-75"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  Based in
                </h3>
                <p className="text-2xl font-semibold">Binangonan, Rizal</p>
             </div>
          </div>

          {/* CARD 7: Certificates */}
          <div className={`md:col-span-2 p-8 rounded-3xl shadow-sm border transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-yellow-500"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
              Certificates
            </h3>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm group">
              <Image 
                src={cert1} 
                alt="AI + YOU Career in Computer Science" 
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <p className={`mt-3 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>AI + YOU Career in Computer Science</p>
          </div>

        </div>
      </div>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
          <div className={`rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsModalOpen(false)} 
              className={`absolute top-4 right-4 p-2 ${isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Let's Connect</h3>
            
            <div className="space-y-3">
              {/* Email */}
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=johnluizaustria@gmail.com" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-4 rounded-2xl border transition group ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-slate-50 border-slate-100 hover:bg-indigo-50 hover:border-indigo-100'}`}>
                <div className="bg-white p-3 rounded-full text-indigo-600 shadow-sm group-hover:scale-110 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Email</p>
                  <p className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>johnluizaustria@gmail.com</p>
                </div>
              </a>

              {/* Facebook / Social */}
              <a href="https://www.facebook.com/Austriajohnluiz25" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-4 rounded-2xl border transition group ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-slate-50 border-slate-100 hover:bg-blue-50 hover:border-blue-100'}`}>
                <div className="bg-white p-3 rounded-full text-blue-600 shadow-sm group-hover:scale-110 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Facebook</p>
                  <p className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>John Luiz Austria</p>
                </div>
              </a>

              {/* Phone (Placeholder) */}
              <a href="tel:+639457742361" className={`flex items-center gap-4 p-4 rounded-2xl border transition group ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-slate-50 border-slate-100 hover:bg-emerald-50 hover:border-emerald-100'}`}>
                <div className="bg-white p-3 rounded-full text-emerald-600 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Phone</p>
                  <p className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>+63 945 774 2361</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}