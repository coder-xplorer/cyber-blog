import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Record from '@site/src/components/Record';
import List from './help';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  console.log(siteConfig, 'siteConfig');
  return (
    <Layout title="乐游的Blog" description={siteConfig.title}>
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
