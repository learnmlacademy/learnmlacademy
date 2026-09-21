import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CookieConsent } from '../CookieConsent';
import { CurriculumNav } from '../navigation/CurriculumNav';
import { MobileNavDrawer } from '../navigation/MobileNavDrawer';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

export function AppLayout() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerInitialFocus, setDrawerInitialFocus] = useState<'menu' | 'search'>('menu');

  const activeTopicId = location.pathname.startsWith('/learn/')
    ? location.pathname.slice('/learn/'.length).split('/')[0]
    : undefined;
  const showDesktopCurriculum = Boolean(activeTopicId);

  useEffect(() => {
    setDrawerOpen(false);
    mainRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  const openDrawer = (focusSearch = false) => {
    setDrawerInitialFocus(focusSearch ? 'search' : 'menu');
    setDrawerOpen(true);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[var(--lma-canvas)] font-sans text-[var(--lma-text-primary)]">
      <a href="#main-scroll" className="lma-skip-link">
        Skip to main content
      </a>

      <SiteHeader
        menuButtonRef={menuButtonRef}
        searchButtonRef={searchButtonRef}
        navigationOpen={drawerOpen}
        onOpenNavigation={openDrawer}
      />

      <div className="flex min-h-0 flex-1">
        {showDesktopCurriculum && (
          <aside
            aria-label="Curriculum navigation"
            className="lma-scrollbar hidden w-[var(--lma-curriculum-width)] shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-3 xl:block"
          >
            <CurriculumNav activeTopicId={activeTopicId} />
          </aside>
        )}

        <main
          id="main-scroll"
          ref={mainRef}
          tabIndex={-1}
          className="lma-scrollbar relative flex min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto bg-[var(--lma-canvas)]"
        >
          <div className="flex-1">
            <Outlet />
          </div>
          <SiteFooter />
        </main>
      </div>

      <MobileNavDrawer
        open={drawerOpen}
        activeTopicId={activeTopicId}
        initialFocus={drawerInitialFocus}
        returnFocusRef={drawerInitialFocus === 'search' ? searchButtonRef : menuButtonRef}
        onClose={() => setDrawerOpen(false)}
      />

      <CookieConsent />
    </div>
  );
}
