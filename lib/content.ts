import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type {
  SiteConfig,
  HomePageContent,
  AboutPageContent,
  ContactPageContent
} from './types';

const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Generic markdown file reader with frontmatter parsing
 */
function readMarkdownFile<T>(filePath: string): { data: T; content: string } {
  const fullPath = path.join(contentDirectory, filePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Content file not found: ${filePath}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return { data: data as T, content };
}

/**
 * Convert markdown to HTML
 */
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

/**
 * Get site configuration
 */
export function getSiteConfig(): SiteConfig {
  const { data } = readMarkdownFile<SiteConfig>('site-config.md');
  return data;
}

/**
 * Get home page content
 */
export function getHomePageContent(): HomePageContent {
  const { data, content } = readMarkdownFile<Omit<HomePageContent, 'content'>>('pages/home.md');
  return { ...data, content };
}

/**
 * Get about page content
 */
export async function getAboutPageContent(): Promise<AboutPageContent> {
  const { data, content } = readMarkdownFile<Omit<AboutPageContent, 'content'>>('pages/about.md');
  const htmlContent = await markdownToHtml(content);
  return { ...data, content: htmlContent };
}

/**
 * Get contact page content
 */
export async function getContactPageContent(): Promise<ContactPageContent> {
  const { data, content } = readMarkdownFile<Omit<ContactPageContent, 'content'>>('pages/contact.md');
  const htmlContent = await markdownToHtml(content);
  return { ...data, content: htmlContent };
}
