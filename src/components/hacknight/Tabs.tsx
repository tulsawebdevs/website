import Tabs from '../Tabs';
import AboutTab from './AboutTab';
import ProjectsTab from './ProjectsTab';
import ResourcesTab from './ResourcesTab';

export default function HackNightTabs() {
  return (
    <Tabs
      tabs={[
        {
          value: {
            title: 'About',
            render: () => <AboutTab />,
          },
        },
        {
          value: {
            title: 'Projects',
            render: () => <ProjectsTab />,
          },
        },
        {
          value: {
            title: 'Resources',
            render: () => <ResourcesTab />,
          },
        },
      ]}
    />
  );
}
