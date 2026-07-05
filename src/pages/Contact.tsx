import React, { useState } from 'react';

const Contact = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitted'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitted');
  };

  return (
    <div className="content-section animate-fade-in">
      <h1 className="mb-2">Contact Us</h1>
      <p className="mb-6">Have a question, feedback, or found a bug? We'd love to hear from you.</p>
      
      <div className="mb-8 p-4" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <h3 className="mb-2">Direct Contact</h3>
        <p className="mb-0">You can email us directly at: <a href="mailto:support@calculora.com">support@calculora.com</a></p>
      </div>

      {formStatus === 'submitted' ? (
        <div className="p-6 text-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--accent-secondary)', borderRadius: 'var(--radius-md)' }}>
          <h3 style={{ color: 'var(--accent-secondary)' }} className="mb-2">Message Sent!</h3>
          <p className="mb-0">Thank you for reaching out. We will get back to you within 24-48 hours.</p>
          <button className="btn btn-primary mt-4" onClick={() => setFormStatus('idle')}>Send Another Message</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="name">Your Name</label>
            <input type="text" id="name" required className="input-field" placeholder="John Doe" />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="email">Email Address</label>
            <input type="email" id="email" required className="input-field" placeholder="john@example.com" />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="subject">Subject</label>
            <input type="text" id="subject" required className="input-field" placeholder="How can we help?" />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="message">Message</label>
            <textarea id="message" required className="input-field" rows={5} placeholder="Your message here..."></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
        </form>
      )}
    </div>
  );
};

export default Contact;
