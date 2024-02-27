import { Tabs } from '../Tabs';
import UpdatesTab from './UpdatesTab';
import ProjectsTab from './ProjectsTab';
import ResourcesTab from './ResourcesTab';

export default function HackNightTabs() {
  return (
    <Tabs
      tabs={[
        {
          value: 'udpates',
          title: 'Updates',
          renderContent: () => <UpdatesTab />,
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
