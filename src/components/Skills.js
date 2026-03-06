import styles from './Skills.module.css';

function Skills() {
  const skillCategories = [
    {
      category: 'Languages',
      skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL', 'HTML/CSS'],
    },
    {
      category: 'Frontend',
      skills: ['React', 'Redux', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Material-UI'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'Django', 'Spring Boot', 'PostgreSQL', 'MongoDB'],
    },
    {
      category: 'Tools & Platform',
      skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Jest', 'Webpack'],
    },
  ];

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Technical Skills</h2>
        <div className={styles.skillsGrid}>
          {skillCategories.map((category, index) => (
            <div key={index} className={styles.skillCategory}>
              <h3 className={styles.categoryTitle}>{category.category}</h3>
              <div className={styles.skillTags}>
                {category.skills.map((skill, idx) => (
                  <span key={idx} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
