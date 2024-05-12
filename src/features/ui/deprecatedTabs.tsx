import type React from 'react';
import type { IUseTabsProps } from '@zendeskgarden/container-tabs';
import { useTabs } from '@zendeskgarden/container-tabs';
import { useMemo } from 'react';

type Tab<TValue extends string> = {
  value: TValue;
  title: string;
  renderContent: () => React.JSX.Element;
  disabled?: boolean;
};

export type TabsProps<TValue extends string> = {
  tabs: Tab<TValue | string>[];
} & Omit<IUseTabsProps<NoInfer<TValue | string>>, 'tabs'>;

export function Tabs<const TValue extends string>(props: TabsProps<TValue>) {
  const { selectedValue, getTabListProps, getTabPanelProps, getTabProps } =
    useTabs(props);

  const components = useMemo(() => {
    const tabComponents: React.JSX.Element[] = [];
    const tabPanelComponents: React.JSX.Element[] = [];

    props.tabs.forEach(({ renderContent, ...tab }) => {
      tabComponents.push(
        <li
          {...getTabProps(tab)}
          key={tab.value}
          className={
            tab.value === selectedValue ?
              `border-4 border-blue-600 border-solid flex h-fit w-full cursor-pointer items-center justify-center`
            : `border-4 border-transparent border-solid flex h-fit w-full cursor-pointer items-center justify-center`
          }
        >
          {tab.title}
        </li>,
      );

      tabPanelComponents.push(
        <div {...getTabPanelProps(tab)} key={tab.value}>
          {renderContent()}
        </div>,
      );
    });

    return { tabs: tabComponents, panels: tabPanelComponents };
  }, [getTabProps, getTabPanelProps, props.tabs, selectedValue]);

  const horizontal = 'flex flex-col';
  const vertical = 'flex flex-row';

  const [containerDirection, listDirection] =
    props.orientation === 'vertical' ?
      [vertical, horizontal]
    : [horizontal, vertical];

  return (
    <div className={containerDirection}>
      <ul {...getTabListProps()} className={listDirection}>
        {components.tabs}
      </ul>
      {components.panels}
    </div>
  );
}
