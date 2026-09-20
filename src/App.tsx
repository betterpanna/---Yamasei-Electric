/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { PageId, Language } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';

// Pages
import { HomePage } from './components/pages/HomePage';
import { ServicesPage } from './components/pages/ServicesPage';
import { AboutPage } from './components/pages/AboutPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { ProjectDetailPage } from './components/pages/ProjectDetailPage';
import { ServiceAreaPage } from './components/pages/ServiceAreaPage';
import { ContactPage } from './components/pages/ContactPage';
import { PrivacyPage } from './components/pages/PrivacyPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-shimizu');
  const [lang, setLang] = useState<Language>('ja');

  // Quote form prefill state
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [prefilledDesc, setPrefilledDesc] = useState<string | undefined>(undefined);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleSelectServiceForQuote = (serviceId: string) => {
    setPreselectedService(serviceId);
    setPrefilledDesc(undefined);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-amber-500 selection:text-white">
      {/* Global Navigation Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lang={lang}
        setLang={setLang}
      />

      {/* Dynamic Page Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            lang={lang}
            setCurrentPage={setCurrentPage}
            onSelectProject={setSelectedProjectId}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            lang={lang}
            setCurrentPage={setCurrentPage}
            onSelectServiceForQuote={handleSelectServiceForQuote}
            onSelectProject={setSelectedProjectId}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            lang={lang}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'projects' && (
          <ProjectsPage
            lang={lang}
            setCurrentPage={setCurrentPage}
            onSelectProject={setSelectedProjectId}
          />
        )}

        {currentPage === 'project-detail' && (
          <ProjectDetailPage
            lang={lang}
            projectId={selectedProjectId}
            setCurrentPage={setCurrentPage}
            onSelectProject={setSelectedProjectId}
          />
        )}

        {currentPage === 'service-area' && (
          <ServiceAreaPage
            lang={lang}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            lang={lang}
            setCurrentPage={setCurrentPage}
            preselectedServiceId={preselectedService}
            prefilledDesc={prefilledDesc}
          />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPage
            lang={lang}
            setCurrentPage={setCurrentPage}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        lang={lang}
      />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileBottomBar
        lang={lang}
        onNavigateToContact={() => {
          setCurrentPage('contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
