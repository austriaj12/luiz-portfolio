"use client";
import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import profilePic from "../assets/logopicture.jpg";
import cert1 from "../assets/AI + YOU CAREER IN COMPUTER SCIENCE.jpg";
import resumePic from "../assets/RESUME - AUSTRIAJOHNLUIZS.jpg";
import project1 from "../assets/Projects/Fittech/web1.png";
import project2 from "../assets/Projects/Fittech/web2.png";
import Chatbot from "./components/Chatbot";

const AnimatedText = ({ text, className = "", delayStart = 0 }: { text: string, className?: string, delayStart?: number }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          style={{ transitionDelay: `${delayStart + index * 0.03}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

const TechBadge = ({ label, from, to, shadow }: { label: string, from: string, to: string, shadow: string }) => (
  <div
    className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${from} ${to} border border-white/20 flex items-center justify-center font-bold text-white text-lg md:text-2xl backdrop-blur-md transition-transform hover:scale-110 cursor-pointer`}
    style={{ boxShadow: `0 0 20px ${shadow}` }}
    title={label}
  >
    {label}
  </div>
);

const techBadges = [
  { label: 'JS', from: 'from-amber-400', to: 'to-yellow-600', shadow: 'rgba(250,204,21,0.5)' },
  { label: 'Py', from: 'from-blue-500', to: 'to-blue-700', shadow: 'rgba(59,130,246,0.5)' },
  { label: 'TW', from: 'from-cyan-400', to: 'to-cyan-600', shadow: 'rgba(34,211,238,0.5)' },
  { label: 'PHP', from: 'from-indigo-400', to: 'to-indigo-600', shadow: 'rgba(99,102,241,0.5)' },
  { label: 'SQL', from: 'from-orange-400', to: 'to-red-600', shadow: 'rgba(249,115,22,0.5)' },
  { label: 'Node', from: 'from-green-500', to: 'to-emerald-700', shadow: 'rgba(34,197,94,0.5)' },
  { label: 'C#', from: 'from-purple-500', to: 'to-pink-700', shadow: 'rgba(168,85,247,0.5)' },
  { label: 'Git', from: 'from-red-500', to: 'to-rose-700', shadow: 'rgba(239,68,68,0.5)' },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [viewingImage, setViewingImage] = useState<string | StaticImageData | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOutSplash, setFadeOutSplash] = useState(false);
  const [redirectModalData, setRedirectModalData] = useState<{ title: string, message: string, url: string } | null>(null);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOutSplash(true);
      setTimeout(() => setShowSplash(false), 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showSplash) return;

    const observer = new IntersectionObserver((entries) => {
      // Group entries that intersect at the exact same time
      const intersectingEntries = entries.filter(entry => entry.isIntersecting);
      intersectingEntries.forEach((entry, index) => {
        // Add staggered delay class based on index before removing opacity-0
        if (index > 0) {
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${index * 150}ms`;
        }
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [showSplash, isDarkMode]);



  return (
    <main className={`min-h-screen font-sans transition-colors duration-300 overflow-x-hidden ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {showSplash && (
        <div className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-500 ${fadeOutSplash ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="text-center space-y-4 animate-in fade-in zoom-in duration-700 px-6">
            <h1 className="text-xl md:text-6xl font-bold tracking-tight"><AnimatedText text="John Luiz Sierra Austria" delayStart={0.3} /></h1>
            <p className="text-xs md:text-2xl text-slate-400"><AnimatedText text="Aspiring Software & Web Developer" delayStart={1.0} /></p>
          </div>
        </div>
      )}

      {/* Floating Theme Toggle */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full shadow-lg transition-all shrink-0 backdrop-blur-md ${isDarkMode ? 'bg-slate-800/80 text-yellow-400 hover:bg-slate-700' : 'bg-white/80 text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
          )}
        </button>
      </div>

      {/* Hero Section */}
      <section className={`relative min-h-[90vh] flex items-center justify-center pt-16 pb-8 md:pt-24 md:pb-12 overflow-hidden ${isDarkMode ? '' : 'bg-white/50'}`}>
        {/* Decorative Grid Background */}
        <div className={`absolute inset-0 z-0 ${isDarkMode ? 'bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]'} bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)]`}></div>

        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Left Hero Text */}
          <div className="flex flex-col items-center lg:items-start gap-2 md:gap-4 z-20 text-center lg:text-left mt-8 lg:mt-0 order-2 lg:order-1">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter">
              JOHN LUIZ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600 drop-shadow-sm">AUSTRIA</span>
            </h1>
            <p className={`text-base md:text-xl max-w-sm md:max-w-md mt-4 md:mt-6 mx-auto lg:mx-0 font-medium leading-snug md:leading-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              An Aspiring Software & Web Developer building efficient, performant, and dynamic digital experiences.
            </p>
            <div className="mt-6 md:mt-8 flex flex-row gap-3 md:gap-4 justify-center lg:justify-start w-full sm:w-auto">
              <button
                onClick={() => setViewingImage(resumePic)}
                className="px-6 py-3 md:px-8 md:py-4 text-sm md:text-base bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                View Resume
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className={`px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold rounded-full transition-all hover:scale-105 border-2 ${isDarkMode ? 'border-slate-700 text-white hover:border-slate-500 hover:bg-slate-800' : 'border-slate-300 text-slate-900 hover:border-slate-400 hover:bg-slate-100'}`}
              >
                Let&apos;s Connect
              </button>
            </div>
          </div>

          {/* Right Hero - Orbit Layout */}
          <div className="relative h-[300px] md:h-[450px] lg:h-[600px] flex items-center justify-center orbit-container mt-6 lg:mt-0 order-1 lg:order-2">

            {/* Center Profile Image */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full z-10 border-4 border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.3)] group cursor-pointer" onClick={() => setViewingImage(profilePic)}>
              <Image
                src={profilePic}
                alt="John Luiz Sierra Austria"
                fill
                className="object-cover rounded-full group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-cyan-500/20 to-transparent pointer-events-none"></div>
            </div>

            {/* Orbit Rings */}
            <div className={`absolute w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] lg:w-[550px] lg:h-[550px] border-2 rounded-full border-dashed ${isDarkMode ? 'border-slate-700/50' : 'border-slate-300'}`}></div>
            <div className={`absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px] border border-solid rounded-full ${isDarkMode ? 'border-cyan-500/20' : 'border-cyan-500/30'}`}></div>

            {/* Orbiting Badges Container */}
            <div className="absolute top-1/2 left-1/2 w-0 h-0 z-20 animate-orbit">
              {techBadges.map((tech, index) => {
                const angle = (index * 360) / techBadges.length;
                return (
                  <div
                    key={tech.label}
                    className="absolute -ml-7 -mt-7 md:-ml-10 md:-mt-10"
                    style={{
                      transform: `rotate(${angle}deg) translateX(var(--orbit-radius))`,
                    }}
                  >
                    {/* Counter-rotate to stay upright */}
                    <div className="w-full h-full animate-orbit-reverse flex items-center justify-center" style={{ transform: `rotate(-${angle}deg)` }}>
                      <TechBadge {...tech} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Bento Box Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 mb-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-max">

          {/* --- ROW 1 --- */}

          {/* 1. Tech Arsenal (Col 1) */}
          <div className={`p-6 rounded-[2rem] flex flex-col items-center justify-center border animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out transition-colors ${isDarkMode ? 'bg-[#0f1115] border-slate-800 hover:bg-[#16191f]' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
            <div className="text-center mb-6">
              <p className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> My Stacks</p>
              <h3 className="text-lg font-bold">Tech Arsenal</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full">
              {['React', 'Next.js', 'Tailwind', 'Node.js', 'Python', 'SQL'].map(tech => (
                <div key={tech} className={`flex items-center justify-center py-2 px-3 rounded-xl text-xs font-bold shadow-sm ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* 2. Stats (Col 2 & 3) */}
          <div className="md:col-span-2 grid grid-cols-3 gap-4 h-full">
            {[
              { label: 'Projects', value: '10+', icon: '🚀' },
              { label: 'Experience', value: '1+ Yr', icon: '⭐' },
              { label: 'Freelance', value: '100%', icon: '💼' }
            ].map((stat, i) => (
              <div key={i} className={`p-6 flex flex-col items-center justify-center rounded-[2rem] border animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out transition-colors ${isDarkMode ? 'bg-[#0f1115] border-slate-800 hover:bg-[#16191f]' : 'bg-white border-slate-200 hover:bg-slate-50'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <h3 className="text-3xl lg:text-5xl font-black mb-2 tracking-tighter">{stat.value}</h3>
                <p className={`text-xs font-bold uppercase tracking-wide flex items-center gap-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}><span>{stat.icon}</span> {stat.label}</p>
              </div>
            ))}
          </div>

          {/* 3. Services (Col 4) */}
          <div className={`p-6 rounded-[2rem] flex flex-col border animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out transition-colors ${isDarkMode ? 'bg-[#0f1115] border-slate-800 hover:bg-[#16191f]' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
            <div className="text-center mb-6">
              <p className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg> Services</p>
              <h3 className="text-lg font-bold">Solutions Suite</h3>
            </div>
            <div className="space-y-3 flex-1 flex flex-col justify-center">
              {['Frontend Development', 'Backend Systems', 'UI/UX Implementation'].map((svc, i) => (
                <div key={i} className={`text-sm font-semibold p-3 rounded-xl flex items-center gap-3 ${isDarkMode ? 'bg-slate-800/50 text-slate-300' : 'bg-slate-50 text-slate-700'}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>{svc}
                </div>
              ))}
            </div>
          </div>

          {/* --- ROW 2 & 3 --- */}

          {/* 4. Projects Gallery (Col 1, Span Row 2) */}
          <div className={`md:col-span-1 row-span-2 p-6 rounded-[2rem] border animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out flex flex-col items-center group transition-colors overflow-hidden relative ${isDarkMode ? 'bg-[#0f1115] border-slate-800 hover:bg-[#16191f]' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
            <div className="text-center mb-6 relative z-10 w-full">
              <p className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg> Projects</p>
              <h3 className="text-lg font-bold">Works Gallery</h3>
            </div>
            <div className="flex-1 w-full space-y-4 relative z-10">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-slate-700/50 cursor-pointer" onClick={() => setViewingImage(project1)}>
                <Image src={project1} alt="FITTECH Project" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3"><p className="text-white text-xs font-bold">FITTECH</p></div>
              </div>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-slate-700/50 cursor-pointer" onClick={() => setViewingImage(project2)}>
                <Image src={project2} alt="AklatURSM Project" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3"><p className="text-white text-xs font-bold">AklatURSM</p></div>
              </div>
            </div>
            <div className="mt-8 w-full z-10">
              <button className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors shadow-lg shadow-purple-900/20 text-sm">View All Works</button>
            </div>
            {/* Soft background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none"></div>
          </div>

          {/* 5. Center Profile Card (Col 2 & 3, Span Row 2) */}
          <div className={`md:col-span-2 row-span-2 p-8 lg:p-10 rounded-[2.5rem] border animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out flex flex-col justify-between transition-colors shadow-sm relative overflow-hidden ${isDarkMode ? 'bg-[#0f1115] border-slate-800 hover:bg-[#16191f]' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>

            {/* Header */}
            <div className="flex justify-between items-center mb-10 relative z-10">
              <div className={`px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold border ${isDarkMode ? 'bg-emerald-950/30 text-emerald-400 border-emerald-800' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Available to Work
              </div>
              <button onClick={() => setViewingImage(resumePic)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}>
                Resume <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
              <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-3xl md:rounded-[2rem] rotate-3 opacity-20"></div>
                <Image src={profilePic} alt="Profile" fill className="object-cover rounded-3xl md:rounded-[2rem] border-4 border-slate-900 shadow-xl relative z-10 cursor-pointer hover:scale-105 transition-transform" onClick={() => setViewingImage(profilePic)} />
              </div>
              <div className="text-center md:text-left mt-2 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-2">John Luiz Austria</h2>
                <p className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">I&apos;m a Developer Intern &amp; Freelancer</p>
              </div>
            </div>

            {/* Chips/Tags */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-10 relative z-10">
              {[
                { icon: '📍', text: 'Binangonan, Rizal' },
                { icon: '🗣', text: 'English & Tagalog' },
                { icon: '🎓', text: 'BSCS - URSM' },
                { icon: '💻', text: 'Full Stack Dev' }
              ].map((chip, i) => (
                <div key={i} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border ${isDarkMode ? 'bg-slate-800/50 border-slate-700/50 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                  <span>{chip.icon}</span> {chip.text}
                </div>
              ))}
            </div>

            {/* Footer Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-10 relative z-10">
              <button onClick={() => setIsModalOpen(true)} className={`group py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                Let&apos;s Talk
              </button>
              <a href="mailto:johnluizaustria@gmail.com" className="py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                Email Me
              </a>
            </div>

            {/* Glow Background inside specific to deep dark theme */}
            {isDarkMode && <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>}
          </div>

          {/* 6. Work Experience (Col 4, Span row 2) */}
          <div className={`md:col-span-1 row-span-2 p-6 rounded-[2rem] border animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out flex flex-col transition-colors ${isDarkMode ? 'bg-[#0f1115] border-slate-800 hover:bg-[#16191f]' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
            <div className="text-center mb-8">
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg> Experience</p>
              <h3 className="text-lg font-bold">Track Record</h3>
            </div>

            <div className="flex-1 space-y-6 relative">
              {/* Timeline line */}
              <div className={`absolute left-[19px] top-2 bottom-6 w-0.5 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}></div>

              <div className="relative pl-12">
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></span>
                </div>
                <h4 className="font-bold text-base leading-tight mb-1">Youth President</h4>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>TLSCF Church • Projects</p>
              </div>

              <div className="relative pl-12">
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center z-10">
                  <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                </div>
                <h4 className="font-bold text-base leading-tight mb-1">Freelance Dev</h4>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Self-Employed • Remote</p>
              </div>

              <div className="relative pl-12">
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-500" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                </div>
                <h4 className="font-bold text-base leading-tight mb-1">BSCS Student</h4>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Rizal System • 2021-26</p>
              </div>
            </div>
          </div>

          {/* --- ROW 4 --- */}

          {/* 7. Certificates (Col 1 & 2) */}
          <div className={`md:col-span-2 p-6 rounded-[2rem] border animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out flex flex-col sm:flex-row items-center gap-6 transition-colors group cursor-pointer ${isDarkMode ? 'bg-[#0f1115] border-slate-800 hover:bg-[#16191f]' : 'bg-white border-slate-200 hover:bg-slate-50'}`} onClick={() => setViewingImage(cert1)}>
            <div className="w-full sm:w-1/2 aspect-video relative rounded-xl overflow-hidden border border-slate-700/50 shadow-md">
              <Image src={cert1} alt="Certificate" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="w-full sm:w-1/2 text-center sm:text-left">
              <p className="text-yellow-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-center sm:justify-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg> Achievements</p>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:leading-snug">AI + YOU Career in Computer Science</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Official Certification completed proving skills in digital landscape.</p>
            </div>
          </div>

          {/* 8. Let's Work Together Banner (Col 3 & 4) */}
          <div className={`md:col-span-2 p-8 rounded-[2rem] border animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out flex flex-col justify-center items-center text-center transition-colors shadow-lg relative overflow-hidden ${isDarkMode ? 'bg-[#0f1115] border-slate-800 hover:bg-[#16191f]' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
            <div className="z-10 relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              </div>
              <h2 className="text-3xl font-black tracking-tight mb-2">Let&apos;s Work Together</h2>
              <p className={`text-sm md:text-base max-w-sm mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Available for internship roles immediately. Let&apos;s make magic happen together!</p>
              <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-white text-black hover:bg-slate-200 rounded-full font-bold transition-all shadow-xl hover:scale-105 active:scale-95 text-sm uppercase tracking-widest">
                Schedule a Call
              </button>
            </div>

            {/* Soft background glow */}
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] pointer-events-none z-0 ${isDarkMode ? 'bg-blue-600/10' : 'bg-blue-100/50'}`}></div>
          </div>

        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
          <div className={`rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsModalOpen(false)}
              className={`absolute top-4 right-4 p-2 ${isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Let&apos;s Connect</h3>

            <div className="space-y-3">
              <a href="mailto:johnluizaustria@gmail.com" className={`flex items-center gap-4 p-4 rounded-2xl border transition group ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-slate-50 border-slate-100 hover:bg-indigo-50 hover:border-indigo-100'}`}>
                <div className="bg-white p-3 rounded-full text-indigo-600 shadow-sm group-hover:scale-110 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Email</p>
                  <p className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>johnluizaustria@gmail.com</p>
                </div>
              </a>

              <a href="https://www.facebook.com/Austriajohnluiz25" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-4 rounded-2xl border transition group ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-slate-50 border-slate-100 hover:bg-blue-50 hover:border-blue-100'}`}>
                <div className="bg-white p-3 rounded-full text-blue-600 shadow-sm group-hover:scale-110 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Facebook</p>
                  <p className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>John Luiz Austria</p>
                </div>
              </a>

              <a href="tel:+639457742361" className={`flex items-center gap-4 p-4 rounded-2xl border transition group ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-slate-50 border-slate-100 hover:bg-emerald-50 hover:border-emerald-100'}`}>
                <div className="bg-white p-3 rounded-full text-emerald-600 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
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

      {redirectModalData && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className={`rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
            <h3 className="text-2xl font-bold">{redirectModalData.title}</h3>
            <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{redirectModalData.message}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setRedirectModalData(null)}
                className={`flex-1 py-3 rounded-xl font-bold transition ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}
              >
                Cancel
              </button>
              <a
                href={redirectModalData.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setRedirectModalData(null)}
                className={`flex-1 py-3 rounded-xl font-bold text-white transition ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-slate-900 hover:bg-slate-800'}`}
              >
                Continue
              </a>
            </div>
          </div>
        </div>
      )}

      {viewingImage && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setViewingImage(null)}>
          <button
            onClick={() => setViewingImage(null)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div className="relative w-full h-full max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={viewingImage}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        :root {
          --orbit-radius: 120px;
        }
        @media (min-width: 640px) {
          :root { --orbit-radius: 180px; }
        }
        @media (min-width: 1024px) {
          :root { --orbit-radius: 275px; }
        }

        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 600ms linear;
          background-color: rgba(255, 255, 255, 0.3);
          pointer-events: none;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-orbit {
          animation: orbit 25s linear infinite;
        }
        .animate-orbit-reverse {
          animation: orbit-reverse 25s linear infinite;
        }
        .orbit-container:hover .animate-orbit,
        .orbit-container:hover .animate-orbit-reverse {
          animation-play-state: paused;
        }
      `}</style>

      {/* Floating AI Chatbot widget */}
      <Chatbot />
    </main>
  );
}