import { useState, FormEvent, ElementType } from 'react';
import {
  LayoutDashboard, FileText, Briefcase, MessageSquare, Star,
  LogOut, Plus, Trash2, Edit2, X, Check, Eye,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/ui/Button';
import type { BlogPost, Service, Testimonial } from '../../data/initialData';

type Tab = 'dashboard' | 'blogs' | 'services' | 'contacts' | 'testimonials';

export default function Admin() {
  const {
    isAdmin, login, logout, blogs, services, contacts, testimonials,
    addBlog, updateBlog, deleteBlog,
    addService, updateService, deleteService,
    addTestimonial, updateTestimonial, deleteTestimonial,
    updateContactStatus, deleteContact,
  } = useApp();

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState<Tab>('dashboard');
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Blog form
  const [blogForm, setBlogForm] = useState({
    title: '', slug: '', category: 'Corporate', excerpt: '', content: '',
    author: 'James Thornton', date: new Date().toISOString().split('T')[0],
    image: '/images/case-corporate.jpg', tags: 'Corporate',
  });

  // Service form
  const [serviceForm, setServiceForm] = useState({
    title: '', slug: '', category: 'Corporate', icon: 'Search',
    shortDescription: '', description: '', features: '',
    image: '/images/case-corporate.jpg',
  });

  // Testimonial form
  const [testForm, setTestForm] = useState({
    name: '', company: '', role: '', review: '', rating: 5,
    image: '/images/team-1.jpg',
  });

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!login(password)) {
      setError('Invalid password. Try: admin123');
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light pt-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h1 className="font-display text-2xl font-bold text-jet text-center mb-2">Admin Login</h1>
          <p className="text-jet/50 text-sm text-center mb-6">Enter password to access the dashboard</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'contacts', label: 'Contacts', icon: MessageSquare },
    { id: 'testimonials', label: 'Testimonials', icon: Star },
  ];

  const resetBlogForm = () => {
    setBlogForm({
      title: '', slug: '', category: 'Corporate', excerpt: '', content: '',
      author: 'James Thornton', date: new Date().toISOString().split('T')[0],
      image: '/images/case-corporate.jpg', tags: 'Corporate',
    });
    setEditing(null);
    setShowForm(false);
  };

  const resetServiceForm = () => {
    setServiceForm({
      title: '', slug: '', category: 'Corporate', icon: 'Search',
      shortDescription: '', description: '', features: '',
      image: '/images/case-corporate.jpg',
    });
    setEditing(null);
    setShowForm(false);
  };

  const resetTestForm = () => {
    setTestForm({ name: '', company: '', role: '', review: '', rating: 5, image: '/images/team-1.jpg' });
    setEditing(null);
    setShowForm(false);
  };

  const handleBlogSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      ...blogForm,
      slug: blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tags: blogForm.tags.split(',').map((t) => t.trim()),
    };
    if (editing) {
      updateBlog(editing, data);
    } else {
      addBlog(data);
    }
    resetBlogForm();
  };

  const handleServiceSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      ...serviceForm,
      slug: serviceForm.slug || serviceForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      features: serviceForm.features.split(',').map((f) => f.trim()).filter(Boolean),
    };
    if (editing) {
      updateService(editing, data);
    } else {
      addService(data);
    }
    resetServiceForm();
  };

  const handleTestSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateTestimonial(editing, testForm);
    } else {
      addTestimonial(testForm);
    }
    resetTestForm();
  };

  const editBlog = (blog: BlogPost) => {
    setBlogForm({
      title: blog.title, slug: blog.slug, category: blog.category,
      excerpt: blog.excerpt, content: blog.content, author: blog.author,
      date: blog.date, image: blog.image, tags: blog.tags.join(', '),
    });
    setEditing(blog.id);
    setShowForm(true);
  };

  const editService = (service: Service) => {
    setServiceForm({
      title: service.title, slug: service.slug, category: service.category,
      icon: service.icon, shortDescription: service.shortDescription,
      description: service.description, features: service.features.join(', '),
      image: service.image,
    });
    setEditing(service.id);
    setShowForm(true);
  };

  const editTestimonial = (t: Testimonial) => {
    setTestForm({
      name: t.name, company: t.company, role: t.role,
      review: t.review, rating: t.rating, image: t.image,
    });
    setEditing(t.id);
    setShowForm(true);
  };

  const inputClass = 'w-full px-3 py-2.5 rounded-lg border border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm';
  const labelClass = 'block text-xs font-poppins font-medium text-jet/70 mb-1';

  return (
    <div className="min-h-screen bg-light pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-jet">Admin Dashboard</h1>
            <p className="text-jet/50 text-sm mt-1">Manage your agency content</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-jet text-white text-sm font-poppins hover:bg-primary transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setShowForm(false); setEditing(null); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-poppins font-medium transition-all cursor-pointer ${
                tab === t.id ? 'bg-primary text-white shadow-md' : 'bg-white text-jet/60 hover:bg-primary/10'
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {/* Dashboard Overview */}
        {tab === 'dashboard' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Blogs', value: blogs.length, icon: FileText, color: 'bg-blue-50 text-blue-600' },
              { label: 'Services', value: services.length, icon: Briefcase, color: 'bg-amber-50 text-amber-600' },
              { label: 'Messages', value: contacts.length, icon: MessageSquare, color: 'bg-green-50 text-green-600' },
              { label: 'Testimonials', value: testimonials.length, icon: Star, color: 'bg-purple-50 text-purple-600' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="font-display text-3xl font-bold text-jet">{stat.value}</div>
                <div className="text-sm text-jet/50 font-poppins mt-1">{stat.label}</div>
              </div>
            ))}
            <div className="sm:col-span-2 lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-jet mb-4">Recent Messages</h3>
              {contacts.length === 0 ? (
                <p className="text-jet/40 text-sm">No messages yet.</p>
              ) : (
                <div className="space-y-3">
                  {contacts.slice(0, 5).map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-light">
                      <div>
                        <span className="font-poppins text-sm font-medium text-jet">{c.name}</span>
                        <span className="text-xs text-jet/40 ml-2">{c.email}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        c.status === 'new' ? 'bg-green-100 text-green-700' :
                        c.status === 'read' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Blogs Management */}
        {tab === 'blogs' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-xl font-semibold text-jet">Manage Blogs</h2>
              <Button size="sm" onClick={() => { resetBlogForm(); setShowForm(true); }}>
                <Plus className="w-4 h-4" /> Add Blog
              </Button>
            </div>

            {showForm && (
              <form onSubmit={handleBlogSubmit} className="bg-white rounded-2xl p-6 shadow-sm mb-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-poppins font-semibold text-jet">{editing ? 'Edit' : 'New'} Blog Post</h3>
                  <button type="button" onClick={resetBlogForm} className="text-jet/40 hover:text-jet cursor-pointer"><X className="w-5 h-5" /></button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Title</label><input required className={inputClass} value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} /></div>
                  <div><label className={labelClass}>Slug</label><input className={inputClass} value={blogForm.slug} onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })} placeholder="auto-generated" /></div>
                  <div><label className={labelClass}>Category</label>
                    <select className={inputClass} value={blogForm.category} onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}>
                      {['Corporate', 'Surveillance', 'Verification', 'Cyber', 'Guides', 'Ethics'].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div><label className={labelClass}>Author</label><input className={inputClass} value={blogForm.author} onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })} /></div>
                  <div><label className={labelClass}>Date</label><input type="date" className={inputClass} value={blogForm.date} onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })} /></div>
                  <div><label className={labelClass}>Image Path</label><input className={inputClass} value={blogForm.image} onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })} /></div>
                  <div className="sm:col-span-2"><label className={labelClass}>Tags (comma-separated)</label><input className={inputClass} value={blogForm.tags} onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })} /></div>
                  <div className="sm:col-span-2"><label className={labelClass}>Excerpt</label><textarea required rows={2} className={inputClass} value={blogForm.excerpt} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })} /></div>
                  <div className="sm:col-span-2"><label className={labelClass}>Content</label><textarea required rows={6} className={inputClass} value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} /></div>
                </div>
                <Button type="submit" size="sm"><Check className="w-4 h-4" /> {editing ? 'Update' : 'Create'} Blog</Button>
              </form>
            )}

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-light">
                    <tr>
                      <th className="text-left px-4 py-3 font-poppins font-medium text-jet/60">Title</th>
                      <th className="text-left px-4 py-3 font-poppins font-medium text-jet/60">Category</th>
                      <th className="text-left px-4 py-3 font-poppins font-medium text-jet/60">Date</th>
                      <th className="text-right px-4 py-3 font-poppins font-medium text-jet/60">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((blog) => (
                      <tr key={blog.id} className="border-t border-primary/5">
                        <td className="px-4 py-3 font-medium text-jet">{blog.title}</td>
                        <td className="px-4 py-3 text-jet/50">{blog.category}</td>
                        <td className="px-4 py-3 text-jet/50">{blog.date}</td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <button onClick={() => editBlog(blog)} className="p-1.5 rounded-lg hover:bg-primary/10 text-primary cursor-pointer"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => deleteBlog(blog.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Services Management */}
        {tab === 'services' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-xl font-semibold text-jet">Manage Services</h2>
              <Button size="sm" onClick={() => { resetServiceForm(); setShowForm(true); }}>
                <Plus className="w-4 h-4" /> Add Service
              </Button>
            </div>

            {showForm && (
              <form onSubmit={handleServiceSubmit} className="bg-white rounded-2xl p-6 shadow-sm mb-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-poppins font-semibold text-jet">{editing ? 'Edit' : 'New'} Service</h3>
                  <button type="button" onClick={resetServiceForm} className="text-jet/40 hover:text-jet cursor-pointer"><X className="w-5 h-5" /></button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Title</label><input required className={inputClass} value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} /></div>
                  <div><label className={labelClass}>Slug</label><input className={inputClass} value={serviceForm.slug} onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })} placeholder="auto-generated" /></div>
                  <div><label className={labelClass}>Category</label>
                    <select className={inputClass} value={serviceForm.category} onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}>
                      {['Corporate', 'Verification', 'Surveillance', 'Personal', 'Cyber', 'Legal'].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div><label className={labelClass}>Icon Name</label><input className={inputClass} value={serviceForm.icon} onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })} /></div>
                  <div className="sm:col-span-2"><label className={labelClass}>Short Description</label><textarea required rows={2} className={inputClass} value={serviceForm.shortDescription} onChange={(e) => setServiceForm({ ...serviceForm, shortDescription: e.target.value })} /></div>
                  <div className="sm:col-span-2"><label className={labelClass}>Full Description</label><textarea required rows={4} className={inputClass} value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} /></div>
                  <div className="sm:col-span-2"><label className={labelClass}>Features (comma-separated)</label><input className={inputClass} value={serviceForm.features} onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })} /></div>
                  <div><label className={labelClass}>Image Path</label><input className={inputClass} value={serviceForm.image} onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })} /></div>
                </div>
                <Button type="submit" size="sm"><Check className="w-4 h-4" /> {editing ? 'Update' : 'Create'} Service</Button>
              </form>
            )}

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-light">
                    <tr>
                      <th className="text-left px-4 py-3 font-poppins font-medium text-jet/60">Title</th>
                      <th className="text-left px-4 py-3 font-poppins font-medium text-jet/60">Category</th>
                      <th className="text-right px-4 py-3 font-poppins font-medium text-jet/60">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr key={service.id} className="border-t border-primary/5">
                        <td className="px-4 py-3 font-medium text-jet">{service.title}</td>
                        <td className="px-4 py-3 text-jet/50">{service.category}</td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <button onClick={() => editService(service)} className="p-1.5 rounded-lg hover:bg-primary/10 text-primary cursor-pointer"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => deleteService(service.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Contacts Management */}
        {tab === 'contacts' && (
          <div>
            <h2 className="font-display text-xl font-semibold text-jet mb-6">Contact Messages</h2>
            {contacts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                <MessageSquare className="w-12 h-12 text-jet/20 mx-auto mb-3" />
                <p className="text-jet/40">No messages received yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-poppins font-semibold text-jet">{contact.name}</h3>
                        <p className="text-sm text-jet/50">{contact.email} {contact.phone && `· ${contact.phone}`}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          contact.status === 'new' ? 'bg-green-100 text-green-700' :
                          contact.status === 'read' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>{contact.status}</span>
                        <span className="text-xs text-jet/30">{new Date(contact.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {contact.service && (
                      <p className="text-xs text-dark-brown font-medium mb-2">Service: {contact.service}</p>
                    )}
                    <p className="text-sm text-jet/60 mb-4">{contact.message}</p>
                    <div className="flex gap-2">
                      {contact.status === 'new' && (
                        <button onClick={() => updateContactStatus(contact.id, 'read')} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium hover:bg-blue-100 cursor-pointer">
                          <Eye className="w-3 h-3" /> Mark Read
                        </button>
                      )}
                      {contact.status !== 'replied' && (
                        <button onClick={() => updateContactStatus(contact.id, 'replied')} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-600 text-xs font-medium hover:bg-green-100 cursor-pointer">
                          <Check className="w-3 h-3" /> Mark Replied
                        </button>
                      )}
                      <button onClick={() => deleteContact(contact.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-500 text-xs font-medium hover:bg-red-100 cursor-pointer">
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Testimonials Management */}
        {tab === 'testimonials' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-xl font-semibold text-jet">Manage Testimonials</h2>
              <Button size="sm" onClick={() => { resetTestForm(); setShowForm(true); }}>
                <Plus className="w-4 h-4" /> Add Testimonial
              </Button>
            </div>

            {showForm && (
              <form onSubmit={handleTestSubmit} className="bg-white rounded-2xl p-6 shadow-sm mb-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-poppins font-semibold text-jet">{editing ? 'Edit' : 'New'} Testimonial</h3>
                  <button type="button" onClick={resetTestForm} className="text-jet/40 hover:text-jet cursor-pointer"><X className="w-5 h-5" /></button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Name</label><input required className={inputClass} value={testForm.name} onChange={(e) => setTestForm({ ...testForm, name: e.target.value })} /></div>
                  <div><label className={labelClass}>Company</label><input required className={inputClass} value={testForm.company} onChange={(e) => setTestForm({ ...testForm, company: e.target.value })} /></div>
                  <div><label className={labelClass}>Role</label><input required className={inputClass} value={testForm.role} onChange={(e) => setTestForm({ ...testForm, role: e.target.value })} /></div>
                  <div><label className={labelClass}>Rating</label>
                    <select className={inputClass} value={testForm.rating} onChange={(e) => setTestForm({ ...testForm, rating: Number(e.target.value) })}>
                      {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2"><label className={labelClass}>Review</label><textarea required rows={3} className={inputClass} value={testForm.review} onChange={(e) => setTestForm({ ...testForm, review: e.target.value })} /></div>
                  <div><label className={labelClass}>Image Path</label><input className={inputClass} value={testForm.image} onChange={(e) => setTestForm({ ...testForm, image: e.target.value })} /></div>
                </div>
                <Button type="submit" size="sm"><Check className="w-4 h-4" /> {editing ? 'Update' : 'Create'} Testimonial</Button>
              </form>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="font-poppins text-sm font-semibold text-jet">{t.name}</h4>
                      <p className="text-xs text-jet/40">{t.role}, {t.company}</p>
                    </div>
                  </div>
                  <p className="text-sm text-jet/60 mb-3 line-clamp-3">{t.review}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-logo-gold text-logo-gold" />
                      ))}
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => editTestimonial(t)} className="p-1.5 rounded-lg hover:bg-primary/10 text-primary cursor-pointer"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => deleteTestimonial(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
