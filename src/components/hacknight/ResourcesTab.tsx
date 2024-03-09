import {
  container,
  section,
  topic,
  sectionH2,
  twoColumnOuter,
  list,
  sectionH3,
  sectionFooter,
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
        <h2 className={sectionH2.className} style={sectionH2.style}>
          Stuff we use
        </h2>
        <br />
        <div className={twoColumnOuter.className} style={twoColumnOuter.style}>
          <ul className={list.className} style={list.style}>
            <h3 className={sectionH3.className} style={sectionH3.style}>
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
            <h3 className={sectionH3.className} style={sectionH3.style}>
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
          className={sectionFooter.className}
          id="section_footer"
          style={sectionFooter.style}
        >
          Reach out to us on{' '}
          <a href="https://slack.techlahoma.org">Slack at #ug-tulsa-webdevs </a>
          if you have any questions!
        </p>
      </section>
    </div>
  );
}
