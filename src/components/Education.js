import styles from './Education.module.css';

function Education() {
  return (
    <section id="education" className={styles.education}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Education</h2>
        <div className={styles.educationCard}>
          <h3 className={styles.degree}>Computer Science</h3>
          <p className={styles.university}>Baylor University</p>
          <p className={styles.year}>2014 - 2016</p>
        </div>
      </div>
    </section>
  );
}

export default Education;
