import {
  container,
  section,
  topic,
  section_h2,
  two_column_outer,
  list,
  section_h3,
  section_footer,
} from './styles.css.ts';

export default function ResourcesTab() {
  return (
    <div className={container.className} style={container.style}>
      <section
        className={section.className}
        style={section.style}
        id="resources"
      >
        <p id="topic" className={topic.className} style={topic.style}>
          Resources
        </p>
        <h2 className={section_h2.className} style={section_h2.style}>
          Stuff we use
        </h2>
        <br />
        <div
          className={two_column_outer.className}
          style={two_column_outer.style}
        >
          <ul className={list.className} style={list.style}>
            <h3 className={section_h3.className} style={section_h3.style}>
              Collaboration Tools
            </h3>
            <li>
              ➜ <a href="https://github.com/tulsawebdevs/website">TWD Github</a>
            </li>
            <li>
              ➜{' '}
              <a href="https://github.com/tulsawebdevs/website/projects?query=is%3Aopen">
                TWD Active Projects ➜{' '}
              </a>
            </li>
            <li>
              ➜{' '}
              <a href="https://www.meetup.com/tulsa-web-devs/">
                Upcoming Events
              </a>
            </li>
            <li>
              ➜ <a href="https://g.co/kgs/V1Dxko2">Directions to 36º North</a>
            </li>
          </ul>

          <ul className={list.className} style={list.style}>
            <h3 className={section_h3.className} style={section_h3.style}>
              Learning Resources
            </h3>
            <li>
              ➜ <a href="https://www.freecodecamp.org/">FreeCodeCamp</a>
            </li>
            <li>
              ➜ <a href="https://www.codecademy.com/">Codecademy</a>
            </li>
            <li>
              ➜ <a href="https://www.udemy.com/">Udemy</a>
            </li>
            <li>
              ➜ <a href="https://www.khanacademy.org/">Khan Academy</a>
            </li>
          </ul>
        </div>
        <p
          className={section_footer.className}
          id="section_footer"
          style={section_footer.style}
        >
          Reach out to us on{' '}
          <a href="https://slack.techlahoma.org">Slack at #ug-tulsa-webdevs </a>
          if you have any questions!
        </p>
      </section>
    </div>
  );
}
