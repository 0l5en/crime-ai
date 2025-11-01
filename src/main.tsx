import { createRoot } from 'react-dom/client'
import { Toaster } from "react-hot-toast"
import App from './App.tsx'
import { LanguageProvider } from './contexts/LanguageContext'
import './i18n/config'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
    <Toaster position="bottom-right" toastOptions={{ style: { color: 'var(--bs-body-color)', background: 'var(--bs-body-bg)', border: '1px solid var(--bs-border-color)' } }} />
  </LanguageProvider>
);
