import { Suspense } from 'react';
import { AdminProjectEditor } from '@/views/AdminProjectEditor';

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading Project Editor...</div>}>
      <AdminProjectEditor />
    </Suspense>
  );
}
