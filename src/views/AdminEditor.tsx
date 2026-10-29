'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { triggerDeploy } from '../utils/deploy';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import type { Category } from './AdminDashboard';
import { AttachmentManager } from '../components/AttachmentManager';
import { DocumentAttachment, normalizeAttachments, uploadAttachmentFile } from '../utils/attachments';
import { Paperclip, Image as ImageIcon, Trash2, ExternalLink } from 'lucide-react';

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
  const [attachments, setAttachments] = useState<DocumentAttachment[]>([]);
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
      const fetchEntry = async () => {
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
          setAttachments(normalizeAttachments(data.attachments));
        }
      };
      fetchEntry();
    }
  }, [id]);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    setIsCreatingCategory(true);
    const catName = newCategoryName.trim().toUpperCase();
    const catSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const { data, error } = await supabase.from('categories').insert([
      { name: catName, slug: catSlug, description: '' }
    ]).select().single();

    if (error) {
      alert("Error adding category: " + error.message);
    } else if (data) {
      setAvailableCategories(prev => [...prev, data as Category]);
      setCategory(data.name);
      setNewCategoryName('');
      setIsAddingNewCategory(false);
    }
    setIsCreatingCategory(false);
  };

  const handleSave = async (e: React.FormEvent, isDraftMode: boolean = false) => {
    e.preventDefault();
    setIsSaving(true);

    let imageUrl = existingImage;

    if (imageFile) {
      const uploadRes = await uploadAttachmentFile(imageFile, 'journal-images');
      if (uploadRes.success && uploadRes.attachment) {
        imageUrl = uploadRes.attachment.url;
      } else {
        alert("File upload failed: " + (uploadRes.error || 'Unknown error'));
        setIsSaving(false);
        return;
      }
    }

    const finalStatus = isDraftMode ? 'DRAFT' : (status || 'PUBLISHED');
    const finalTitle = title.trim() || (isDraftMode ? `Untitled Draft (${new Date().toLocaleDateString()})` : 'Untitled Journal');
    const generatedSlug = slug.trim() || finalTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `draft-${Date.now()}`;
    const finalDate = date || new Date().toISOString().split('T')[0];
    const finalCategory = category || (availableCategories.length > 0 ? availableCategories[0].name : 'JOURNAL');

    const payload: any = {
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
      image: imageUrl,
      attachments: attachments
    };

    if (tag === 'FEATURED') {
      await supabase.from('journals').update({ tag: 'Journal' }).eq('tag', 'FEATURED');
      if (typeof window !== 'undefined') {
        localStorage.setItem('featured_journal_slug', generatedSlug);
      }
    }

    let result;
    const executeSave = async (dataPayload: any) => {
      if (id) {
        return await supabase.from('journals').update(dataPayload).eq('id', id);
      } else {
        return await supabase.from('journals').insert([dataPayload]);
      }
    };

    result = await executeSave(payload);

    // If attachments column is missing from Supabase journals table, retry without it
    if (result.error && (result.error.message?.includes('attachments') || result.error.code === 'PGRST204')) {
      console.warn('Journals table missing attachments column, retrying without it:', result.error.message);
      const fallback = { ...payload };
      delete fallback.attachments;
      result = await executeSave(fallback);
    }

    setIsSaving(false);

    if (result.error) {
      alert(`Error saving journal: ` + result.error.message);
    } else {
      if (finalStatus !== 'DRAFT') {
        triggerDeploy();
      }
      router.push('/admin/dashboard');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>{id ? 'Edit Journal Entry' : 'New Journal Entry'}</h2>
      </div>

      <form onSubmit={(e) => handleSave(e, false)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Journal title" style={{ width: '100%', padding: '8px' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Slug</label>
          <input type="text" value={slug} onChange={e => setSlug(e.target.value)} placeholder="Auto-generated from title if blank" style={{ width: '100%', padding: '8px' }} />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Publish Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '8px' }} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <label style={{ fontWeight: 'bold' }}>Category</label>
              {!isAddingNewCategory && (
                <button
                  type="button"
                  onClick={() => setIsAddingNewCategory(true)}
                  style={{
                    fontSize: '12px',
                    background: 'none',
                    border: 'none',
                    color: '#007bff',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  + Add Category
                </button>
              )}
            </div>

            {!isAddingNewCategory ? (
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{ width: '100%', padding: '8px' }}
              >
                {availableCategories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="New Category Name"
                  value={newCategoryName}
                  onChange={e => setNewCategoryName(e.target.value)}
                  style={{ flex: 1, padding: '8px' }}
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
            <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="Marketing, AI, Python, Strategy" style={{ width: '100%', padding: '8px' }} />
          </div>
        </div>

        <div style={{ background: '#fff9e6', padding: '12px 16px', borderRadius: '6px', border: '1px solid #ffeeba', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input 
            type="checkbox" 
            id="featuredCheckbox" 
            checked={tag?.toUpperCase() === 'FEATURED'} 
            onChange={e => setTag(e.target.checked ? 'FEATURED' : 'Journal')}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <label htmlFor="featuredCheckbox" style={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', color: '#856404' }}>
            ⭐ Pin as Featured Post on Homepage (will not change automatically)
          </label>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Excerpt / Summary</label>
          <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2} style={{ width: '100%', padding: '8px' }} />
        </div>

        <div style={{ background: '#fdfdfd', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '8px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
            Cover Media / Header Image (or Document)
          </label>
          <p style={{ margin: '0 0 10px', fontSize: '12px', color: '#64748b' }}>
            Upload an image, PDF preview, or presentation slide cover for this journal entry.
          </p>
          
          <input 
            type="file" 
            accept="image/*,.pdf,.ppt,.pptx,.doc,.docx" 
            onChange={e => setImageFile(e.target.files?.[0] || null)} 
            style={{ marginBottom: '8px', display: 'block' }} 
          />

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px' }}>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Or Direct URL:</span>
            <input
              type="text"
              placeholder="https://... cover image or document URL"
              value={existingImage}
              onChange={e => setExistingImage(e.target.value)}
              style={{ flex: 1, padding: '6px 10px', fontSize: '13px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            />
            {existingImage && (
              <button
                type="button"
                onClick={() => setExistingImage('')}
                title="Remove cover media"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 10px',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '4px',
                  color: '#dc2626',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={13} /> Clear
              </button>
            )}
          </div>

          {existingImage && (
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              {existingImage.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i) || existingImage.includes('supabase') ? (
                <img 
                  src={existingImage} 
                  alt="Cover Preview" 
                  style={{ maxHeight: '80px', borderRadius: '4px', border: '1px solid #ddd', objectFit: 'cover' }} 
                />
              ) : null}
              <a
                href={existingImage}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '12px', color: '#2563eb', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
              >
                <ExternalLink size={13} /> View Current Media
              </a>
            </div>
          )}
        </div>

        {/* PPTs, PDFs, and Other Document Attachments */}
        <AttachmentManager
          attachments={attachments}
          onChange={setAttachments}
          title="Document & Presentation Attachments"
          description="Attach PPT/PPTX slide decks, PDF whitepapers, Word docs, spreadsheets, or research papers for visitors to view or download."
          preferredBucket="journal-images"
        />

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Journal Content (Rich Text / HTML)</label>
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            tinymceScriptSrc={process.env.NEXT_PUBLIC_TINYMCE_API_KEY ? undefined : "https://cdn.jsdelivr.net/npm/tinymce@6/tinymce.min.js"}
            value={content}
            onEditorChange={(newContent) => setContent(newContent)}
            init={{
              height: 450,
              menubar: false,
              plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'],
              toolbar: 'undo redo | blocks | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image code table | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
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
