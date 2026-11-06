import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {
  Service,
  BlogPost,
  Testimonial,
  ContactMessage,
  initialServices,
  initialBlogs,
  initialTestimonials,
} from '../data/initialData';

interface AppContextType {
  services: Service[];
  blogs: BlogPost[];
  testimonials: Testimonial[];
  contacts: ContactMessage[];
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addBlog: (blog: Omit<BlogPost, 'id'>) => void;
  updateBlog: (id: string, blog: Partial<BlogPost>) => void;
  deleteBlog: (id: string) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  addContact: (contact: Omit<ContactMessage, 'id' | 'date' | 'status'>) => void;
  updateContactStatus: (id: string, status: ContactMessage['status']) => void;
  deleteContact: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const ADMIN_PASSWORD = 'admin123';
const SERVICE_STORAGE_KEY = 'aegis_services';
const SERVICE_STORAGE_VERSION_KEY = 'aegis_services_version';
const BLOG_STORAGE_KEY = 'aegis_blogs';
const BLOG_STORAGE_VERSION_KEY = 'aegis_blogs_version';
const TESTIMONIAL_STORAGE_KEY = 'aegis_testimonials';
const TESTIMONIAL_STORAGE_VERSION_KEY = 'aegis_testimonials_version';
const CURRENT_SERVICE_STORAGE_VERSION = '9';
const CURRENT_BLOG_STORAGE_VERSION = '76';
const CURRENT_TESTIMONIAL_STORAGE_VERSION = '2';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>(() => {
    const storedVersion = localStorage.getItem(SERVICE_STORAGE_VERSION_KEY);
    const storedServices = loadFromStorage<Service[]>(SERVICE_STORAGE_KEY, initialServices);

    if (storedVersion !== CURRENT_SERVICE_STORAGE_VERSION) {
      localStorage.setItem(SERVICE_STORAGE_VERSION_KEY, CURRENT_SERVICE_STORAGE_VERSION);
      return initialServices;
    }

    return storedServices;
  });
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    if (import.meta.env.DEV) {
      return initialBlogs;
    }
    const storedVersion = localStorage.getItem(BLOG_STORAGE_VERSION_KEY);
    const storedBlogs = loadFromStorage<BlogPost[]>(BLOG_STORAGE_KEY, initialBlogs);

    if (storedVersion !== CURRENT_BLOG_STORAGE_VERSION) {
      localStorage.setItem(BLOG_STORAGE_VERSION_KEY, CURRENT_BLOG_STORAGE_VERSION);
      return initialBlogs;
    }

    return storedBlogs;
  });
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const storedVersion = localStorage.getItem(TESTIMONIAL_STORAGE_VERSION_KEY);
    const storedTestimonials = loadFromStorage<Testimonial[]>(TESTIMONIAL_STORAGE_KEY, initialTestimonials);

    if (storedVersion !== CURRENT_TESTIMONIAL_STORAGE_VERSION) {
      localStorage.setItem(TESTIMONIAL_STORAGE_VERSION_KEY, CURRENT_TESTIMONIAL_STORAGE_VERSION);
      return initialTestimonials;
    }

    return storedTestimonials;
  });
  const [contacts, setContacts] = useState<ContactMessage[]>(() =>
    loadFromStorage('aegis_contacts', [])
  );
  const [isAdmin, setIsAdmin] = useState(() =>
    loadFromStorage('aegis_admin', false)
  );

  useEffect(() => {
    localStorage.setItem(SERVICE_STORAGE_KEY, JSON.stringify(services));
    localStorage.setItem(SERVICE_STORAGE_VERSION_KEY, CURRENT_SERVICE_STORAGE_VERSION);
  }, [services]);

  useEffect(() => {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(blogs));
    localStorage.setItem(BLOG_STORAGE_VERSION_KEY, CURRENT_BLOG_STORAGE_VERSION);
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem(TESTIMONIAL_STORAGE_KEY, JSON.stringify(testimonials));
    localStorage.setItem(TESTIMONIAL_STORAGE_VERSION_KEY, CURRENT_TESTIMONIAL_STORAGE_VERSION);
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('aegis_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('aegis_admin', JSON.stringify(isAdmin));
  }, [isAdmin]);

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  const addService = (service: Omit<Service, 'id'>) => {
    setServices((prev) => [...prev, { ...service, id: Date.now().toString() }]);
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const addBlog = (blog: Omit<BlogPost, 'id'>) => {
    setBlogs((prev) => [{ ...blog, id: Date.now().toString() }, ...prev]);
  };

  const updateBlog = (id: string, updates: Partial<BlogPost>) => {
    setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const deleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    setTestimonials((prev) => [...prev, { ...testimonial, id: Date.now().toString() }]);
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const addContact = (contact: Omit<ContactMessage, 'id' | 'date' | 'status'>) => {
    setContacts((prev) => [
      {
        ...contact,
        id: Date.now().toString(),
        date: new Date().toISOString(),
        status: 'new',
      },
      ...prev,
    ]);
  };

  const updateContactStatus = (id: string, status: ContactMessage['status']) => {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        services,
        blogs,
        testimonials,
        contacts,
        isAdmin,
        login,
        logout,
        addService,
        updateService,
        deleteService,
        addBlog,
        updateBlog,
        deleteBlog,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addContact,
        updateContactStatus,
        deleteContact,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}