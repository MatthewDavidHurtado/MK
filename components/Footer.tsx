
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center py-6 md:py-8 mt-auto app-sans-serif">
      <div className="max-w-3xl mx-auto px-4 text-xs text-slate-500 space-y-2">
        <p>
          This application provides simulated healing reflections based on the principles of Divine Law,
          as interpreted by an AI embodying Malcolm Kingley. It is intended for inspirational and educational purposes only.
        </p>
        <p>
          It is not a substitute for personal reflection, study of Divine Law, guidance from a qualified practitioner,
          or professional medical or psychological advice. The AI's responses, including any suggestions related to emotional conflicts 
          (inspired by Dr. Hamer's discoveries/German New Medicine), are generated for self-reflection and are not diagnostic. 
          They do not represent actual healing treatments or personal counsel from Malcolm Kingley or any specific authority on Divine Law or German New Medicine.
        </p>
        <p className="mt-2">
          The Gemini API key must be configured in the environment variable `process.env.API_KEY`.
        </p>
        <p>&copy; {new Date().getFullYear()} Allow Ministries. App design and concept based on Divine Law principles.</p>
      </div>
    </footer>
  );
};

export default Footer;