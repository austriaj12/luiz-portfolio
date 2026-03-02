"use client";
import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import profilePic from "../assets/logopicture.jpg";
import cert1 from "../assets/AI + YOU CAREER IN COMPUTER SCIENCE.jpg";
import resumePic from "../assets/RESUME - AUSTRIAJOHNLUIZS.jpg";
import project1 from "../assets/Projects/Fittech/web1.png";
import project2 from "../assets/Projects/Fittech/web2.png";

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

  const handleRipple = (event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("ripple");

    const existingRipple = button.querySelector(".ripple");
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);
  };

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

      {/* Main Content Sections */}
      <div className="max-w-6xl mx-auto p-6 md:p-12 mt-10 relative z-20 space-y-24">

        {/* Work Experience Section (From Figma) */}
        <section>
          <h2 className="text-3xl font-bold mb-10 text-center lg:text-left animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out">Work Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Experience Card 1 (Leadership) */}
            <div
              onClick={handleRipple}
              className={`p-8 rounded-3xl shadow-sm border transition-colors relative overflow-hidden animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out group cursor-pointer ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800/80' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
            >
              <div className="flex gap-6 items-start">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-[#2A1B54]' : 'bg-indigo-100'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Youth President</h3>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>TLSCF Church • Project Management & Mentorship</p>
                  <button className={`px-5 py-2 rounded-full text-xs font-bold transition-colors ${isDarkMode ? 'bg-indigo-900/50 hover:bg-indigo-800 text-indigo-200' : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'}`}>LEARN MORE</button>
                </div>
              </div>
            </div>

            {/* Experience Card 2 (Education/About) */}
            <div
              onClick={handleRipple}
              className={`p-8 rounded-3xl shadow-sm border transition-colors relative overflow-hidden animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out group cursor-pointer ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800/80' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
            >
              <div className="flex gap-6 items-start">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-[#2A1B54]' : 'bg-purple-100'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">BS Computer Science</h3>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>University of Rizal System • 2021 - 2026</p>
                  <button className={`px-5 py-2 rounded-full text-xs font-bold transition-colors ${isDarkMode ? 'bg-purple-900/50 hover:bg-purple-800 text-purple-200' : 'bg-purple-50 hover:bg-purple-100 text-purple-700'}`}>LEARN MORE</button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Featured Projects Section (From Figma) */}
        <section className="space-y-16">
          <h2 className="text-3xl font-bold text-center lg:text-left animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out">Featured Projects</h2>

          {/* Project 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out">
            <div className={`flex-1 p-8 rounded-3xl shadow-lg border relative overflow-hidden w-full ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="relative z-10 w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center">
                {/* FITTECH Image */}
                <Image
                  src={project1}
                  alt="FITTECH Project Preview"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500 cursor-pointer"
                  onClick={() => setViewingImage(project1)}
                />
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <div>
                <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-2">Featured Project</p>
                <h3 className="text-4xl font-bold">FITTECH</h3>
              </div>
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Near Field Communication (NFC) Empowered Gym Management & AI-Enhanced Personal Training. A comprehensive system integrating hardware and software to streamline fitness workflows.
              </p>
            </div>
          </div>

          {/* Project 2 */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out">
            <div className="flex-1 space-y-6 lg:text-right">
              <div>
                <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-2">Featured Project</p>
                <h3 className="text-4xl font-bold">AklatURSM</h3>
              </div>
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                A comprehensive Library Management System built for the University. Designed to handle book tracking, user borrowing history, and inventory management efficiently.
              </p>
            </div>
            <div className={`flex-1 p-8 rounded-3xl shadow-lg border relative overflow-hidden w-full ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="relative z-10 w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center">
                {/* AklatURSM Image */}
                <Image
                  src={project2}
                  alt="AklatURSM Project Preview"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500 cursor-pointer"
                  onClick={() => setViewingImage(project2)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Certificates & Extra Info Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`p-8 rounded-3xl shadow-sm border transition-colors cursor-pointer relative overflow-hidden animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
              onClick={(e) => {
                handleRipple(e);
                setViewingImage(cert1);
              }}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-yellow-500"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
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
              <p className={`mt-4 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>AI + YOU Career in Computer Science</p>
            </div>

            <a
              href="https://www.google.com/maps/place/Binangonan,+Rizal" target="_blank" rel="noopener noreferrer"
              onClick={handleRipple}
              className="bg-gradient-to-br from-cyan-500 to-blue-600 p-8 rounded-3xl shadow-sm text-white flex flex-col justify-between hover:brightness-110 transition-all relative overflow-hidden animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out"
            >
              <div>
                <h3 className="text-lg font-bold opacity-90 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 opacity-75"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                  Based in
                </h3>
                <p className="text-3xl font-bold mt-2">Binangonan, Rizal</p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm font-bold bg-white/20 w-fit px-4 py-2 rounded-full backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                Open Map
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute top-10 -left-10 w-32 h-32 bg-cyan-300/20 rounded-full blur-xl"></div>
            </a>
          </div>
        </section>

        {/* Contact Section (From Figma) */}
        <section className="pt-10 border-t border-slate-800/50 pb-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-6 animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out">Contact</h2>
            <p className={`text-lg mb-8 animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              I&apos;m currently looking to join a cross-functional team that values improving people&apos;s lives through robust design and architecture. Or have a project in mind? Let&apos;s connect.
            </p>
            <p className="font-bold text-xl mb-6 animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out">johnluizaustria@gmail.com</p>
            <div className="flex gap-4 animate-on-scroll opacity-0 translate-y-8 duration-700 ease-out">
              <a href="mailto:johnluizaustria@gmail.com" className={`p-4 rounded-full transition-colors ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </a>
              <a href="https://www.facebook.com/Austriajohnluiz25" target="_blank" rel="noopener noreferrer" className={`p-4 rounded-full transition-colors ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="tel:+639457742361" className={`p-4 rounded-full transition-colors ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </a>
            </div>
          </div>
        </section>
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
    </main>
  );
}