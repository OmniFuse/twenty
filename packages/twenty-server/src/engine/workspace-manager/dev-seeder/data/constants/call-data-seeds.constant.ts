import { CONTACT_DATA_SEED_IDS } from 'src/engine/workspace-manager/dev-seeder/data/constants/contact-data-seeds.constant';
import { WORKSPACE_MEMBER_DATA_SEED_IDS } from 'src/engine/workspace-manager/dev-seeder/data/constants/workspace-member-data-seeds.constant';

type CallDataSeed = {
  id: string;
  status: string;
  notes: string;
  duration: number;
  scheduledAt: string;
  completedAt: string;
  contactId: string;
  createdBySource: string;
  createdByWorkspaceMemberId: string;
  createdByName: string;
  position: number;
};

export const CALL_DATA_SEED_COLUMNS: (keyof CallDataSeed)[] = [
  'id',
  'status',
  'notes',
  'duration',
  'scheduledAt',
  'completedAt',
  'contactId',
  'createdBySource',
  'createdByWorkspaceMemberId',
  'createdByName',
  'position',
];

// prettier-ignore
export const CALL_DATA_SEED_IDS = {
  ID_1: '30303030-c401-4c62-8dc5-571c71d80001',
  ID_2: '30303030-c402-4c62-8dc5-571c71d80002',
  ID_3: '30303030-c403-4c62-8dc5-571c71d80003',
  ID_4: '30303030-c404-4c62-8dc5-571c71d80004',
  ID_5: '30303030-c405-4c62-8dc5-571c71d80005',
} as const;

export const CALL_DATA_SEEDS: CallDataSeed[] = [
  {
    id: CALL_DATA_SEED_IDS.ID_1,
    status: 'COMPLETED',
    notes: 'Успешный контакт. Клиент заинтересован в сотрудничестве. Договорились о встрече.',
    duration: 12,
    scheduledAt: '2025-09-26T14:00:00.000Z',
    completedAt: '2025-09-26T14:12:00.000Z',
    contactId: CONTACT_DATA_SEED_IDS.ID_4,
    createdBySource: 'API',
    createdByWorkspaceMemberId: WORKSPACE_MEMBER_DATA_SEED_IDS.TIM,
    createdByName: 'Sales Manager',
    position: 1,
  },
  {
    id: CALL_DATA_SEED_IDS.ID_2,
    status: 'MISSED',
    notes: 'Клиент не ответил на звонок. Попробовать позвонить позже.',
    duration: 0,
    scheduledAt: '2025-09-27T10:00:00.000Z',
    completedAt: null,
    contactId: CONTACT_DATA_SEED_IDS.ID_1,
    createdBySource: 'API',
    createdByWorkspaceMemberId: WORKSPACE_MEMBER_DATA_SEED_IDS.JONY,
    createdByName: 'Sales Rep',
    position: 2,
  },
  {
    id: CALL_DATA_SEED_IDS.ID_3,
    status: 'COMPLETED',
    notes: 'Клиент сказал, что сейчас не готов к покупке. Запланировать повторный звонок через месяц.',
    duration: 8,
    scheduledAt: '2025-09-28T16:30:00.000Z',
    completedAt: '2025-09-28T16:38:00.000Z',
    contactId: CONTACT_DATA_SEED_IDS.ID_2,
    createdBySource: 'API',
    createdByWorkspaceMemberId: WORKSPACE_MEMBER_DATA_SEED_IDS.TIM,
    createdByName: 'Sales Manager',
    position: 3,
  },
  {
    id: CALL_DATA_SEED_IDS.ID_4,
    status: 'SCHEDULED',
    notes: 'Первый звонок новому клиенту. Представить компанию и услуги.',
    duration: null,
    scheduledAt: '2025-10-01T09:00:00.000Z',
    completedAt: null,
    contactId: CONTACT_DATA_SEED_IDS.ID_3,
    createdBySource: 'API',
    createdByWorkspaceMemberId: WORKSPACE_MEMBER_DATA_SEED_IDS.JONY,
    createdByName: 'Sales Rep',
    position: 4,
  },
  {
    id: CALL_DATA_SEED_IDS.ID_5,
    status: 'SCHEDULED',
    notes: 'Повторный звонок клиенту для уточнения деталей заказа.',
    duration: null,
    scheduledAt: '2025-10-02T14:15:00.000Z',
    completedAt: null,
    contactId: CONTACT_DATA_SEED_IDS.ID_5,
    createdBySource: 'API',
    createdByWorkspaceMemberId: WORKSPACE_MEMBER_DATA_SEED_IDS.TIM,
    createdByName: 'Account Manager',
    position: 5,
  },
];
