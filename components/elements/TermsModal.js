import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

const TermsModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Terms and Conditions"
      style={{
        content: {
          maxWidth: '700px',
          margin: 'auto',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative'
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        }
      }}
    >
      <button
        onClick={onRequestClose}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'transparent',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer'
        }}
        aria-label="Close Terms"
      >
        ×
      </button>

      <h2 style={{ marginBottom: '1rem' }}>Terms &amp; Conditions</h2>
      <div style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
        <p><strong>Welcome to TmeroEdu</strong> (www.tmero.com), a language learning platform dedicated to teaching young learners languages through fun, interactive content.</p>

        <p><strong>1. Acceptance of Terms</strong><br/>
        By accessing or using our platform, you agree to follow these Terms. If you do not agree, please do not use the platform.</p>

        <p><strong>2. User Eligibility</strong><br/>
        Users under 18 must have permission from a parent or guardian. Adults registering on behalf of a child take full responsibility for their activity and learning experience.</p>

        <p><strong>3. Account & Access</strong><br/>
        A valid email is required to register.<br/>
        You are responsible for your login credentials.<br/>
        Do not share your account or access with others.</p>

        <p><strong>4. Billing</strong><br/>
        Access to TmeroEdu is available through a one-time payment.<br/>
        There are no free plans and no recurring subscriptions.<br/>
        Payment grants access for a specific time frame.<br/>
        Users will be notified via email of expiration.<br/>
        All sales are final. No refunds.</p>

        <p><strong>5. Acceptable Use</strong><br/>
        Users may not copy, share personal data, or attempt to harm the platform.</p>

        <p><strong>6. Intellectual Property</strong><br/>
        All content is owned by Tmero. You may not reuse or redistribute without permission.</p>

        <p><strong>7. Dispute Resolution</strong><br/>
        Disputes must first be handled by email. If unresolved, binding arbitration via phone call during business hours.</p>

        <p><strong>8. Agreement to Terms & Updates</strong><br/>
        Continued use after updates means you accept the changes.</p>

        <h3 style={{ marginTop: '1.5rem' }}>🔒 Privacy Policy</h3>

        <p><strong>1. COPPA Compliance</strong><br/>
        We follow COPPA. Children’s data is protected and requires parental consent.</p>

        <p><strong>2. Information We Collect</strong><br/>
        For children: First name, learning progress, quiz results.<br/>
        For adults: Full name, email, billing info, language prefs, phone, and state.</p>

        <p><strong>3. How We Use This Information</strong><br/>
        To personalize learning, send reports, improve functionality, and send communications.</p>

        <p><strong>4. Parental Consent</strong><br/>
        Parents must create and supervise accounts for children under 18.</p>

        <p><strong>5. Cookies & Tracking</strong><br/>
        We use cookies for login sessions and analytics. You may disable them in your browser.</p>

        <p><strong>6. Data Sharing and Security</strong><br/>
        We use secure third-party processors like Stripe. No selling of personal info.</p>

        <p><strong>7. Data Deletion</strong><br/>
        Parents can request deletion by emailing <a href="mailto:ananastech5@gmail.com">ananastech5@gmail.com</a>. Processed in 1–3 years.</p>

        <p><strong>8. Contact Us</strong><br/>
        For concerns, contact <a href="mailto:ananastech5@gmail.com">ananastech5@gmail.com</a>.</p>
      </div>
    </Modal>
  );
};

export default TermsModal;
