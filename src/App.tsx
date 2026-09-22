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

// Real, bookmarkable URLs for every page that has one. "project-detail" has
// no path of its own - it's reached in-app from the Projects page and isn't
// listed in the sitemap, so navigating to it doesn't change the URL.
const PAGE_PATHS: Partial<Record<PageId, string>> = {
  home: '/',
  services: '/services',
  about: '/about',
  projects: '/projects',
  'service-area': '/service-area',
  contact: '/contact',
  privacy: '/privacy',
};

const pageForPath = (pathname: string): PageId => {
  const entry = (Object.entries(PAGE_PATHS) as [PageId, string][]).find(
    ([, path]) => path === pathname
  );
  return entry ? entry[0] : 'home';
};

export default function App() {
  const [currentPage, setCurrentPageState] = useState<PageId>(() =>
    pageForPath(window.location.pathname)
  );
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-shimizu');
  const [lang, setLang] = useState<Language>('ja');

  // Quote form prefill state
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [prefilledDesc, setPrefilledDesc] = useState<string | undefined>(undefined);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Keep the URL in sync with in-app navigation so every top-level page has
  // a real, shareable, crawlable address (matching public/sitemap.xml), and
  // handle the browser's back/forward buttons.
  const setCurrentPage = (page: PageId) => {
    setCurrentPageState(page);
    const path = PAGE_PATHS[page];
    if (path && window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPageState(pageForPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
