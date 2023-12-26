import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Record from '@site/src/components/Record';
import List from './help';

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
