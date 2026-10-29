'use client';

import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Presentation, 
  FileSpreadsheet, 
  FileArchive, 
  Image as ImageIcon, 
  File, 
  UploadCloud, 
  Link2, 
  Trash2, 
  ExternalLink, 
  Plus, 
  Check, 
  Loader2, 
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { 
  DocumentAttachment, 
  AttachmentType, 
  detectAttachmentType, 
  uploadAttachmentFile 
} from '../utils/attachments';

interface AttachmentManagerProps {
  attachments: DocumentAttachment[];
  onChange: (attachments: DocumentAttachment[]) => void;
  title?: string;
  description?: string;
  preferredBucket?: string;
}

export const AttachmentManager: React.FC<AttachmentManagerProps> = ({
  attachments = [],
  onChange,
  title = 'Attachments & Documents',
  description = 'Upload or link PPT presentations, PDF whitepapers, Word docs, spreadsheets, or images.',
  preferredBucket = 'journal-images',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');

  // URL state
  const [urlName, setUrlName] = useState('');
  const [urlLink, setUrlLink] = useState('');
  const [urlType, setUrlType] = useState<AttachmentType>('pdf');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNameValue, setEditNameValue] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // File Upload Handler
  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    setUploadError('');

    const newAttachments: DocumentAttachment[] = [];
    const errors: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const res = await uploadAttachmentFile(file, preferredBucket);
      if (res.success && res.attachment) {
        newAttachments.push(res.attachment);
      } else {
        errors.push(`${file.name}: ${res.error || 'Failed to upload'}`);
      }
    }

    if (newAttachments.length > 0) {
      onChange([...attachments, ...newAttachments]);
    }

    if (errors.length > 0) {
      setUploadError(errors.join(', '));
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Add via direct URL Handler
  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlLink.trim()) return;

    const detected = detectAttachmentType(urlLink);
    const finalType = urlType !== 'other' ? urlType : detected;
    const finalName = urlName.trim() || urlLink.split('/').pop() || 'Document';

    const newAttachment: DocumentAttachment = {
      id: `att-link-${Date.now()}-${Math.random().toString(36).substring(5)}`,
      name: finalName,
      url: urlLink.trim(),
      type: finalType,
      uploadedAt: new Date().toISOString(),
    };

    onChange([...attachments, newAttachment]);
    setUrlName('');
    setUrlLink('');
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(attachments.filter((_, idx) => idx !== indexToRemove));
  };

  const startRename = (att: DocumentAttachment) => {
    setEditingId(att.id || null);
    setEditNameValue(att.name);
  };

  const saveRename = (index: number) => {
    if (!editNameValue.trim()) return;
    const updated = [...attachments];
    updated[index] = { ...updated[index], name: editNameValue.trim() };
    onChange(updated);
    setEditingId(null);
  };

  // Helper for badge colors and icons
  const getBadgeMeta = (type?: AttachmentType) => {
    switch (type) {
      case 'ppt':
      case 'pptx':
        return {
          label: 'PowerPoint / Slides',
          badgeBg: '#fff4e6',
          badgeColor: '#d9480f',
          borderColor: '#ffd8a8',
          icon: <Presentation size={18} color="#d9480f" />,
        };
      case 'pdf':
        return {
          label: 'PDF Document',
          badgeBg: '#fff5f5',
          badgeColor: '#e03131',
          borderColor: '#ffc9c9',
          icon: <FileText size={18} color="#e03131" />,
        };
      case 'doc':
      case 'docx':
        return {
          label: 'Word Document',
          badgeBg: '#e7f5ff',
          badgeColor: '#1971c2',
          borderColor: '#a5d8ff',
          icon: <FileText size={18} color="#1971c2" />,
        };
      case 'sheet':
        return {
          label: 'Spreadsheet / Data',
          badgeBg: '#ebfbee',
          badgeColor: '#2b8a3e',
          borderColor: '#b2f2bb',
          icon: <FileSpreadsheet size={18} color="#2b8a3e" />,
        };
      case 'image':
        return {
          label: 'Image File',
          badgeBg: '#f3f0ff',
          badgeColor: '#7950f2',
          borderColor: '#d0bfff',
          icon: <ImageIcon size={18} color="#7950f2" />,
        };
      case 'archive':
        return {
          label: 'ZIP / Archive',
          badgeBg: '#fff9db',
          badgeColor: '#f08c00',
          borderColor: '#ffec99',
          icon: <FileArchive size={18} color="#f08c00" />,
        };
      default:
        return {
          label: 'Document',
          badgeBg: '#f1f3f5',
          badgeColor: '#495057',
          borderColor: '#dee2e6',
          icon: <File size={18} color="#495057" />,
        };
    }
  };

  return (
    <div style={{
      background: '#fafbfc',
      border: '1px solid #e1e4e8',
      borderRadius: '10px',
      padding: '20px',
      marginTop: '12px',
      marginBottom: '12px'
    }}>
      {/* Title & Description */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1a1f2c', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileCheck size={18} color="#2563eb" />
            {title}
            <span style={{ fontSize: '12px', background: '#e0e7ff', color: '#3730a3', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
              {attachments.length} {attachments.length === 1 ? 'file' : 'files'}
            </span>
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>
            {description}
          </p>
        </div>

        {/* Upload Mode Switcher */}
        <div style={{ display: 'flex', gap: '4px', background: '#edf2f7', padding: '3px', borderRadius: '6px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 600,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              background: activeTab === 'upload' ? '#fff' : 'transparent',
              color: activeTab === 'upload' ? '#1e293b' : '#64748b',
              boxShadow: activeTab === 'upload' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            <UploadCloud size={13} /> Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 600,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              background: activeTab === 'url' ? '#fff' : 'transparent',
              color: activeTab === 'url' ? '#1e293b' : '#64748b',
              boxShadow: activeTab === 'url' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            <Link2 size={13} /> Link URL
          </button>
        </div>
      </div>

      {/* Upload Error Banner */}
      {uploadError && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#b91c1c',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          marginBottom: '12px'
        }}>
          <AlertCircle size={15} style={{ flexShrink: 0 }} />
          <span>{uploadError}</span>
        </div>
      )}

      {/* TAB 1: File Uploader */}
      {activeTab === 'upload' && (
        <div style={{
          border: '2px dashed #cbd5e1',
          borderRadius: '8px',
          padding: '20px 16px',
          textAlign: 'center',
          background: '#ffffff',
          cursor: isUploading ? 'not-allowed' : 'pointer',
          transition: 'border-color 0.2s',
          marginBottom: '16px'
        }}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".ppt,.pptx,.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.zip,image/*"
            style={{ display: 'none' }}
            onChange={e => handleFiles(e.target.files)}
          />

          {isUploading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#2563eb' }}>
              <Loader2 size={28} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 600 }}>Uploading document(s) to cloud storage...</p>
            </div>
          ) : (
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#eff6ff',
                color: '#2563eb',
                marginBottom: '8px'
              }}>
                <UploadCloud size={22} />
              </div>
              <p style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                Click to browse or drop PowerPoint (PPT/PPTX), PDF, Word, or other files
              </p>
              <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>
                Supports .pptx, .ppt, .pdf, .docx, .doc, .xlsx, .csv, .zip, and images
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Add by URL */}
      {activeTab === 'url' && (
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                Attachment Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Q3 Pitch Deck Slides"
                value={urlName}
                onChange={e => setUrlName(e.target.value)}
                style={{ width: '100%', padding: '7px 10px', fontSize: '13px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                Document / Slide Link URL *
              </label>
              <input
                type="url"
                placeholder="https://docs.google.com/presentation/... or https://..."
                value={urlLink}
                onChange={e => {
                  setUrlLink(e.target.value);
                  const detected = detectAttachmentType(e.target.value);
                  if (detected !== 'other') setUrlType(detected);
                }}
                style={{ width: '100%', padding: '7px 10px', fontSize: '13px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
              />
            </div>

            <div style={{ minWidth: '140px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                Document Format
              </label>
              <select
                value={urlType}
                onChange={e => setUrlType(e.target.value as AttachmentType)}
                style={{ width: '100%', padding: '7px 10px', fontSize: '13px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff' }}
              >
                <option value="pptx">PowerPoint (.pptx / Slides)</option>
                <option value="pdf">PDF Document (.pdf)</option>
                <option value="docx">Word Document (.docx)</option>
                <option value="sheet">Excel / Sheet (.xlsx, .csv)</option>
                <option value="image">Image (.png, .jpg)</option>
                <option value="archive">ZIP / Archive</option>
                <option value="other">Other Document</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddUrl}
            disabled={!urlLink.trim()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              background: urlLink.trim() ? '#2563eb' : '#94a3b8',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: urlLink.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            <Plus size={14} /> Add Document Link
          </button>
        </div>
      )}

      {/* Attachment Items List */}
      {attachments.length === 0 ? (
        <div style={{ padding: '14px', textAlign: 'center', color: '#94a3b8', fontSize: '12px' }}>
          No documents or presentations attached yet. Use the upload box or URL tab above.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {attachments.map((att, idx) => {
            const meta = getBadgeMeta(att.type);
            const isEditing = editingId === att.id;

            return (
              <div
                key={att.id || idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '7px',
                  gap: '12px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              >
                {/* Left: Icon & Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '6px',
                    background: meta.badgeBg,
                    border: `1px solid ${meta.borderColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {meta.icon}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    {isEditing ? (
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <input
                          type="text"
                          value={editNameValue}
                          onChange={e => setEditNameValue(e.target.value)}
                          style={{ padding: '4px 8px', fontSize: '12px', borderRadius: '4px', border: '1px solid #2563eb', flex: 1 }}
                        />
                        <button
                          type="button"
                          onClick={() => saveRename(idx)}
                          style={{ padding: '4px 8px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span
                          title={att.name}
                          style={{
                            fontWeight: 600,
                            fontSize: '13px',
                            color: '#1e293b',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '380px'
                          }}
                        >
                          {att.name}
                        </span>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '4px',
                          background: meta.badgeBg,
                          color: meta.badgeColor,
                          border: `1px solid ${meta.borderColor}`,
                          textTransform: 'uppercase'
                        }}>
                          {meta.label}
                        </span>
                        {att.size && (
                          <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                            ({att.size})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => startRename(att)}
                      title="Rename attachment"
                      style={{
                        padding: '5px 8px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '5px',
                        color: '#64748b',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: 500
                      }}
                    >
                      Rename
                    </button>
                  )}

                  {att.url && (
                    <a
                      href={att.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Preview / Open link"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '5px 8px',
                        background: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        borderRadius: '5px',
                        color: '#16a34a',
                        textDecoration: 'none',
                        fontSize: '11px',
                        fontWeight: 600
                      }}
                    >
                      <ExternalLink size={12} /> Test Link
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    title="Remove attachment"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '5px 8px',
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '5px',
                      color: '#dc2626',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

