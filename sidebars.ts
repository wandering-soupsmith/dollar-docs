import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'idea',
    'quickstart',
    {
      type: 'category',
      label: 'Concepts',
      collapsed: false,
      items: [
        'concepts/dlrs',
        'concepts/queue',
        'concepts/time-tradeoff',
        'concepts/resolution',
      ],
    },
    {
      type: 'category',
      label: 'Capabilities',
      collapsed: false,
      items: [
        'capabilities/overview',
        'capabilities/functions',
        'capabilities/events',
        'capabilities/errors',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      collapsed: false,
      items: [
        'resources/addresses',
        'resources/security',
        'resources/faq',
      ],
    },
  ],
};

export default sidebars;
