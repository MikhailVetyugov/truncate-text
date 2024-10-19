'use client'
import styles from "./page.module.css";
import { useTruncate } from "./utils/useTruncate";

export default function Home() {
  const LINES_COUNT = 2;
  const { containerRef, truncatedText } = useTruncate("Скидки и акции от продавцов", 2);

  return (
    <>
      <p>Пример решения</p>
      <div className={styles.container}>
        <h1 ref={containerRef} style={{
          // Фоллбэк для SSR.
          display: '-webkit-box',
          WebkitLineClamp: LINES_COUNT,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          wordWrap: 'break-word',
          }}>{truncatedText}</h1>
      </div>
      <br />

      <p>Пример проблемы</p>
      <div className={styles.container}>
        <h1 className={styles.text}>Скидки и акции от продавцов</h1>
      </div>
    </>
  );
}
