import { BlogPost } from '../types';

const STORAGE_KEY = 'samiullah_blog_posts';
const SETTINGS_KEY = 'samiullah_blog_settings';

export interface AdminSettings {
  username: string;
  password: string;
  googleSiteVerification?: string;
  adSenseId?: string;
}

const DEFAULT_SETTINGS: AdminSettings = {
  username: 'admin',
  password: 'password123',
  googleSiteVerification: '',
  adSenseId: ''
};

const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Mastering Playwright Fixtures',
    excerpt: 'Fixtures are the backbone of a scalable Playwright framework. Learn how to isolate your tests effectively.',
    content: `
# Mastering Playwright Fixtures

Playwright fixtures are a core concept that allows you to establish the environment for each test. They provide isolation, ensuring that tests don't affect each other.

## Why use fixtures?

1. **Isolation**: Each test gets a fresh environment.
2. **Reusability**: Define common setup logic once.
3. **Auto-initialization**: Fixtures can set themselves up automatically.

\`\`\`javascript
// example.spec.js
import { test as base } from '@playwright/test';

const test = base.extend({
  myFixture: async ({}, use) => {
    await use('hello');
  },
});

test('use fixture', async ({ myFixture }) => {
  console.log(myFixture);
});
\`\`\`

Fixtures dramatically reduce boilerplate in your \`beforeEach\` hooks.
    `,
    tags: ['Playwright', 'Testing', 'JavaScript'],
    date: '2023-10-15',
    readTime: 5,
    author: 'Samiullah',
    coverImage: 'https://picsum.photos/800/400?random=1'
  },
  {
    id: '2',
    title: 'Handling Flaky Tests in CI/CD',
    excerpt: 'Strategies to identify, debug, and eliminate flaky tests in your automation pipelines.',
    content: `
# Handling Flaky Tests

Flakiness is the enemy of trust in automation. When a test passes sometimes and fails others without code changes, it's flaky.

## Common Causes

- **Network latency**: Waiting for fixed times instead of events.
- **Race conditions**: UI elements animating or loading asynchronously.
- **Resource contention**: Database locks or shared test users.

## Solutions with Playwright

Playwright's auto-waiting mechanism handles many of these issues out of the box. However, always ensure you are waiting for the specific state you need, e.g., \`toBeVisible()\` or \`toBeEnabled()\`.
    `,
    tags: ['CI/CD', 'Quality Assurance', 'DevOps'],
    date: '2023-11-02',
    readTime: 8,
    author: 'Samiullah',
    coverImage: 'https://picsum.photos/800/400?random=2'
  },
  {
    id: '3',
    title: 'Advanced Selectors: Beyond CSS and XPath',
    excerpt: 'Leverage Playwright\'s powerful layout selectors and shadow DOM support.',
    content: `
# Advanced Selectors

Playwright supports standard CSS and XPath, but it shines with its custom engines.

## Text Selectors

\`\`\`javascript
await page.click('text=Log in');
\`\`\`

## React & Vue Selectors

If you have the React or Vue engine enabled, you can select by component props!

\`\`\`javascript
await page.click('_react=SubmitButton[loading=false]');
\`\`\`

This makes your tests resilient to DOM structure changes as long as the component logic remains consistent.
    `,
    tags: ['JavaScript', 'Selectors', 'Tips'],
    date: '2023-12-10',
    readTime: 4,
    author: 'Samiullah',
    coverImage: 'https://picsum.photos/800/400?random=3'
  }
];

// Blog Post Functions
export const getPosts = (): BlogPost[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
    return INITIAL_POSTS;
  }
  return JSON.parse(stored);
};

export const getPostById = (id: string): BlogPost | undefined => {
  const posts = getPosts();
  return posts.find((p) => p.id === id);
};

export const savePost = (post: BlogPost): void => {
  const posts = getPosts();
  const index = posts.findIndex((p) => p.id === post.id);
  
  if (index >= 0) {
    posts[index] = post;
  } else {
    posts.unshift(post);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const deletePost = (id: string): void => {
  const posts = getPosts().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

// Admin Settings Functions
export const getAdminSettings = (): AdminSettings => {
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (!stored) {
    return DEFAULT_SETTINGS;
  }
  const settings = JSON.parse(stored);
  // Merge with defaults to ensure new fields exist for old users
  return { ...DEFAULT_SETTINGS, ...settings };
};

export const saveAdminSettings = (settings: AdminSettings): void => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};