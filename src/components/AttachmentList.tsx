'use client';

import React from 'react';
import { 
  FileText, 
  Presentation, 
  FileSpreadsheet, 
  FileArchive, 
  Image as ImageIcon, 
  File, 
  Download, 
  ExternalLink,
  Paperclip
} from 'lucide-react';
import { DocumentAttachment, AttachmentType } from '../utils/attachments';

interface AttachmentListProps {
  attachments?: DocumentAttachment[];
  title?: string;
  className?: string;
}

export const AttachmentList: React.FC<AttachmentListProps> = ({
  attachments = [],
  title = 'Attached Presentations & Documents',
  className = '',
}) => {
  if (!attachments || attachments.length === 0) return null;

  const getTypeMeta = (type?: AttachmentType) => {
    switch (type) {
      case 'ppt':
      case 'pptx':
        return {
          label: 'PowerPoint / Slide Deck',
          icon: <Presentation size={22} className="text-orange-500" />,
          color: '#f97316',
          bg: 'rgba(249, 115, 22, 0.1)',
          border: 'rgba(249, 115, 22, 0.3)',
          actionText: 'View Presentation',
        };
      case 'pdf':
        return {
          label: 'PDF Document',
          icon: <FileText size={22} className="text-rose-500" />,
          color: '#f43f5e',
          bg: 'rgba(244, 63, 94, 0.1)',
          border: 'rgba(244, 63, 94, 0.3)',
          actionText: 'Read PDF',
        };
      case 'doc':
      case 'docx':
        return {
          label: 'Word Document',
          icon: <FileText size={22} className="text-blue-500" />,
          color: '#3b82f6',
          bg: 'rgba(59, 130, 246, 0.1)',
          border: 'rgba(59, 130, 246, 0.3)',
          actionText: 'Download Document',
        };
      case 'sheet':
        return {
          label: 'Spreadsheet / Data',
          icon: <FileSpreadsheet size={22} className="text-emerald-500" />,
          color: '#10b981',
          bg: 'rgba(16, 185, 129, 0.1)',
          border: 'rgba(16, 185, 129, 0.3)',
          actionText: 'View Spreadsheet',
        };
      case 'image':
        return {
          label: 'Image Asset',
          icon: <ImageIcon size={22} className="text-purple-500" />,
          color: '#a855f7',
          bg: 'rgba(168, 85, 247, 0.1)',
          border: 'rgba(168, 85, 247, 0.3)',
          actionText: 'View Image',
        };
      case 'archive':
        return {
          label: 'ZIP Archive',
          icon: <FileArchive size={22} className="text-amber-500" />,
          color: '#f59e0b',
          bg: 'rgba(245, 158, 11, 0.1)',
          border: 'rgba(245, 158, 11, 0.3)',
          actionText: 'Download Archive',
        };
      default:
        return {
          label: 'Document',
          icon: <File size={22} className="text-slate-400" />,
          color: '#94a3b8',
          bg: 'rgba(148, 163, 184, 0.1)',
          border: 'rgba(148, 163, 184, 0.3)',
          actionText: 'View File',
        };
    }
  };

  return (
    <section className={`attachment-list-section ${className}`} style={{ marginTop: '36px', marginBottom: '36px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px'
      }}>
        <Paperclip size={18} style={{ color: 'var(--accent-color, #a855f7)' }} />
        <h3 style={{
          fontFamily: '"Outfit", sans-serif',
          fontSize: '1.15rem',
          fontWeight: 700,
          color: 'var(--text-primary, #ffffff)',
          margin: 0,
          letterSpacing: '0.5px'
        }}>
          {title}
        </h3>
        <span style={{
          fontSize: '0.75rem',
          padding: '2px 8px',
          borderRadius: '12px',
          background: 'rgba(168, 85, 247, 0.15)',
          color: 'var(--accent-color, #c084fc)',
          fontWeight: 600,
          marginLeft: '4px'
        }}>
          {attachments.length}
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '14px'
      }}>
        {attachments.map((att, idx) => {
          const meta = getTypeMeta(att.type);
          const isDownloadable = Boolean(att.url);

          return (
            <div
              key={att.id || idx}
              style={{
                background: 'var(--card-bg, rgba(255, 255, 255, 0.03))',
                border: `1px solid ${meta.border}`,
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px',
                backdropFilter: 'blur(8px)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  padding: '10px',
                  borderRadius: '10px',
                  background: meta.bg,
                  color: meta.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {meta.icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{
                    display: 'inline-block',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: meta.color,
                    marginBottom: '4px'
                  }}>
                    {meta.label}
                  </span>
                  <h4 style={{
                    margin: '0 0 4px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--text-primary, #ffffff)',
                    lineHeight: 1.3,
                    wordBreak: 'break-word',
                  }}>
                    {att.name}
                  </h4>
                  {att.size && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #94a3b8)' }}>
                      Size: {att.size}
                    </span>
                  )}
                </div>
              </div>

              {isDownloadable && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <a
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={att.name}
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      background: meta.bg,
                      color: meta.color,
                      border: `1px solid ${meta.border}`,
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                  >
                    <Download size={14} /> {meta.actionText}
                  </a>

                  <a
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in new tab"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      background: 'var(--card-bg, rgba(255, 255, 255, 0.05))',
                      color: 'var(--text-secondary, #94a3b8)',
                      border: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                    }}
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

