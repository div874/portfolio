'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled page error:', error);
  }, [error]);

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center',
      color: '#fff'
    }}>
      <div style={{
        fontSize: '2.5rem',
        marginBottom: '16px'
      }}>
        ⚠️
      </div>
      <h2 style={{
        fontSize: '1.8rem',
        fontWeight: 600,
        marginBottom: '12px',
        letterSpacing: '-0.02em'
      }}>
        Something went wrong
      </h2>
      <p style={{
        color: '#888',
        maxWidth: '450px',
        marginBottom: '28px',
        lineHeight: 1.6
      }}>
        We ran into an unexpected issue while loading this page. Please try refreshing or return to the home page.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={() => reset()}
          className="glow-button"
          style={{
            padding: '12px 24px',
            fontSize: '0.95rem',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
        <Link
          href="/"
          style={{
            padding: '12px 24px',
            fontSize: '0.95rem',
            color: '#aaa',
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '8px',
            display: 'inline-flex',
            alignItems: 'center'
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
