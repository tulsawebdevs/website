import styles from './styles.module.css';

export default function ResourcesTab() {
  const slackLink =
    // TODO: Remove if expired (or update with new link for another Hack-Night)
    Date.now() < 1_709_082_305_579 + 1000 * 60 * 60 * 20 ?
      `https://join.slack.com/t/techlahoma/shared_invite/zt-2dtlc0zzl-84XlXrT6owu2ZCgQiCis6A`
    : `https://slack.techlahoma.org`;

  return (
    <div className={styles.container}>
      <section className={styles.section} id="resources">
        <p id="topic" className={styles.topic}>
          Resources
        </p>
        <h2 className={styles.section_h2}>Stuff we use</h2>
        <br />
        <div className={styles.two_column_grid}>
          <ul className={styles.list}>
            <h3 className={styles.section_h3}>Collaboration Tools</h3>
            <li className={styles.list_item}>
              <a href="https://github.com/tulsawebdevs/website">TWD Github</a>
            </li>
            <li className={styles.list_item}>
              <a href="https://github.com/tulsawebdevs/website/projects?query=is%3Aopen">
                TWD Active Projects
              </a>
            </li>
            <li className={styles.list_item}>
              <a href="https://www.meetup.com/tulsa-web-devs/">
                Upcoming Events
              </a>
            </li>
            <li className={styles.list_item}>
              <a href="https://g.co/kgs/V1Dxko2">Directions to 36º North</a>
            </li>
          </ul>

          <ul className={styles.list}>
            <h3 className={styles.section_h3}>Learning Resources</h3>
            <li className={styles.list_item}>
              <a href="https://www.freecodecamp.org/">FreeCodeCamp</a>
            </li>
            <li className={styles.list_item}>
              <a href="https://www.codecademy.com/">Codecademy</a>
            </li>
            <li className={styles.list_item}>
              <a href="https://www.udemy.com/">Udemy</a>
            </li>
            <li className={styles.list_item}>
              <a href="https://www.khanacademy.org/">Khan Academy</a>
            </li>
          </ul>
        </div>
        <p className={styles.section_footer}>
          Reach out to us on <a href={slackLink}>Slack at #ug-tulsa-webdevs </a>
          if you have any questions!
        </p>
      </section>
    </div>
  );
}
