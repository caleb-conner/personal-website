import styles from './Experience.module.css';

function Experience() {
  const experiences = [
    {
      company: 'ShipStation',
      title: 'Senior Software Engineer',
      date: 'Present',
      achievements: [
        'Develop and maintain scalable software solutions for shipping and logistics',
        'Collaborate with cross-functional teams to deliver high-quality features',
        'Participate in code reviews and contribute to technical architecture decisions',
      ],
    },
  ];

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Work Experience</h2>
        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div key={index} className={styles.experienceCard}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.jobTitle}>{exp.title}</h3>
                  <p className={styles.company}>{exp.company}</p>
                </div>
                <span className={styles.date}>{exp.date}</span>
              </div>
              <ul className={styles.achievements}>
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
