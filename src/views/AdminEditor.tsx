'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { triggerDeploy } from '../utils/deploy';
import { useRouter, useParams } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';
import type { Category } from './AdminDashboard';

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

  const handleSave = async (e: React.FormEvent) => {
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

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      date: date || new Date().toISOString().split('T')[0],
      category,
      status,
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
      triggerDeploy();
      router.push('/admin/dashboard');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>{id ? 'Edit Journal' : 'New Journal'}</h2>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Title *</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Slug</label>
          <input type="text" value={slug} onChange={e => setSlug(e.target.value)} placeholder="Auto-generated if blank" style={{ width: '100%', padding: '8px' }} />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Date *</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Category *</label>
            <select value={category} onChange={e => setCategory(e.target.value)} required style={{ width: '100%', padding: '8px' }}>
              {availableCategories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: '100%', padding: '8px' }}>
              <option value="">None</option>
              <option value="LEARNING">LEARNING</option>
              <option value="BUILDING">BUILDING</option>
              <option value="UNDERSTOOD">UNDERSTOOD</option>
              <option value="REVISITING">REVISITING</option>
            </select>
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
            apiKey="no-api-key"
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
          <button type="submit" disabled={isSaving} style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {isSaving ? 'Saving...' : 'Save Journal'}
          </button>
          <button type="button" onClick={() => router.push('/admin/dashboard')} style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
