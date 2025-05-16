import React, { useState, useRef } from 'react';
import './Contact.css';
import { FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import emailjs from 'emailjs-com';

function Contact() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill all fields');
      return;
    }

    emailjs.sendForm(
      'service_o1cgr78',      // Replace with your EmailJS Service ID
      'template_e6z68jd',     // Replace with your EmailJS Template ID
      formRef.current,
      'CfjDSJ2B2Ne-yxsKi'       // Replace with your EmailJS Public Key (User ID)
    )
    .then(() => {
      setStatus('Thank you for your message! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    }, () => {
      setStatus('Oops! Something went wrong, please try again later.');
    });
  };

  return (
    <section className="contact" id="contact">
      <h2>Contact Me</h2>

      <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
        />

        <button type="submit">Send Message</button>
      </form>

      {status && <p className="status-message">{status}</p>}

      <div className="contact-buttons">
        <a
          href="https://wa.me/7700072367"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          <FaWhatsapp style={{ marginRight: '8px' }} />
          Chat on WhatsApp
        </a>

        <a
          href="https://www.linkedin.com/in/mohammed-jagda-abb421222"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin-btn"
        >
          <FaLinkedin style={{ marginRight: '8px' }} />
          Connect on LinkedIn
        </a>
      </div>
    </section>
  );
}

export default Contact;
