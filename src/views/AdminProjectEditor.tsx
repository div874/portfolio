'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PROJECT_CATEGORIES, ProjectDetail } from '../data/projectsData';
import { getProjects, getProjectBySlug, saveProject, deleteProject } from '../utils/projects';
import { ArrowLeft, Plus, Trash2, ExternalLink, Save, CheckCircle2, Image as ImageIcon, UploadCloud } from 'lucide-react';
import { AttachmentManager } from '../components/AttachmentManager';
import { DocumentAttachment, uploadAttachmentFile } from '../utils/attachments';

interface AdminProjectEditorProps {
  id?: string;
}

export const AdminProjectEditor: React.FC<AdminProjectEditorProps> = ({ id: propId }) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = propId || (params?.id as string) || (searchParams?.get('id') as string) || '';
  const slugParam = (searchParams?.get('slug') as string) || '';

  // Form State
  const [projectId, setProjectId] = useState<string>('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [hasManuallyEditedSlug, setHasManuallyEditedSlug] = useState(false);
  const [category, setCategory] = useState<string>('AI Projects');
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [role, setRole] = useState('Full-Stack Developer');
  const [type, setType] = useState('Personal Project');
  const [tagline, setTagline] = useState('');
  const [problem, setProblem] = useState('');
  const [approach, setApproach] = useState<string[]>(['']);
  const [architecture, setArchitecture] = useState('');
  const [technologiesText, setTechnologiesText] = useState('');
  const [results, setResults] = useState<string[]>(['']);
  const [learnings, setLearnings] = useState('');
  const [liveLink, setLiveLink] = useState('#');
  const [codeLink, setCodeLink] = useState('#');
  const [featured, setFeatured] = useState(false);
  const [orderIndex, setOrderIndex] = useState(0);
  const [coverImage, setCoverImage] = useState('');
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [attachments, setAttachments] = useState<DocumentAttachment[]>([]);
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Check auth session
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin');
        return;
      }

      // Load project if editing
      if (id || slugParam) {
        await loadProject(id, slugParam);
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [id, slugParam, router]);

  const loadProject = async (targetId: string, targetSlug: string) => {
    setLoading(true);
    try {
      let found: ProjectDetail | null = null;

      // 1. Try by slug if provided
      if (targetSlug) {
        found = await getProjectBySlug(targetSlug);
      }

      // 2. Try by id if not found yet
      if (!found && targetId) {
        const all = await getProjects();
        found = all.find(p => p.id === targetId || p.slug === targetId) || null;
      }

      if (found) {
        setProjectId(found.id || '');
        setTitle(found.title || '');
        setSlug(found.slug || '');
        setHasManuallyEditedSlug(true);

        const standardCategories = PROJECT_CATEGORIES.filter(c => c !== 'All') as string[];
        if (standardCategories.includes(found.category)) {
          setCategory(found.category);
          setIsCustomCategory(false);
        } else {
          setCategory('Custom');
          setCustomCategory(found.category);
          setIsCustomCategory(true);
        }

        setRole(found.role || '');
        setType(found.type || '');
        setTagline(found.tagline || '');
        setProblem(found.problem || '');
        setApproach(found.approach && found.approach.length > 0 ? found.approach : ['']);
        setArchitecture(found.architecture || '');
        setTechnologiesText(found.technologies ? found.technologies.join(', ') : '');
        setResults(found.results && found.results.length > 0 ? found.results : ['']);
        setLearnings(found.learnings || '');
        setLiveLink(found.links?.live || '#');
        setCodeLink(found.links?.code || '#');
        setFeatured(Boolean(found.featured));
        setOrderIndex(found.order_index ?? 0);
        setCoverImage(found.image || '');
        setAttachments(found.attachments || []);
      }
    } catch (err: any) {
      console.error('Failed to load project:', err);
      setErrorMessage('Failed to load project details.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate slug when title changes unless slug was manually edited
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!hasManuallyEditedSlug) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generated);
    }
  };

  // Approach list handlers
  const handleAddApproachStep = () => {
    setApproach(prev => [...prev, '']);
  };

  const handleApproachChange = (index: number, val: string) => {
    setApproach(prev => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleRemoveApproachStep = (index: number) => {
    setApproach(prev => (prev.length > 1 ? prev.filter((_, i) => i !== index) : ['']));
  };

  // Results list handlers
  const handleAddResult = () => {
    setResults(prev => [...prev, '']);
  };

  const handleResultChange = (index: number, val: string) => {
    setResults(prev => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleRemoveResult = (index: number) => {
    setResults(prev => (prev.length > 1 ? prev.filter((_, i) => i !== index) : ['']));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSaveSuccess(false);

    if (!title.trim()) {
      setErrorMessage('Project title is required.');
      return;
    }

    const finalSlug = (slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) || `project-${Date.now()}`;
    const finalCategory = isCustomCategory ? (customCategory.trim() || 'AI Projects') : category;
    const finalTechnologies = technologiesText
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
    const finalApproach = approach.map(a => a.trim()).filter(Boolean);
    const finalResults = results.map(r => r.trim()).filter(Boolean);

    setIsSaving(true);

    let finalImage = coverImage.trim();
    if (coverImageFile) {
      const uploadRes = await uploadAttachmentFile(coverImageFile, 'journal-images');
      if (uploadRes.success && uploadRes.attachment) {
        finalImage = uploadRes.attachment.url;
      }
    }

    const projectPayload: Partial<ProjectDetail> & { slug: string; title: string } = {
      id: projectId || undefined,
      slug: finalSlug,
      title: title.trim(),
      category: finalCategory,
      role: role.trim() || 'Developer',
      type: type.trim() || 'Personal Project',
      tagline: tagline.trim(),
      problem: problem.trim(),
      approach: finalApproach,
      architecture: architecture.trim(),
      technologies: finalTechnologies,
      results: finalResults,
      learnings: learnings.trim(),
      links: {
        live: liveLink.trim() || '#',
        code: codeLink.trim() || '#',
      },
      featured,
      order_index: Number(orderIndex) || 0,
      image: finalImage || undefined,
      attachments: attachments,
    };

    try {
      // 1. Try API route
      const apiRes = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project: projectPayload }),
      });

      const resData = await apiRes.json();

      if (!apiRes.ok || resData.error) {
        // Fallback to client-side saveProject utility (Supabase direct + local cache)
        const clientRes = await saveProject(projectPayload);
        if (!clientRes.success && !clientRes.data) {
          throw new Error(clientRes.error || resData.error || 'Failed to save project');
        }
      }

      setSaveSuccess(true);
      setTimeout(() => {
        router.push('/admin/dashboard?tab=projects');
      }, 900);
    } catch (err: any) {
      console.error('Error saving project:', err);
      // Try direct client save as last resort
      const clientRes = await saveProject(projectPayload);
      if (clientRes.data) {
        setSaveSuccess(true);
        setTimeout(() => {
          router.push('/admin/dashboard?tab=projects');
        }, 900);
      } else {
        setErrorMessage(err.message || 'Error occurred while saving project.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const target = projectId || slug;
    if (!target) return;

    if (window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      setIsSaving(true);
      try {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'delete', id: projectId, slug }),
        });
        await deleteProject(projectId || slug, slug);
        router.push('/admin/dashboard?tab=projects');
      } catch (err: any) {
        alert('Failed to delete: ' + err.message);
        setIsSaving(false);
      }
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '960px', margin: '60px auto', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>Loading Project Details...</p>
      </div>
    );
  }

  const isEditing = Boolean(projectId || slugParam);

  return (
    <div style={{ maxWidth: '960px', margin: '40px auto', padding: '20px 24px', fontFamily: 'sans-serif' }}>
      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/admin/dashboard?tab=projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              background: '#f1f3f5',
              color: '#495057',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#1a1a1a' }}>
            {isEditing ? `Edit: ${title || 'Project'}` : 'Add New Project'}
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {isEditing && slug && (
            <Link
              href={`/projects/${slug}`}
              target="_blank"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1px solid #ced4da',
                color: '#495057',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              <ExternalLink size={14} /> Preview Live
            </Link>
          )}

          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSaving}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '6px',
                background: '#fff1f0',
                border: '1px solid #ffa39e',
                color: '#cf1322',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              <Trash2 size={14} /> Delete
            </button>
          )}
        </div>
      </div>

      {/* Success Notification */}
      {saveSuccess && (
        <div style={{ background: '#d4edda', color: '#155724', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #c3e6cb' }}>
          <CheckCircle2 size={18} />
          <strong>Project saved successfully! Redirecting to dashboard...</strong>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div style={{ background: '#f8d7da', color: '#721c24', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #f5c6cb' }}>
          <strong>Error: </strong> {errorMessage}
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSave} style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e9ecef', padding: '28px', display: 'flex', flexDirection: 'column', gap: '22px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        
        {/* Row 1: Title & Slug */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px', color: '#212529' }}>
              Project Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Wallcurry AI Recommendation Model"
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '14px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px', color: '#212529' }}>
              Slug (URL path) *
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#868e96', fontSize: '13px' }}>/projects/</span>
              <input
                type="text"
                required
                placeholder="e.g. wallcurry-ai-recommendation"
                value={slug}
                onChange={e => {
                  setSlug(e.target.value);
                  setHasManuallyEditedSlug(true);
                }}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '14px' }}
              />
            </div>
          </div>
        </div>

        {/* Row 2: Category, Role, Type */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px', color: '#212529' }}>
              Category *
            </label>
            <select
              value={isCustomCategory ? 'Custom' : category}
              onChange={e => {
                if (e.target.value === 'Custom') {
                  setIsCustomCategory(true);
                } else {
                  setIsCustomCategory(false);
                  setCategory(e.target.value);
                }
              }}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '14px', background: '#fff' }}
            >
              {PROJECT_CATEGORIES.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
              <option value="Custom">+ Custom Category...</option>
            </select>

            {isCustomCategory && (
              <input
                type="text"
                placeholder="Enter custom category name"
                value={customCategory}
                onChange={e => setCustomCategory(e.target.value)}
                style={{ width: '100%', marginTop: '8px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '14px' }}
              />
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px', color: '#212529' }}>
              Role
            </label>
            <input
              type="text"
              placeholder="e.g. AI/ML Developer, Growth Engineer"
              value={role}
              onChange={e => setRole(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '14px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px', color: '#212529' }}>
              Project Type
            </label>
            <input
              type="text"
              placeholder="e.g. Personal Project, Professional Project, Client Work"
              value={type}
              onChange={e => setType(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '14px' }}
            />
          </div>
        </div>

        {/* Tagline / Summary */}
        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px', color: '#212529' }}>
            Tagline / Quick Summary *
          </label>
          <input
            type="text"
            required
            placeholder="A compelling 1-2 sentence overview shown in the project card..."
            value={tagline}
            onChange={e => setTagline(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '14px' }}
          />
        </div>

        {/* Problem Statement */}
        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px', color: '#212529' }}>
            The Problem *
          </label>
          <textarea
            required
            rows={4}
            placeholder="Describe the context, friction, or challenge that triggered this project..."
            value={problem}
            onChange={e => setProblem(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '14px', lineHeight: 1.5, resize: 'vertical' }}
          />
        </div>

        {/* Solution & Approach (Dynamic List) */}
        <div style={{ background: '#f8f9fa', padding: '18px', borderRadius: '8px', border: '1px solid #e9ecef' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: '14px', color: '#212529' }}>
                The Solution & Approach (Step-by-Step)
              </label>
              <p style={{ margin: '2px 0 0 0', color: '#6c757d', fontSize: '12px' }}>
                Add the key milestones and technical approach steps taken to build this solution.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddApproachStep}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                background: '#e7f5ff',
                color: '#1971c2',
                border: '1px solid #a5d8ff',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              <Plus size={14} /> Add Step
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {approach.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#868e96', width: '24px' }}>
                  #{idx + 1}
                </span>
                <input
                  type="text"
                  placeholder={`Approach step ${idx + 1}`}
                  value={step}
                  onChange={e => handleApproachChange(idx, e.target.value)}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '14px' }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveApproachStep(idx)}
                  title="Remove step"
                  style={{
                    padding: '8px',
                    background: '#fff',
                    border: '1px solid #dee2e6',
                    borderRadius: '6px',
                    color: '#fa5252',
                    cursor: 'pointer',
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture */}
        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px', color: '#212529' }}>
            System Architecture (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. GSC API + GA4 API → Python (Pandas) → ReportLab PDF → SMTP Email"
            value={architecture}
            onChange={e => setArchitecture(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '14px', fontFamily: 'monospace' }}
          />
        </div>

        {/* Technologies (Tech Stack) */}
        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px', color: '#212529' }}>
            Technologies / Tech Stack (comma separated)
          </label>
          <input
            type="text"
            placeholder="e.g. Next.js 15, React 19, TypeScript, Framer Motion, Supabase"
            value={technologiesText}
            onChange={e => setTechnologiesText(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '14px' }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
            {technologiesText.split(',').map(t => t.trim()).filter(Boolean).map((tech, i) => (
              <span key={i} style={{ background: '#f1f3f5', color: '#495057', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 500 }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Impact & Results (Dynamic List) */}
        <div style={{ background: '#f8f9fa', padding: '18px', borderRadius: '8px', border: '1px solid #e9ecef' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: '14px', color: '#212529' }}>
                Impact Highlights & Quantifiable Results
              </label>
              <p style={{ margin: '2px 0 0 0', color: '#6c757d', fontSize: '12px' }}>
                Measurable outcomes (e.g. "Saved 6 hrs/week", "88% recommendation accuracy", "30% sales lift").
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddResult}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                background: '#e6fcf5',
                color: '#0ca678',
                border: '1px solid #96f2d7',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              <Plus size={14} /> Add Metric
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {results.map((res, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#0ca678', width: '20px', textAlign: 'center' }}>
                  ✦
                </span>
                <input
                  type="text"
                  placeholder={`e.g. Reporting time reduced from 6 hours to 15 minutes per week`}
                  value={res}
                  onChange={e => handleResultChange(idx, e.target.value)}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '14px' }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveResult(idx)}
                  title="Remove metric"
                  style={{
                    padding: '8px',
                    background: '#fff',
                    border: '1px solid #dee2e6',
                    borderRadius: '6px',
                    color: '#fa5252',
                    cursor: 'pointer',
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Learnings */}
        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px', color: '#212529' }}>
            What I Learned / Reflections
          </label>
          <textarea
            rows={3}
            placeholder="Key technical and engineering takeaways learned from building this..."
            value={learnings}
            onChange={e => setLearnings(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '14px', lineHeight: 1.5, resize: 'vertical' }}
          />
        </div>

        {/* Links: Live and Code */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px', color: '#212529' }}>
              Live Demo / Website URL
            </label>
            <input
              type="text"
              placeholder="https://... or # if not public"
              value={liveLink}
              onChange={e => setLiveLink(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '14px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px', color: '#212529' }}>
              GitHub / Source Code URL
            </label>
            <input
              type="text"
              placeholder="https://github.com/... or # if private"
              value={codeLink}
              onChange={e => setCodeLink(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '14px' }}
            />
          </div>
        </div>

        {/* Project Media & Cover */}
        <div style={{ background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '8px', padding: '18px' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '4px', color: '#212529' }}>
            Project Preview Image / Banner
          </label>
          <p style={{ margin: '0 0 10px', fontSize: '12px', color: '#6c757d' }}>
            Upload a preview screenshot, diagram, or banner image for this project.
          </p>

          <input
            type="file"
            accept="image/*,.pdf,.ppt,.pptx"
            onChange={e => setCoverImageFile(e.target.files?.[0] || null)}
            style={{ marginBottom: '8px', display: 'block' }}
          />

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px' }}>
            <span style={{ fontSize: '12px', color: '#6c757d', fontWeight: 500 }}>Or Direct URL:</span>
            <input
              type="text"
              placeholder="https://... image or preview asset URL"
              value={coverImage}
              onChange={e => setCoverImage(e.target.value)}
              style={{ flex: 1, padding: '7px 10px', fontSize: '13px', border: '1px solid #ced4da', borderRadius: '4px' }}
            />
            {coverImage && (
              <button
                type="button"
                onClick={() => setCoverImage('')}
                title="Remove image"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 10px',
                  background: '#fff1f0',
                  border: '1px solid #ffa39e',
                  borderRadius: '4px',
                  color: '#cf1322',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={13} /> Clear
              </button>
            )}
          </div>

          {coverImage && (
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              {coverImage.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i) || coverImage.includes('supabase') ? (
                <img
                  src={coverImage}
                  alt="Project Preview"
                  style={{ maxHeight: '80px', borderRadius: '4px', border: '1px solid #dee2e6', objectFit: 'cover' }}
                />
              ) : null}
              <a
                href={coverImage}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '12px', color: '#228be6', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
              >
                <ExternalLink size={13} /> View Preview Media
              </a>
            </div>
          )}
        </div>

        {/* PPTs, PDFs, and Other Document Attachments */}
        <AttachmentManager
          attachments={attachments}
          onChange={setAttachments}
          title="Project Presentations, Pitch Decks & Documents"
          description="Attach PowerPoint slides (PPT/PPTX), PDF whitepapers, architectural design documents, or reports for visitors to view or download."
          preferredBucket="journal-images"
        />

        {/* Extra Options: Featured & Order */}
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center', background: '#fdf7e7', padding: '16px', borderRadius: '8px', border: '1px solid #fce8b3', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '14px', color: '#856404' }}>
            <input
              type="checkbox"
              checked={featured}
              onChange={e => setFeatured(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#e69500' }}
            />
            ⭐ Feature in "Selected Work" on Homepage
          </label>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 600, color: '#856404' }}>
              Sort Order Index:
            </label>
            <input
              type="number"
              value={orderIndex}
              onChange={e => setOrderIndex(Number(e.target.value) || 0)}
              style={{ width: '70px', padding: '6px 8px', borderRadius: '4px', border: '1px solid #ced4da', fontSize: '14px' }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px', paddingTop: '16px', borderTop: '1px solid #e9ecef' }}>
          <Link
            href="/admin/dashboard?tab=projects"
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: '1px solid #ced4da',
              background: '#fff',
              color: '#495057',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSaving}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 24px',
              borderRadius: '6px',
              border: 'none',
              background: isSaving ? '#adb5bd' : '#228be6',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              cursor: isSaving ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 6px rgba(34,139,230,0.3)',
            }}
          >
            <Save size={16} /> {isSaving ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Project')}
          </button>
        </div>

      </form>
    </div>
  );
};
