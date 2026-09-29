import { Suspense } from 'react';
import { AdminEditor } from '@/views/AdminEditor';

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: '40px' }}>Loading Editor...</div>}>
      <AdminEditor />
    </Suspense>
  );
}
