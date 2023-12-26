import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Record(props) {
  const { title, tags, content, href } = props;
  return (
    <div className={styles.recordItem}>
      <div className={styles.itemTitle}>{title}</div>
      <div className={styles.itemAuth}>
        <img src="img/Bob.jpg" />
        <div className={styles.nameBox}>
          <div className={styles.name}>乐游</div>
          <div className={styles.desc}>A Front-End Web Developer</div>
        </div>
      </div>
      <div className={styles.tagBox}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
      <div className={styles.content}>{content}</div>
      <Link className={styles.moreBtn} to={href}>
        阅读更多
      </Link>
    </div>
  );
}
