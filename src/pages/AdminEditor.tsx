import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { triggerDeploy } from '../utils/deploy';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import type { Category } from './AdminDashboard';

export const AdminEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      const { data, error } = await supabase.storage.from('journal-images').upload(fileName, imageFile);
      
      if (!error && data) {
        const { data: { publicUrl } } = supabase.storage.from('journal-images').getPublicUrl(fileName);
        imageUrl = publicUrl;
      } else {
        console.error("Image upload failed:", error);
      }
    }

    const journalData = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      date,
      category,
      status,
      tag,
      tags: tags.split(',').map(t => t.trim()),
      reading_time: readingTime,
      excerpt,
      content,
      image: imageUrl
    };

    let dbError = null;
    if (id) {
      const { error } = await supabase.from('journals').update(journalData).eq('id', id);
      dbError = error;
    } else {
      const { error } = await supabase.from('journals').insert([journalData]);
      dbError = error;
    }
    
    setIsSaving(false);

    if (dbError) {
      alert("Error saving journal: " + dbError.message + "\nDetails: " + dbError.details);
      console.error(dbError);
      return;
    }

    // Trigger Vercel Deploy to update sitemap
    triggerDeploy();

    navigate('/admin/dashboard');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>{id ? 'Edit' : 'Create'} Journal (Supabase)</h2>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required style={{ padding: '10px' }} />
        <input type="text" placeholder="Slug (optional)" value={slug} onChange={e => setSlug(e.target.value)} style={{ padding: '10px' }} />
        <input type="text" placeholder="Date (e.g. 09.21.26)" value={date} onChange={e => setDate(e.target.value)} required style={{ padding: '10px' }} />
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '10px' }} required>
          <option value="" disabled>Select a Category</option>
          {availableCategories.map(c => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} style={{ padding: '10px' }} />
        <input type="text" placeholder="Reading Time" value={readingTime} onChange={e => setReadingTime(e.target.value)} style={{ padding: '10px' }} />
        <textarea placeholder="Excerpt" value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3} style={{ padding: '10px' }} />
        
        <div>
          <label>Hero Image:</label><br/>
          {existingImage && <img src={existingImage} alt="Current" style={{ maxWidth: '200px', marginBottom: '10px' }} />}
          <input type="file" onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px' }}>Content:</label>
          <Editor
            apiKey="sz9kl4g31rsd4hwmyi2omfuww4ytlbwo5u6x47tnonkedtkh"
            value={content}
            onEditorChange={(newContent) => setContent(newContent)}
            init={{
              height: 400,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | code | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" disabled={isSaving} style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={() => navigate('/admin/dashboard')} style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Cancel</button>
        </div>
      </form>
    </div>
  );
};
