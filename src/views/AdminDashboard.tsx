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
  
  // Featured post state
  const [selectedFeaturedId, setSelectedFeaturedId] = useState<string>('');
  const [isUpdatingFeatured, setIsUpdatingFeatured] = useState<boolean>(false);

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
      const list = data as JournalEntry[];
      setJournals(list);

      // Find current featured post
      const currentFeatured = list.find(j => j.tag?.toUpperCase() === 'FEATURED');
      if (currentFeatured) {
        setSelectedFeaturedId(currentFeatured.id);
      } else if (typeof window !== 'undefined') {
        const storedSlug = localStorage.getItem('featured_journal_slug');
        const match = list.find(j => j.slug === storedSlug);
        if (match) setSelectedFeaturedId(match.id);
      }
    }
    setLoading(false);
  };

  const handleSetFeatured = async (targetId: string) => {
    if (!targetId) return;
    setIsUpdatingFeatured(true);
    try {
      // 1. Clear 'FEATURED' from any other journal
      await supabase
        .from('journals')
        .update({ tag: 'Journal' })
        .eq('tag', 'FEATURED');

      // 2. Set 'FEATURED' on target journal
      const { error } = await supabase
        .from('journals')
        .update({ tag: 'FEATURED' })
        .eq('id', targetId);

      if (error) {
        alert("Error setting featured post: " + error.message);
      } else {
        const targetEntry = journals.find(j => j.id === targetId);
        if (targetEntry?.slug && typeof window !== 'undefined') {
          localStorage.setItem('featured_journal_slug', targetEntry.slug);
          localStorage.setItem('featured_journal_id', targetEntry.id);
        }
        setSelectedFeaturedId(targetId);
        triggerDeploy();
        await fetchJournals();
        alert(`Homepage Featured Post updated to: "${targetEntry?.title || 'Selected Post'}"`);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsUpdatingFeatured(false);
    }
  };

  const handleDeleteJournal = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this journal entry?")) {
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

  const currentFeaturedItem = journals.find(j => j.id === selectedFeaturedId || j.tag?.toUpperCase() === 'FEATURED');

  return (
    <div style={{ maxWidth: '1050px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Journal Admin Dashboard</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
          <Link href="/admin/edit" style={{ padding: '8px 16px', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>+ New Journal Entry</Link>
        </div>
      </div>

      {/* HOMEPAGE FEATURED POST CONTROLS */}
      <div style={{ background: '#fff9e6', padding: '20px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #ffeeba' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ margin: 0, color: '#856404', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⭐ Homepage Featured Post
            </h3>
            <p style={{ margin: '6px 0 0 0', color: '#666', fontSize: '13px' }}>
              Choose which post appears in the "FEATURED" card on the homepage. This choice is pinned and will <strong>not</strong> change automatically when new journals are created.
            </p>
          </div>
          {currentFeaturedItem && (
            <div style={{ background: '#fff', padding: '6px 14px', borderRadius: '6px', border: '1px solid #ffe082' }}>
              <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block' }}>CURRENTLY PINNED:</span>
              <span style={{ fontWeight: 'bold', color: '#111', fontSize: '14px' }}>
                {currentFeaturedItem.title}
              </span>
            </div>
          )}
        </div>

        <div style={{ marginTop: '16px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={selectedFeaturedId}
            onChange={(e) => setSelectedFeaturedId(e.target.value)}
            style={{
              padding: '9px 12px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
              flex: 1,
              minWidth: '280px',
              background: '#fff'
            }}
          >
            <option value="" disabled>-- Select a post to feature on homepage --</option>
            {journals.filter(j => j.status !== 'DRAFT').map(j => (
              <option key={j.id} value={j.id}>
                {j.title} ({j.category}) {j.tag?.toUpperCase() === 'FEATURED' ? '★ CURRENT' : ''}
              </option>
            ))}
          </select>

          <button
            onClick={() => handleSetFeatured(selectedFeaturedId)}
            disabled={isUpdatingFeatured || !selectedFeaturedId}
            style={{
              padding: '9px 18px',
              background: '#e69500',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: isUpdatingFeatured ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            {isUpdatingFeatured ? 'Saving...' : 'Pin as Featured'}
          </button>
        </div>
      </div>

      {/* CATEGORIES MANAGEMENT SECTION */}
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #e9ecef' }}>
        <h3>Content Categories</h3>
        <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Category Name (e.g. AI & AUTOMATION)" 
            value={newCatName} 
            onChange={e => setNewCatName(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          <input 
            type="text" 
            placeholder="Slug (e.g. ai-automation)" 
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
      <div>
        <h3>All Journal Entries ({journals.length})</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Title</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Category</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Featured</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {journals.map(item => (
              <tr key={item.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.title}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.category}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.date}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {item.status === 'DRAFT' ? (
                    <span style={{ background: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px' }}>
                      DRAFT
                    </span>
                  ) : (
                    <span style={{ background: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px' }}>
                      PUBLISHED
                    </span>
                  )}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {item.tag?.toUpperCase() === 'FEATURED' ? (
                    <span style={{ 
                      background: '#fff8e1', 
                      color: '#b78103', 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontWeight: 'bold', 
                      fontSize: '12px',
                      border: '1px solid #ffe082',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      ⭐ Featured on Home
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSetFeatured(item.id)}
                      disabled={isUpdatingFeatured}
                      style={{
                        background: 'none',
                        border: '1px solid #ccc',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        color: '#555'
                      }}
                      title="Set as featured post on the homepage"
                    >
                      Pin to Home
                    </button>
                  )}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Link 
                    href={`/journey/${item.slug}${item.status === 'DRAFT' ? '?preview=true' : ''}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#28a745', textDecoration: 'none', fontWeight: 500 }}
                  >
                    View
                  </Link>
                  <Link href={`/admin/edit/${item.id}`} style={{ color: '#007bff', textDecoration: 'none', fontWeight: 500 }}>Edit</Link>
                  <button onClick={() => handleDeleteJournal(item.id)} style={{ color: '#dc3545', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 500, padding: 0 }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
