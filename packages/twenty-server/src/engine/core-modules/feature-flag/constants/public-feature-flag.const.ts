import { FeatureFlagKey } from 'src/engine/core-modules/feature-flag/enums/feature-flag-key.enum';

type FeatureFlagMetadata = {
  label: string;
  description: string;
  imagePath: string;
};

export type PublicFeatureFlag = {
  key: FeatureFlagKey;
  metadata: FeatureFlagMetadata;
};

export const PUBLIC_FEATURE_FLAGS: PublicFeatureFlag[] = [
  {
    key: FeatureFlagKey.IS_IMAP_SMTP_CALDAV_ENABLED,
    metadata: {
      label: 'IMAP, SMTP, CalDAV',
      description:
        'Easily add email accounts from any provider that supports IMAP, send emails with SMTP (and soon, sync calendars with CalDAV)',
      imagePath:
        'https://twenty.com/images/lab/is-imap-smtp-caldav-enabled.png',
    },
  },
  {
    key: FeatureFlagKey.IS_MESSAGE_FOLDER_CONTROL_ENABLED,
    metadata: {
      label: 'Message Folder Control',
      description: 'Control which folders are synced',
      imagePath:
        'https://twenty.com/images/lab/is-message-folder-control-enabled.png',
    },
  },
  {
    key: FeatureFlagKey.IS_PAGE_LAYOUT_ENABLED,
    metadata: {
      label: 'Page Layout & Widgets',
      description: 'Create customizable page layouts with various widgets including charts, tables, and embedded content for enhanced data visualization',
      imagePath: '',
    },
  },
  {
    key: FeatureFlagKey.IS_CALENDAR_VIEW_ENABLED,
    metadata: {
      label: 'Calendar View',
      description: 'Enable calendar view for records with date fields',
      imagePath: '',
    },
  },
  ...(process.env.CLOUDFLARE_API_KEY
    ? [
        // {
        // Here you can add cloud only feature flags
        // },
      ]
    : []),
];
