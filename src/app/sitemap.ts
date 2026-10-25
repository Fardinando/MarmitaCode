import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { getTemplates } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticPaths: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/templates`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/planos`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/login`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/termos`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/privacidade`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/tutorial/dominio-proprio`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const templates = await getTemplates().catch(() => []);
  const templatePaths: MetadataRoute.Sitemap = templates.map((t) => ({
    url: `${base}/templates/${t.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPaths, ...templatePaths];
}
