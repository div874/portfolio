import { Suspense } from 'react';
import { AdminEditor } from '@/views/AdminEditor';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<div style={{ padding: '40px' }}>Loading Editor...</div>}>
      <AdminEditor id={id} />
    </Suspense>
  );
}
