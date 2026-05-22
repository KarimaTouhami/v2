'use client';

import { use } from 'react';
import { ProjectDetailPage } from '@/components/pages/ProjectDetailPage';

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <ProjectDetailPage projectId={id} />;
}
