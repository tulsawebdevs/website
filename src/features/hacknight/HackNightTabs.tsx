import { Tabs } from '../../components/ui/deprecated_tabs.tsx';
import UpdatesTab from './UpdatesTab.tsx';
import ProjectsTab from './ProjectsTab.tsx';
import ResourcesTab from './ResourcesTab.tsx';

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
