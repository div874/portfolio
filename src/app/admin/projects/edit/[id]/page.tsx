import { Suspense } from 'react';
import { AdminProjectEditor } from '@/views/AdminProjectEditor';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading Project Editor...</div>}>
      <AdminProjectEditor id={id} />
    </Suspense>
  );
}
