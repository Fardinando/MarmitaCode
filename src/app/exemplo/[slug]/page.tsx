import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DEMO_TEMPLATES, DEMO_SLUGS } from './_templates/registry';

export function generateStaticParams() {
  return DEMO_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const demo = DEMO_TEMPLATES[slug];
  if (!demo) return { title: 'Demonstração' };
  return {
    title: `${demo.name} — Demonstração`,
    description: demo.description,
  };
}

export default async function TemplateDemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = DEMO_TEMPLATES[slug];
  if (!demo) notFound();
  const { Component } = demo;
  return <Component />;
}
