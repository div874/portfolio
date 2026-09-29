'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { JournalEntry } from '../utils/journals';
import type { ArticleEntry } from '../utils/articles';
import { triggerDeploy } from '../utils/deploy';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'journals' | 'articles'>('journals');
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [articles, setArticles] = useState<ArticleEntry[]>([]);
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
        fetchArticles();
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

  const fetchArticles = async () => {
    const { data, error } = await supabase.from('articles').select('*').order('date', { ascending: false });
    if (!error && data) {
      setArticles(data.map((item: any) => ({
        ...item,
        readTime: item.read_time || item.readTime || '5 min read',
        publishedDate: item.date || item.published_date || item.publishedDate || ''
      })) as ArticleEntry[]);
    }
  };

  const handleDeleteJournal = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this journal?")) {
      await supabase.from('journals').delete().eq('id', id);
      triggerDeploy();
      fetchJournals();
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      await supabase.from('articles').delete().eq('id', id);
      triggerDeploy();
      fetchArticles();
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
    <div style={{ maxWidth: '1050px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Admin Dashboard</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
          <Link href="/admin/edit" style={{ padding: '8px 16px', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>+ New Journal</Link>
          <Link href="/admin/edit?type=article" style={{ padding: '8px 16px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>+ New Article</Link>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        <button
          onClick={() => setActiveTab('journals')}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            background: activeTab === 'journals' ? '#28a745' : '#e9ecef',
            color: activeTab === 'journals' ? 'white' : '#495057',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Journals ({journals.length})
        </button>
        <button
          onClick={() => setActiveTab('articles')}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            background: activeTab === 'articles' ? '#007bff' : '#e9ecef',
            color: activeTab === 'articles' ? 'white' : '#495057',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Articles & Guides ({articles.length})
        </button>
      </div>

      {/* CATEGORIES MANAGEMENT SECTION */}
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #e9ecef' }}>
        <h3>Content Categories</h3>
        <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Category Name (e.g. AI & Engineering)" 
            value={newCatName} 
            onChange={e => setNewCatName(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          <input 
            type="text" 
            placeholder="Slug (e.g. ai-engineering)" 
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

      {/* JOURNALS TAB */}
      {activeTab === 'journals' && (
        <>
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
                  <td style={{ padding: '10px', border: '1px solid #ddd', display: 'flex', gap: '10px' }}>
                    <Link href={`/admin/edit/${item.id}?type=journal`} style={{ color: '#007bff' }}>Edit</Link>
                    <button onClick={() => handleDeleteJournal(item.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* ARTICLES TAB */}
      {activeTab === 'articles' && (
        <>
          <h3>All Articles & Guides</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Article Title</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Category</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(item => (
                <tr key={item.id || item.slug}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.title}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.category}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.publishedDate}</td>
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
                  <td style={{ padding: '10px', border: '1px solid #ddd', display: 'flex', gap: '10px' }}>
                    <Link href={`/admin/edit/${item.id || item.slug}?type=article`} style={{ color: '#007bff' }}>Edit</Link>
                    <button onClick={() => handleDeleteArticle(item.id || item.slug)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
