import styles from './styles.module.css';

export default function UpdatesTab() {
  return (
    <div className={styles.container}>
      <section className={styles.section} id="event-details">
        <p id="topic" className={styles.topic}>
          Let&apos;s Greenfield Democracy!
        </p>
        <h2 className={styles.section_h2}>February 27, 2024 - 6pm-9pm CST</h2>
        <br />
        <p>
          This month, as part of a new pilot format for Hack Night, we&apos;re
          exploring alternative voting systems and empowering YOU, our
          membership, to have an ongoing say in programming for the group!
        </p>
        <br />
        <p>
          We&apos;d like your help designing, architecting, and implementing
          (time allowing) a mechanism to make it easy for members to suggest
          topics, propose projects, and cast their votes for the direction of
          Tulsa Web Devs!
        </p>
        <br />
        <p>
          We&apos;ll break out into teams, discuss the problem, and work
          together towards building a solution. A successful solution is one
          that features a simple, user-friendly UI, ensures fairness in voting,
          and fosters engagement among members.
        </p>
        <br />
        Want to get a head start? Check out the &quot;Projects&quot; tab for a
        project brief!
        <br />
        <p className={styles.section_footer}>
          <a href="https://www.meetup.com/tulsa-web-devs/events/298383788/">
            Please RSVP on Meetup so we can get an accurate head-count. We look
            forward to seeing you there!
          </a>
        </p>
      </section>
    </div>
  );
}
