import styles from './styles.module.css';

export default function ProjectsTab() {
  return (
    <div className={styles.container}>
      <section className={styles.section} id="event-details">
        <p id="topic" className={styles.topic}>
          TWD Voting System
        </p>
        <h2 className={styles.section_h2}>Active Since: February 14, 2024</h2>
        <br />
        <p>
          We&apos;re building a voting system as the first feature of the new
          Tulsa Web Devs Website! This is a greenfield opportunity to innovate
          and create solutions that will shape the future of decision-making
          within our organization.
        </p>
        <br />
        <p>
          We&apos;re embarking on a mission to design and implement a modern
          internal voting system that breaks away from traditional models. Our
          goal is to find the best voting system that fosters inclusivity,
          accuracy, and efficiency, ensuring that every voice is heard and
          represented.
        </p>
        <br />
        <h3 className={styles.section_h3}>
          Why First-Past-the-Post Won&apos;t Cut It
        </h3>
        <br />
        <p>
          We recognize that the traditional first-past-the-post approach is
          outdated and flawed. It often leads to misrepresentation, discourages
          voter turnout, and fails to provide fair representation for all
          stakeholders. We&apos;re here to challenge the status quo and explore
          alternative voting systems that address these shortcomings head-on.
        </p>
        <br />
        <h3 className={styles.section_h3}>Exploring the Possibilities:</h3>
        <br />
        <div className={styles.tip}>
          <span className={styles.tip_text}>
            Tip: Want to dive deeper into alternative voting methods? Check out{' '}
            <a
              className={styles.link}
              href="https://www.eac.gov/sites/default/files/electionofficials/Final_Alternative_Voting_Methods_in_the_United_States_508.pdf"
              target="_blank"
              rel="noreferrer"
            >
              this comprehensive guide!
            </a>
          </span>
        </div>
        <br />
        <br />
        <p>
          We have a vast landscape of voting systems to explore, from the
          tried-and-tested to the cutting-edge. Let&apos;s take a glimpse at
          some of the avenues we&apos;ll be delving into:
        </p>
        <br />
        <ul className={styles.list}>
          <li className={styles.list_item}>
            <span className={styles.emphasis}>Plurality Voting</span>: While it
            has its merits, such as ensuring majority/plurality representation,
            we&apos;ll need to navigate its pitfalls, including
            misrepresentation of parties and voter disenfranchisement.
          </li>
          <br />
          <li className={styles.list_item}>
            <span className={styles.emphasis}>Proportional Representation</span>
            : A promising path that offers accurate party representation and
            broader inclusivity. However, we&apos;ll need to tackle challenges
            like system complexity and potential trade-offs in decision-making.
          </li>
          <br />
          <li className={styles.list_item}>
            <span className={styles.emphasis}>SemiProportional Systems</span>:
            An intriguing middle ground between tradition and innovation,
            promising fairer representation and flexibility in voting. Yet, we
            must address issues like limited usage and inconsistency in results.
          </li>
        </ul>
        <br />
        <h3 className={styles.section_h3}>Your Mission:</h3>
        <br />
        <p>
          As part of this project, you&apos;ll have the opportunity to
          contribute your expertise and creativity to shape the future of
          internal voting. Together, we&apos;ll pioneer solutions that empower
          our organization and set a new standard for democratic
          decision-making.
        </p>
        <br />
        <p>
          Let&apos;s roll up our sleeves, embrace the challenge, and embark on
          this exciting journey to revolutionize internal voting systems!
        </p>
      </section>
    </div>
  );
}
