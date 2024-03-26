import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog', '312'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', 'a94'),
    exact: true
  },
  {
    path: '/blog/resource',
    component: ComponentCreator('/blog/resource', '661'),
    exact: true
  },
  {
    path: '/help',
    component: ComponentCreator('/help', '80d'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', 'eec'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '69e'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'c5a'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '442'),
            routes: [
              {
                path: '/docs/case/',
                component: ComponentCreator('/docs/case/', '681'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/case/guide',
                component: ComponentCreator('/docs/case/guide', '45d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/case/position-sticky',
                component: ComponentCreator('/docs/case/position-sticky', '6f3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/iframe-communication',
                component: ComponentCreator('/docs/iframe-communication', '0c9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/web-component',
                component: ComponentCreator('/docs/web-component', '215'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/wireless',
                component: ComponentCreator('/docs/wireless', 'af7'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '652'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
