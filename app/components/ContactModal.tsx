"use client";
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    isDarkMode: boolean;
}

export default function ContactModal({ isOpen, onClose, isDarkMode }: ContactModalProps) {
    const form = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    if (!isOpen) return null;

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        setIsSubmitting(true);
        setSubmitStatus("idle");

        const SERVICE_ID = "service_rm40fbn";
        const TEMPLATE_ID = "template_0n5551n";
        const PUBLIC_KEY = "7O6TRdx_IOWOdGzdu";

        emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
                publicKey: PUBLIC_KEY,
            })
            .then(
                () => {
                    setIsSubmitting(false);
                    setSubmitStatus("success");
                    form.current?.reset();
                    // Optional: automatically close after success
                    setTimeout(() => {
                        onClose();
                        setSubmitStatus("idle");
                    }, 3000);
                },
                (error) => {
                    console.error("EmailJS Error:", error);
                    setIsSubmitting(false);
                    setSubmitStatus("error");
                },
            );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                className={`rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200 ${isDarkMode ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-white border text-slate-900'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className={`absolute top-4 right-4 p-2 transition-colors rounded-full ${isDarkMode ? 'text-slate-500 hover:bg-slate-800 hover:text-slate-300' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <div className="mb-6">
                    <h3 className={`text-2xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Schedule a Call</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Fill out the form below and I&apos;ll receive an email notification immediately!
                    </p>
                </div>

                {submitStatus === "success" ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                        <p className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Thank you! I will get back to you shortly.</p>
                    </div>
                ) : (
                    <form ref={form} onSubmit={sendEmail} className="space-y-4">
                        <div>
                            <label htmlFor="user_name" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Your Name</label>
                            <input
                                type="text"
                                name="user_name"
                                id="user_name"
                                required
                                className={`w-full px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-shadow ${isDarkMode ? 'bg-slate-950/50 border border-slate-800 text-white placeholder-slate-600' : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400'}`}
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label htmlFor="user_email" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Your Email</label>
                            <input
                                type="email"
                                name="user_email"
                                id="user_email"
                                required
                                className={`w-full px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-shadow ${isDarkMode ? 'bg-slate-950/50 border border-slate-800 text-white placeholder-slate-600' : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400'}`}
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Project Details</label>
                            <textarea
                                name="message"
                                id="message"
                                required
                                rows={4}
                                className={`w-full px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-shadow resize-none ${isDarkMode ? 'bg-slate-950/50 border border-slate-800 text-white placeholder-slate-600' : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400'}`}
                                placeholder="I'd like to talk about..."
                            ></textarea>
                        </div>

                        {submitStatus === "error" && (
                            <p className="text-red-500 text-sm font-bold">Failed to send message. Please try again later.</p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isSubmitting
                                ? (isDarkMode ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700' : 'bg-slate-200 text-slate-500 cursor-not-allowed')
                                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20 active:scale-[0.98]'
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
