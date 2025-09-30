import { WORKSPACE_MEMBER_DATA_SEED_IDS } from 'src/engine/workspace-manager/dev-seeder/data/constants/workspace-member-data-seeds.constant';

type ContactDataSeed = {
  id: string;
  name: string;
  source: string;
  additionalInfo: any;
  processed: boolean;
  phonesPrimaryPhoneNumber: string;
  phonesPrimaryPhoneCountryCode: string;
  phonesPrimaryPhoneCallingCode: string;
  createdBySource: string;
  createdByWorkspaceMemberId: string;
  createdByName: string;
  position: number;
};

export const CONTACT_DATA_SEED_COLUMNS: (keyof ContactDataSeed)[] = [
  'id',
  'name',
  'source',
  'additionalInfo',
  'processed',
  'phonesPrimaryPhoneNumber',
  'phonesPrimaryPhoneCountryCode',
  'phonesPrimaryPhoneCallingCode',
  'createdBySource',
  'createdByWorkspaceMemberId',
  'createdByName',
  'position',
];

// prettier-ignore
export const CONTACT_DATA_SEED_IDS = {
  ID_1: '30303030-c001-48e5-a542-72570eee0001',
  ID_2: '30303030-c002-48e5-a542-72570eee0002',
  ID_3: '30303030-c003-48e5-a542-72570eee0003',
  ID_4: '30303030-c004-48e5-a542-72570eee0004',
  ID_5: '30303030-c005-48e5-a542-72570eee0005',
} as const;

export const CONTACT_DATA_SEEDS: ContactDataSeed[] = [
  {
    id: CONTACT_DATA_SEED_IDS.ID_1,
    name: '+79620123388',
    source: 'https://kaliningrad.kamprok.ru/ 25.09,B2_79311057447',
    additionalInfo: {
      ip: '127.0.0.1',
      tag: 'https://kaliningrad.kamprok.ru/ 25.09',
      vid: '1464809389',
      page: 'B2_79311057447',
      site: 'ГЦК 79311057447',
      time: '1758862871',
      phones: ['79620123388'],
      project: 'B2_79311057447',
      time_unix: 1758862871,
    },
    processed: false,
    phonesPrimaryPhoneNumber: '79620123388',
    phonesPrimaryPhoneCountryCode: 'RU',
    phonesPrimaryPhoneCallingCode: '+7',
    createdBySource: 'API',
    createdByWorkspaceMemberId: WORKSPACE_MEMBER_DATA_SEED_IDS.TIM,
    createdByName: 'Номера',
    position: 1,
  },
  {
    id: CONTACT_DATA_SEED_IDS.ID_2,
    name: '+79185590198',
    source: 'https://www.ccnova.ru/ 25.09,B2_78633090803',
    additionalInfo: {
      ip: '127.0.0.1',
      tag: 'https://www.ccnova.ru/ 25.09',
      vid: '1465283412',
      page: 'B2_78633090803',
      site: 'ГЦК 78633090803',
      time: '1758884320',
      phones: ['79185590198'],
      project: 'B2_78633090803',
      time_unix: 1758884320,
    },
    processed: false,
    phonesPrimaryPhoneNumber: '79185590198',
    phonesPrimaryPhoneCountryCode: 'RU',
    phonesPrimaryPhoneCallingCode: '+7',
    createdBySource: 'API',
    createdByWorkspaceMemberId: WORKSPACE_MEMBER_DATA_SEED_IDS.TIM,
    createdByName: 'Номера',
    position: 2,
  },
  {
    id: CONTACT_DATA_SEED_IDS.ID_3,
    name: '+79097995929',
    source: 'https://gefest39.ru/ 24.09,B2_79114704624',
    additionalInfo: {
      ip: '127.0.0.1',
      tag: 'https://gefest39.ru/ 24.09',
      vid: '1467940324',
      page: 'B2_79114704624',
      site: 'ГЦК 79114704624',
      time: '1759204203',
      phones: ['79097995929'],
      project: 'B2_79114704624',
      time_unix: 1759204203,
    },
    processed: false,
    phonesPrimaryPhoneNumber: '79097995929',
    phonesPrimaryPhoneCountryCode: 'RU',
    phonesPrimaryPhoneCallingCode: '+7',
    createdBySource: 'API',
    createdByWorkspaceMemberId: WORKSPACE_MEMBER_DATA_SEED_IDS.TIM,
    createdByName: 'Номера',
    position: 3,
  },
  {
    id: CONTACT_DATA_SEED_IDS.ID_4,
    name: '+77777737777',
    source: 'Telegram',
    additionalInfo: {
      phone: '+77777737777',
      description: 'Источник: Telegram',
      product: 'Дерево',
      location: 'Вологда',
      company: 'Вудлайф',
    },
    processed: true,
    phonesPrimaryPhoneNumber: '77777737777',
    phonesPrimaryPhoneCountryCode: 'KZ',
    phonesPrimaryPhoneCallingCode: '+7',
    createdBySource: 'API',
    createdByWorkspaceMemberId: WORKSPACE_MEMBER_DATA_SEED_IDS.TIM,
    createdByName: 'tgkey',
    position: 4,
  },
  {
    id: CONTACT_DATA_SEED_IDS.ID_5,
    name: '+71234567890',
    source: 'Website Form',
    additionalInfo: {
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      referrer: 'https://google.com',
    },
    processed: false,
    phonesPrimaryPhoneNumber: '71234567890',
    phonesPrimaryPhoneCountryCode: 'RU',
    phonesPrimaryPhoneCallingCode: '+7',
    createdBySource: 'API',
    createdByWorkspaceMemberId: WORKSPACE_MEMBER_DATA_SEED_IDS.JONY,
    createdByName: 'Web Form',
    position: 5,
  },
];
