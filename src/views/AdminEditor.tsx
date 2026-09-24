'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { triggerDeploy } from '../utils/deploy';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import type { Category } from './AdminDashboard';

const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), {
  ssr: false,
  loading: () => <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>Loading Rich Text Editor...</div>,
});

interface AdminEditorProps {
  id?: string;
}

export const AdminEditor: React.FC<AdminEditorProps> = ({ id: propId }) => {
  const params = useParams();
  const id = propId || (params?.id as string);
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [status, setStatus] = useState('');
  const [tag, setTag] = useState('Journal');
  const [tags, setTags] = useState('');
  const [readingTime, setReadingTime] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*').order('name');
      if (!error && data) {
        setAvailableCategories(data as Category[]);
        if (!id && data.length > 0) {
          setCategory(data[0].name);
        }
      }
    };
    fetchCategories();

    if (id) {
      const fetchJournal = async () => {
        const { data, error } = await supabase.from('journals').select('*').eq('id', id).single();
        if (data && !error) {
          setTitle(data.title || '');
          setSlug(data.slug || '');
          setDate(data.date || '');
          setCategory(data.category || 'JOURNAL');
          setStatus(data.status || '');
          setTag(data.tag || 'Journal');
          setTags(data.tags?.join(', ') || '');
          setReadingTime(data.reading_time || data.readingTime || '');
          setExcerpt(data.excerpt || '');
          setContent(data.content || '');
          setExistingImage(data.image || '');
        }
      };
      fetchJournal();
    }
  }, [id]);

  const handleCreateCategory = async (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;

    setIsCreatingCategory(true);
    const nameUpper = trimmed.toUpperCase();
    const slugLower = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const { error } = await supabase
      .from('categories')
      .insert([{ name: nameUpper, slug: slugLower, description: '' }]);

    setIsCreatingCategory(false);

    if (error) {
      alert("Error creating category: " + error.message);
    } else {
      const { data: updatedCats } = await supabase.from('categories').select('*').order('name');
      if (updatedCats) {
        setAvailableCategories(updatedCats as Category[]);
      }
      setCategory(nameUpper);
      setNewCategoryName('');
      setIsAddingNewCategory(false);
    }
  };

  const handleSave = async (e: React.FormEvent, isDraftMode: boolean = false) => {
    e.preventDefault();
    setIsSaving(true);

    let imageUrl = existingImage;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('journal-images')
        .upload(fileName, imageFile);

      if (uploadError) {
        alert("Image upload failed: " + uploadError.message);
        setIsSaving(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('journal-images')
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    const finalStatus = isDraftMode ? 'DRAFT' : (status || 'PUBLISHED');
    const finalTitle = title.trim() || (isDraftMode ? `Untitled Draft (${new Date().toLocaleDateString()})` : 'Untitled Journal');
    const generatedSlug = slug.trim() || finalTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `draft-${Date.now()}`;
    const finalDate = date || new Date().toISOString().split('T')[0];
    const finalCategory = category || (availableCategories.length > 0 ? availableCategories[0].name : 'JOURNAL');

    const payload = {
      title: finalTitle,
      slug: generatedSlug,
      date: finalDate,
      category: finalCategory,
      status: finalStatus,
      tag,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      reading_time: readingTime,
      excerpt,
      content,
      image: imageUrl
    };

    let result;
    if (id) {
      result = await supabase.from('journals').update(payload).eq('id', id);
    } else {
      result = await supabase.from('journals').insert([payload]);
    }

    setIsSaving(false);

    if (result.error) {
      alert("Error saving journal: " + result.error.message);
    } else {
      if (finalStatus !== 'DRAFT') {
        triggerDeploy();
      }
      router.push('/admin/dashboard');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>{id ? 'Edit Journal' : 'New Journal'}</h2>
      <form onSubmit={(e) => handleSave(e, false)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Journal title (Optional for drafts)" style={{ width: '100%', padding: '8px' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Slug</label>
          <input type="text" value={slug} onChange={e => setSlug(e.target.value)} placeholder="Auto-generated if blank" style={{ width: '100%', padding: '8px' }} />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '8px' }} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <label style={{ fontWeight: 'bold' }}>Category</label>
              <button
                type="button"
                onClick={() => setIsAddingNewCategory(!isAddingNewCategory)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007bff',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  textDecoration: 'underline'
                }}
              >
                {isAddingNewCategory ? 'Cancel' : '+ New Category'}
              </button>
            </div>

            {!isAddingNewCategory ? (
              <select
                value={category}
                onChange={(e) => {
                  if (e.target.value === '__NEW__') {
                    setIsAddingNewCategory(true);
                  } else {
                    setCategory(e.target.value);
                  }
                }}
                style={{ width: '100%', padding: '8px' }}
              >
                <option value="">Select Category</option>
                {availableCategories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
                <option value="__NEW__">+ Create New Category...</option>
              </select>
            ) : (
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="New Category Name (e.g. MARKETING)"
                  style={{ flex: 1, padding: '8px' }}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  disabled={isCreatingCategory || !newCategoryName.trim()}
                  style={{
                    padding: '8px 12px',
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {isCreatingCategory ? 'Adding...' : 'Add'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Reading Time</label>
            <input type="text" value={readingTime} onChange={e => setReadingTime(e.target.value)} placeholder="e.g. 5 min read" style={{ width: '100%', padding: '8px' }} />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Tags (comma-separated)</label>
            <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="SEO, React, AI" style={{ width: '100%', padding: '8px' }} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Excerpt</label>
          <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2} style={{ width: '100%', padding: '8px' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Cover Image</label>
          <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} style={{ marginBottom: '10px' }} />
          {existingImage && <div style={{ fontSize: '12px', color: '#666' }}>Current: {existingImage}</div>}
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Content (Markdown / WYSIWYG)</label>
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            tinymceScriptSrc={process.env.NEXT_PUBLIC_TINYMCE_API_KEY ? undefined : "https://cdn.jsdelivr.net/npm/tinymce@6/tinymce.min.js"}
            value={content}
            onEditorChange={(newContent) => setContent(newContent)}
            init={{
              height: 400,
              menubar: false,
              plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'],
              toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code | help',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            type="submit" 
            disabled={isSaving} 
            style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isSaving ? 'Saving...' : 'Save & Publish'}
          </button>
          <button 
            type="button" 
            onClick={(e) => handleSave(e as any, true)} 
            disabled={isSaving} 
            style={{ padding: '10px 20px', background: '#e65100', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isSaving ? 'Saving...' : 'Save as Draft'}
          </button>
          <button 
            type="button" 
            onClick={() => router.push('/admin/dashboard')} 
            style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
