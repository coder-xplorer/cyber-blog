import styles from './index.module.css';

export default () => {
  return (
    <div className={styles.stickyContainer}>
      <div className={styles.header}>Header</div>
      <main>
        <div className={styles.tabs}>
          <div className={styles.btn}>Tab1</div>
          <div className={styles.btn}>Tab2</div>
        </div>
        <div style={{ padding: '12px' }}>
          {[1, 2, 3, 4, 5, 6].map((item) => {
            return <div className={styles.cardBox}>请向下滑动</div>;
          })}
        </div>
      </main>
    </div>
  );
};
