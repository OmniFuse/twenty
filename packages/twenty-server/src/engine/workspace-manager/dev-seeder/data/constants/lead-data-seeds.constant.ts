import { CONTACT_DATA_SEED_IDS } from 'src/engine/workspace-manager/dev-seeder/data/constants/contact-data-seeds.constant';
import { WORKSPACE_MEMBER_DATA_SEED_IDS } from 'src/engine/workspace-manager/dev-seeder/data/constants/workspace-member-data-seeds.constant';

type LeadDataSeed = {
  id: string;
  name: string;
  additionalInfo: any;
  amountAmountMicros: number;
  amountCurrencyCode: string;
  location: string;
  contactId: string;
  createdBySource: string;
  createdByWorkspaceMemberId: string;
  createdByName: string;
  position: number;
};

export const LEAD_DATA_SEED_COLUMNS: (keyof LeadDataSeed)[] = [
  'id',
  'name',
  'additionalInfo',
  'amountAmountMicros',
  'amountCurrencyCode',
  'location',
  'contactId',
  'createdBySource',
  'createdByWorkspaceMemberId',
  'createdByName',
  'position',
];

// prettier-ignore
export const LEAD_DATA_SEED_IDS = {
  ID_1: '30303030-1001-49dd-b2b2-883999db0001',
  ID_2: '30303030-1002-49dd-b2b2-883999db0002',
  ID_3: '30303030-1003-49dd-b2b2-883999db0003',
} as const;

export const LEAD_DATA_SEEDS: LeadDataSeed[] = [
  {
    id: LEAD_DATA_SEED_IDS.ID_1,
    name: 'Мария',
    additionalInfo: {
      source: 'Telegram',
      phone: '+77777737777',
      description: 'Источник: Telegram\nМария хочет дерево для домашнего строительства в Вологде',
      product: 'Дерево',
      company: 'Вудлайф',
    },
    amountAmountMicros: 0,
    amountCurrencyCode: 'RUB',
    location: 'Вологда',
    contactId: CONTACT_DATA_SEED_IDS.ID_4,
    createdBySource: 'API',
    createdByWorkspaceMemberId: WORKSPACE_MEMBER_DATA_SEED_IDS.TIM,
    createdByName: 'tgkey',
    position: 1,
  },
  {
    id: LEAD_DATA_SEED_IDS.ID_2,
    name: 'Иван Петров',
    additionalInfo: {
      source: 'Website',
      interests: 'Строительные материалы, Металлоконструкции',
      company: 'Стройком ЛТД',
    },
    amountAmountMicros: 150000000000, // 150,000 RUB in micros
    amountCurrencyCode: 'RUB',
    location: 'Калининград',
    contactId: CONTACT_DATA_SEED_IDS.ID_1,
    createdBySource: 'API',
    createdByWorkspaceMemberId: WORKSPACE_MEMBER_DATA_SEED_IDS.JONY,
    createdByName: 'Website Form',
    position: 2,
  },
  {
    id: LEAD_DATA_SEED_IDS.ID_3,
    name: 'Александр Сидоров',
    additionalInfo: {
      source: 'Cold Call',
      interests: 'Газовое оборудование',
      notes: 'Заинтересован в поставке газового оборудования для частного дома',
    },
    amountAmountMicros: 75000000000, // 75,000 RUB in micros
    amountCurrencyCode: 'RUB',
    location: 'Санкт-Петербург',
    contactId: CONTACT_DATA_SEED_IDS.ID_3,
    createdBySource: 'API',
    createdByWorkspaceMemberId: WORKSPACE_MEMBER_DATA_SEED_IDS.TIM,
    createdByName: 'Sales Manager',
    position: 3,
  },
];
