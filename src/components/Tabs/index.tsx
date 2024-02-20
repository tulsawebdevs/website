import type { IUseTabsProps } from '@zendeskgarden/container-tabs';
import { useTabs } from '@zendeskgarden/container-tabs';
import { useMemo } from 'react';

type Tab<TValue extends string> = {
  value: TValue;
  title: string;
  title: string;
  renderContent: () => JSX.Element;
  disabled?: boolean;
};

export type TabsProps<TValue extends string> = {
  tabs: Tab<TValue | string>[];
} & Omit<IUseTabsProps<NoInfer<TValue>>, 'tabs'>;

export function Tabs<const TValue extends string>(props: TabsProps<TValue>) {
  const { selectedValue, getTabListProps, getTabPanelProps, getTabProps } =
    useTabs(props);

  const components = useMemo(() => {
    const tabComponents = [];
    const tabPanelComponents = [];

    props.tabs.forEach(({ renderContent, ...tab }) => {
      tabComponents.push(
        <li
          {...getTabProps(tab)}
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
        <div {...getTabPanelProps(tab)}>{renderContent()}</div>,
      );
    });

    return { tabs: tabComponents, panels: tabPanelComponents };
  }, [getTabProps, getTabPanelProps, props.tabs, selectedValue]);

  const horizontal = 'flex flex-col';
  const vertical = 'flex flex-row';

  const [containerDir, listDir] =
    props.orientation === 'vertical' ?
      [vertical, horizontal]
    : [horizontal, vertical];

  return (
    <div className={containerDir}>
      <ul {...getTabListProps()} className={listDir}>
        {components.tabs}
      </ul>
      {components.panels}
    </div>
  );
}
