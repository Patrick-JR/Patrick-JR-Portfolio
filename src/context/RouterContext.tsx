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

// Keep route comparisons consistent for direct URLs such as "/about/".
const normalizePath = (value: string) => {
  const withoutQuery = value.split('?')[0] || '/';
  const trimmed = withoutQuery.replace(/\/+$/, '');
  return trimmed || '/';
};

export const useRouter = () => useContext(RouterContext);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    return normalizePath(window.location.pathname || '/');
  });

  const scrollToSection = useCallback((sectionId: string) => {
    const id = sectionId.replace(/^#/, '');
    const element = document.getElementById(id);

    if (!element) return;

    const navOffset = 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = Math.max(0, elementPosition - navOffset);

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }, []);

  const navigate = useCallback((to: string) => {
    // Explicit anchors are still supported for intentional in-page navigation.
    // Main navigation items must use page paths such as "/about" and "/projects".
    if (to.startsWith('#') || to.startsWith('/#')) {
      const sectionId = to.startsWith('/#') ? to.slice(2) : to.slice(1);

      if (path !== '/') {
        setPath('/');
        window.history.pushState({ path: '/' }, '', '/');
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        window.setTimeout(() => scrollToSection(sectionId), 50);
      } else {
        scrollToSection(sectionId);
      }
      return;
    }

    const nextPath = normalizePath(to);

    if (nextPath === path) {
      if (nextPath === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    window.history.pushState({ path: nextPath }, '', nextPath);
  }, [path, scrollToSection]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const nextPath = normalizePath(event.state?.path || window.location.pathname || '/');
      setPath(nextPath);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate, scrollToSection }}>
      {children}
    </RouterContext.Provider>
  );
};
