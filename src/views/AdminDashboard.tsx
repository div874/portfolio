'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin');
      } else {
        fetchJournals();
        fetchCategories();
      }
    };
    checkSession();
  }, [router]);

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

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName || !newCatSlug) return;
    const { error } = await supabase.from('categories').insert([
      { name: newCatName.toUpperCase(), slug: newCatSlug.toLowerCase(), description: newCatDesc }
    ]);
    if (!error) {
      setNewCatName('');
      setNewCatSlug('');
      setNewCatDesc('');
      fetchCategories();
    } else {
      alert("Error adding category: " + error.message);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm("Delete this category?")) {
      await supabase.from('categories').delete().eq('id', id);
      fetchCategories();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  if (loading) return <div style={{ padding: '40px' }}>Loading Admin Panel...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Admin Dashboard</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
          <Link href="/admin/edit" style={{ padding: '8px 16px', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>+ New Journal</Link>
        </div>
      </div>

      {/* CATEGORIES MANAGEMENT SECTION */}
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #e9ecef' }}>
        <h3>Categories</h3>
        <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Category Name (e.g. AI)" 
            value={newCatName} 
            onChange={e => setNewCatName(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          <input 
            type="text" 
            placeholder="Slug (e.g. ai)" 
            value={newCatSlug} 
            onChange={e => setNewCatSlug(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          <input 
            type="text" 
            placeholder="Description (Optional)" 
            value={newCatDesc} 
            onChange={e => setNewCatDesc(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
          />
          <button type="submit" style={{ padding: '8px 16px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Category</button>
        </form>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <div key={cat.id} style={{ background: 'white', padding: '6px 12px', border: '1px solid #ddd', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <strong>{cat.name}</strong> ({cat.slug})
              <button 
                onClick={() => handleDeleteCategory(cat.id)}
                style={{ border: 'none', background: 'transparent', color: '#dc3545', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* JOURNALS LIST */}
      <h3>All Journals</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Title</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Category</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {journals.map(item => (
            <tr key={item.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.title}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.category}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.date}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.status}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', display: 'flex', gap: '10px' }}>
                <Link href={`/admin/edit/${item.id}`} style={{ color: '#007bff' }}>Edit</Link>
                <button onClick={() => handleDelete(item.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
