import Link from '@docusaurus/Link';
import styles from './index.module.css';

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
      <div className={styles.wrapperTags}>
        <svg
          style={{ height: '1em', marginRight: '0.5rem' }}
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="tags"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          color="#c4d3e0"
        >
          <path
            fill="currentColor"
            d="M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a48 48 0 0 0 14.059 33.941l211.882 211.882c18.744 18.745 49.136 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM112 160c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm513.941 133.823L421.823 497.941c-18.745 18.745-49.137 18.745-67.882 0l-.36-.36L527.64 323.522c16.999-16.999 26.36-39.6 26.36-63.64s-9.362-46.641-26.36-63.64L331.397 0h48.721a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882z"
          ></path>
        </svg>
        {tags?.length ? (
          <div className={styles.tagBox}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className={styles.content}>{content}</div>
      <Link className={styles.moreBtn} to={href}>
        阅读更多
      </Link>
    </div>
  );
}
