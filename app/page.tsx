'use client'
import styles from "./page.module.css";
import { useTruncate } from "./utils/useTruncate";

export default function Home() {
  const { containerRef, truncatedText } = useTruncate("Скидки и акции от продавцов", 2);

  return (
    <>
      <p>Пример решения</p>
      <div className={styles.container}>
        <h1 ref={containerRef}>{truncatedText}</h1>
      </div>
      <br />

      <p>Пример проблемы</p>
      <div className={styles.container}>
        <h1 className={styles.text}>Скидки и акции от продавцов</h1>
      </div>
    </>
  );
}
