import { useTabs } from '@zendeskgarden/container-tabs';
import React, { useEffect, useMemo } from 'react';

export type UseTabsParams = Parameters<
  typeof useTabs<{
    title: string;
    render: () => JSX.Element;
  }>
>[0];

export type TabsProps = Omit<UseTabsParams, 'focusedValue'> & {
  focusedIndex?: number;
};

export default function Tabs(propsIn: TabsProps) {
  const [focusedIndex, setFocusedIndex] = React.useState(
    propsIn.focusedIndex || 0,
  );

  const { selectedValue, getTabListProps, getTabPanelProps, getTabProps } =
    useTabs({
      orientation: propsIn.orientation || 'horizontal',
      tabs: propsIn.tabs,
      focusedValue: propsIn.tabs[focusedIndex]?.value,
      onFocus(focusedValue) {
        setFocusedIndex(
          propsIn.tabs.findIndex((tab) => tab.value === focusedValue),
        );
      },
    });

  useEffect(() => {
    console.log('focusedIndex', propsIn.focusedIndex);
  }, [propsIn.focusedIndex]);

  const components = useMemo(() => {
    const tabComponents = [];
    const tabPanelComponents = [];

    propsIn.tabs.forEach(({ value }) => {
      tabComponents.push(
        <li
          className={`3px solid ${value === selectedValue ? '#1f73b7' : 'transparent'} flex h-4 w-full cursor-pointer items-center justify-center`}
          {...getTabProps({
            value: value as any,
            key: value?.title,
          })}
        >
          {value?.title}
        </li>,
      );

      tabPanelComponents.push(
        <div
          {...getTabPanelProps({
            value: value as any,
            key: value?.title,
          })}
          className="padding-top-10px padding-bottom-10px border-s-red-400"
        >
          {value?.render()}
        </div>,
      );
    });

    return { tabs: tabComponents, panels: tabPanelComponents };
  }, [getTabProps, getTabPanelProps, propsIn.tabs, selectedValue]);

  return (
    <>
      <ul {...getTabListProps()} className="flex">
        {components.tabs}
      </ul>
      {components.panels}
    </>
  );
}
