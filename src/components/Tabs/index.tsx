import { useTabs } from '@zendeskgarden/container-tabs';
import { useMemo } from 'react';

export type TabsProps = Parameters<
  typeof useTabs<{
    title: string;
    render: () => JSX.Element;
  }>
>[0];

export default function Tabs(props: TabsProps) {
  const { selectedValue, getTabListProps, getTabPanelProps, getTabProps } =
    useTabs(props);

  const components = useMemo(() => {
    const tabComponents = [];
    const tabPanelComponents = [];

    props.tabs.forEach(({ value }: { value: any }) => {
      tabComponents.push(
        <li
          {...getTabProps({ value })}
          className={
            value === selectedValue ?
              `border-4 border-blue-600 border-solid flex h-4 w-full cursor-pointer items-center justify-center`
            : `border-4 border-transparent border-solid flex h-4 w-full cursor-pointer items-center justify-center`
          }
        >
          {value?.title}
        </li>,
      );

      tabPanelComponents.push(
        <div
          {...getTabPanelProps({ value })}
          className="padding-top-10px padding-bottom-10px border-s-red-400"
        >
          {value?.render()}
        </div>,
      );
    });

    return { tabs: tabComponents, panels: tabPanelComponents };
  }, [getTabProps, getTabPanelProps, props.tabs, selectedValue]);

  return (
    <>
      <ul {...getTabListProps()} className="flex">
        {components.tabs}
      </ul>
      {components.panels}
    </>
  );
}
