import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Link, useNavigate } from 'react-router-dom';
import type { JournalEntry } from '../utils/journals';
import { triggerDeploy } from '../utils/deploy';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const AdminDashboard: React.FC = () => {
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New category form state
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin');
      } else {
        fetchJournals();
        fetchCategories();
      }
    };
    checkSession();
  }, [navigate]);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*').order('name');
    if (!error && data) {
      setCategories(data as Category[]);
    }
  };

  const fetchJournals = async () => {
    const { data, error } = await supabase.from('journals').select('*').order('date', { ascending: false });
    if (!error && data) {
      setJournals(data as JournalEntry[]);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this journal?")) {
      await supabase.from('journals').delete().eq('id', id);
      triggerDeploy();
      fetchJournals();
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) {
        alert("Error deleting category: " + error.message);
      } else {
        triggerDeploy();
        fetchCategories();
      }
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName || !newCatSlug) return;
    
    const { error } = await supabase.from('categories').insert([{
      name: newCatName,
      slug: newCatSlug,
      description: newCatDesc
    }]);
    
    if (error) {
      alert("Error adding category: " + error.message);
    } else {
      setNewCatName('');
      setNewCatSlug('');
      setNewCatDesc('');
      fetchCategories();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Admin Dashboard (Supabase)</h2>
        <div>
          <Link to="/admin/edit" style={{ marginRight: '15px', padding: '8px 12px', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>+ New Journal</Link>
          <button onClick={handleLogout} style={{ padding: '8px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f4f4f9', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Title</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Date</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {journals.map(j => (
            <tr key={j.id}>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{j.title}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{j.date}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                <Link to={`/journey/${j.slug}`} style={{ marginRight: '10px', color: '#28a745', textDecoration: 'none' }}>View</Link>
                <Link to={`/admin/edit/${j.id}`} style={{ marginRight: '10px', color: '#007bff', textDecoration: 'none' }}>Edit</Link>
                <button onClick={() => handleDelete(j.id)} style={{ color: '#dc3545', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* CATEGORIES SECTION */}
      <hr style={{ margin: '40px 0', borderColor: '#eee' }} />
      
      <h2>Categories</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', marginBottom: '30px' }}>
        <thead>
          <tr style={{ background: '#f4f4f9', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Slug</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Description</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 && (
            <tr><td colSpan={4} style={{ padding: '10px', textAlign: 'center' }}>No categories yet. Add one below.</td></tr>
          )}
          {categories.map(c => (
            <tr key={c.id}>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{c.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{c.slug}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{c.description}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                <button onClick={() => handleDeleteCategory(c.id)} style={{ color: '#dc3545', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#f9f9f9', padding: '20px', border: '1px solid #eee' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          <input type="text" placeholder="Category Name (e.g. AI / LLMs)" value={newCatName} onChange={e => setNewCatName(e.target.value)} required style={{ padding: '8px' }} />
          <input type="text" placeholder="Slug (e.g. ai-llms)" value={newCatSlug} onChange={e => setNewCatSlug(e.target.value)} required style={{ padding: '8px' }} />
        </div>
        <div style={{ flex: 2 }}>
          <textarea placeholder="Category Description (Subtitle)" value={newCatDesc} onChange={e => setNewCatDesc(e.target.value)} style={{ width: '100%', height: '80px', padding: '8px' }} />
        </div>
        <div>
          <button type="submit" style={{ padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', height: '80px' }}>Add Category</button>
        </div>
      </form>
    </div>
  );
};
