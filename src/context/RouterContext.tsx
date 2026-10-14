import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
  scrollToSection: (sectionId: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {},
  scrollToSection: () => {},
});

export const useRouter = () => useContext(RouterContext);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Normalize initial path from location
  const [path, setPath] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    const initialPath = window.location.pathname || '/';
    // If the path is an SPA route, accept it, otherwise '/'
    return initialPath.startsWith('/') ? initialPath : '/';
  });

  const scrollToSection = useCallback((sectionId: string) => {
    const id = sectionId.replace(/^#/, '');
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - navOffset);
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  const navigate = useCallback((to: string) => {
    // If navigating to a section anchor like #ventures or /#ventures
    if (to.startsWith('#') || to.startsWith('/#')) {
      const sectionId = to.replace('/#', '#');
      if (path !== '/') {
        setPath('/');
        try {
          window.history.pushState({ path: '/' }, '', '/');
        } catch {}
        setTimeout(() => scrollToSection(sectionId), 50);
      } else {
        scrollToSection(sectionId);
      }
      return;
    }

    // If navigating to home
    if (to === '/' || to === '') {
      if (path === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setPath('/');
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        try {
          window.history.pushState({ path: '/' }, '', '/');
        } catch {}
      }
      return;
    }

    // Direct page navigation (instant in-memory update)
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    try {
      window.history.pushState({ path: to }, '', to);
    } catch {}
  }, [path, scrollToSection]);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const nextPath = e.state?.path || window.location.pathname || '/';
      setPath(nextPath);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate, scrollToSection }}>
      {children}
    </RouterContext.Provider>
  );
};
