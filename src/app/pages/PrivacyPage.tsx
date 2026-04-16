import React from 'react';
import { Link } from 'react-router';
import { FaCaretLeft } from 'react-icons/fa';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-[#04040f] text-white/80 font-sans p-6 md:p-12 relative overflow-y-auto">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[30%] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto w-full glass-panel p-8 md:p-12 rounded-[24px] border border-white/10 bg-white/5 shadow-2xl relative z-10 mt-safe">
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white/90 transition-colors mb-8 text-sm font-bold tracking-widest uppercase mb-6 drop-shadow-md">
          <FaCaretLeft /> Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-black text-white/90 mb-8 border-b border-white/10 pb-4 tracking-tight">Privacy Policy</h1>
        
        <div className="space-y-8 text-sm leading-relaxed text-white/70">
          <section>
            <h2 className="text-xl font-bold text-white/80 mb-3 tracking-wide">1. Information We Collect</h2>
            <p>
              ModiLander is designed primarily for entertainment. We do <strong>not</strong> actively collect personally identifiable information (PII) such as names, addresses, or phone numbers unless you explicitly provide them to us (e.g., via a contact form or email).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white/80 mb-3 tracking-wide">2. Use of Cookies and Web Beacons</h2>
            <p>
              We use cookies to personalize content and ads, to provide social media features, and to analyze our traffic. 
              A "cookie" is a small data file transferred to your device that recognizes and identifies your browser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white/80 mb-3 tracking-wide">3. Third-Party Advertising (Google AdSense)</h2>
            <p>
              We use third-party advertising companies, including Google AdSense, to serve ads when you visit our website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Google, as a third-party vendor, uses cookies to serve ads on our site.</li>
              <li>Google's use of the DART cookie enables it to serve ads to our users based on previous visits to our site and other sites on the Internet.</li>
              <li>Users may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white/80 mb-3 tracking-wide">4. External Links</h2>
            <p>
              Our website may contain links to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white/80 mb-3 tracking-wide">5. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <p className="text-xs text-white/40 pt-6 mt-6 border-t border-white/5">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
};
