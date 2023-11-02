import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import fs from 'node:fs/promises'
import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import MarkdownItContainer from 'markdown-it-container'

import vite from './vite.config'

const projectRoot = fileURLToPath(new URL('../..', import.meta.url))
const version = JSON.parse(
  await
  fs.readFile(
    join(projectRoot, 'package.json'),
    'utf-8',
  ),
).version

const GUIDES: DefaultTheme.NavItemWithLink[] = [
  { text: 'Getting Started', link: '/guide/getting-started' },
]

const CONTRIBUTES: DefaultTheme.NavItemWithLink[] = [
  { text: 'Project Progress', link: '/contribute/project-progress' },
]

const VERSIONS: DefaultTheme.NavItemWithLink[] = [
  { text: `v${version} (current)`, link: '/' },
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '@arvinn/utils',
  description: 'Simple JS utils\nfor myself',
  rewrites: {
    // rewrite docs markdown because we set the `srcDir` to the root of the monorepo
    'docs/:name(.+).md': ':name.md',
  },

  ignoreDeadLinks: true,

  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    config(md) {
      MarkdownItContainer(md, 'correct', {
        render(tokens, idx) {
          if (tokens[idx].nesting === 1)
            return '<CustomWrapper type="correct">'
          else
            return '</CustomWrapper>\n'
        },
      })
      MarkdownItContainer(md, 'incorrect', {
        render(tokens, idx) {
          if (tokens[idx].nesting === 1)
            return '<CustomWrapper type="incorrect">'
          else
            return '</CustomWrapper>\n'
        },
      })
    },
  },

  srcDir: fileURLToPath(new URL('../..', import.meta.url)),
  cleanUrls: true,

  vite,

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', items: GUIDES },
      {
        text: `v${version}`,
        items: VERSIONS,
      },
    ],

    sidebar: Object.assign(
      {
        '/': [
          {
            text: 'Guide',
            items: GUIDES,
          },
          {
            text: 'Contribute',
            items: CONTRIBUTES,
          },
        ],
      },
    ),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pinky-pig/utils' },
    ],
  },

  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'ESLint Stylistic Team' }],
    ['meta', { property: 'og:title', content: 'ESLint Stylistic' }],
    ['meta', { property: 'og:image', content: 'https://eslint.style/og.png' }],
    ['meta', { property: 'og:description', content: 'Simple JS utils\nfor arvinn' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://eslint.style/og.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
  ],
})
