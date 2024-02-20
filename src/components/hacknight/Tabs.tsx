import { Tabs } from '../Tabs';
import AboutTab from './AboutTab';
import ProjectsTab from './ProjectsTab';
import ResourcesTab from './ResourcesTab';

export default function HackNightTabs() {
  return (
    <Tabs
      tabs={[
        {
          value: 'about',
          title: 'About',
          renderContent: () => <AboutTab />,
        },
        {
          value: 'projets',
          title: 'Projects',
          renderContent: () => <ProjectsTab />,
        },
        {
          value: 'resources',
          title: 'Resources',
          renderContent: () => <ResourcesTab />,
        },
      ]}
    />
  );
}
