import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from '../ui/WhatsAppButton';
import type Lenis from 'lenis';

export default function Layout() {
  const { pathname } = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px), (pointer: coarse)').matches) {
      return;
    }

    let disposed = false;
    let lenis: Lenis | null = null;
    let gsap: typeof import('gsap').default | null = null;
    let onTick: ((time: number) => void) | null = null;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const el = document.querySelector(href);
        if (el && lenis) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -70 });
        }
      }
    };

    const initializeSmoothScroll = async () => {
      const [{ default: LenisConstructor }, { default: gsapInstance }, { ScrollTrigger }] =
        await Promise.all([
          import('lenis'),
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
      if (disposed) return;

      gsapInstance.registerPlugin(ScrollTrigger);
      gsap = gsapInstance;
      lenis = new LenisConstructor({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 1.2,
      });
      lenisRef.current = lenis;
      lenis.on('scroll', ScrollTrigger.update);

      onTick = (time) => lenis?.raf(time * 1000);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
      document.addEventListener('click', handleAnchorClick);
    };

    void initializeSmoothScroll().catch((error: unknown) => {
      console.error('Failed to initialize smooth scrolling:', error);
    });

    return () => {
      disposed = true;
      document.removeEventListener('click', handleAnchorClick);
      if (gsap && onTick) gsap.ticker.remove(onTick);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Smooth reset to top when navigating routes
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}