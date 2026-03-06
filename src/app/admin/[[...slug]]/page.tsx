import { Admin } from 'payload/admin';
import { initPayload } from '@/payload/init';

export default async function AdminPage() {
  await initPayload();
  return <Admin />;
}
