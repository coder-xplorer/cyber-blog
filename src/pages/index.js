import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Record from '@site/src/components/Record';

const List = [
  {
    title: 'Iframe 通信',
    tags: ['前端'],
    content:
      '在工作中，我们会遇到一些需求，使用 iframe 嵌套另一个页面，这个页面大部分情况下不会部署在父页面相同的域名下，但是又需要父子页面进行数据交互，那么我们该怎么处理呢？',
    href: '/docs/iframe-communication',
  },
  {
    title: '无线端开发（H5）注意事项',
    tags: ['前端', 'React'],
    content: '无线端开发注意事项，点击阅读更多。',
    href: '/docs/wireless',
  },
  {
    title: 'Web Component',
    tags: ['WebComponent', 'React'],
    content: 'WebComponent（原生组件）的一些用法梳理。',
    href: '/docs/web-component',
  },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main style={{ margin: '0 auto' }}>
        {List.map((record) => (
          <Record
            key={record.title}
            title={record.title}
            tags={record.tags}
            content={record.content}
            href={record.href}
          />
        ))}
      </main>
    </Layout>
  );
}
