import React, { useState } from 'react';
import { X, Mail, Check, Copy, Send, Linkedin, Github, Youtube, Globe } from 'lucide-react';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    area: 'Software development & product engineering',
    message: '',
  });

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText('patrick@uplexai.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-[#060c1c] border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/40 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#040814]/80">
          <div className="flex items-center gap-2">
            <span className="font-mono-tag text-xs text-cyan-400">// LET'S CONNECT</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/80 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Start a Conversation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Have a project, partnership, or idea? Reach out directly or send a message below.
            </p>
          </div>

          {/* Quick Copy Email Card */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Direct Email:</span>
              <strong className="text-white font-mono-tag">patrick@uplexai.com</strong>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-cyan-300 hover:text-white bg-slate-900 border border-cyan-500/40 rounded-lg transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="p-6 rounded-2xl bg-[#041224] border border-cyan-500/50 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-lg font-bold text-white">Message Sent Successfully!</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Thank you for reaching out, {formData.name || 'friend'}. Patrick will review your inquiry and get back to you promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Banda"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:outline-none text-white text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@organization.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:outline-none text-white text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Area of Collaboration</label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:outline-none text-white text-xs sm:text-sm"
                >
                  <option value="Software development & product engineering">Software development & product engineering</option>
                  <option value="AI applications & automation">AI applications & automation</option>
                  <option value="Research & technology innovation">Research & technology innovation</option>
                  <option value="Business systems & digital transformation">Business systems & digital transformation</option>
                  <option value="Other Inquiries / Speaking / Mentorship">Other Inquiries / Speaking / Mentorship</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about what you are building or exploring..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:outline-none text-white text-xs sm:text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] cursor-pointer"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          )}

          {/* Social Row */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-center gap-6 text-slate-400 text-xs">
            <a
              href="https://linkedin.com/in/patrick-mulenga"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/patrick-mulenga"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://youtube.com/@techwithpatrick"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <Youtube className="w-3.5 h-3.5" />
              <span>YouTube</span>
            </a>
            <a
              href="https://www.uplexai.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>UpleX AI</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
