import { msg } from '@lingui/core/macro';
import { FieldMetadataType } from 'twenty-shared/types';

import { RelationOnDeleteAction } from 'src/engine/metadata-modules/field-metadata/interfaces/relation-on-delete-action.interface';
import { RelationType } from 'src/engine/metadata-modules/field-metadata/interfaces/relation-type.interface';
import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { SEARCH_VECTOR_FIELD } from 'src/engine/metadata-modules/constants/search-vector-field.constants';
import { ActorMetadata } from 'src/engine/metadata-modules/field-metadata/composite-types/actor.composite-type';
import { IndexType } from 'src/engine/metadata-modules/index-metadata/types/indexType.types';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceFieldIndex } from 'src/engine/twenty-orm/decorators/workspace-field-index.decorator';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceIsFieldUIReadOnly } from 'src/engine/twenty-orm/decorators/workspace-is-field-ui-readonly.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceIsSearchable } from 'src/engine/twenty-orm/decorators/workspace-is-searchable.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceJoinColumn } from 'src/engine/twenty-orm/decorators/workspace-join-column.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { CALL_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_ICONS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-icons';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import {
    type FieldTypeAndNameMetadata,
    getTsVectorColumnExpressionFromFields,
} from 'src/engine/workspace-manager/workspace-sync-metadata/utils/get-ts-vector-column-expression.util';
import { ContactWorkspaceEntity } from 'src/modules/contact/standard-objects/contact.workspace-entity';
import { LeadWorkspaceEntity } from 'src/modules/lead/standard-objects/lead.workspace-entity';

const NOTES_FIELD_NAME = 'notes';
const OUTCOME_FIELD_NAME = 'outcome';

export const SEARCH_FIELDS_FOR_CALL: FieldTypeAndNameMetadata[] = [
  { name: NOTES_FIELD_NAME, type: FieldMetadataType.TEXT },
  { name: OUTCOME_FIELD_NAME, type: FieldMetadataType.TEXT },
];

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.call,
  namePlural: 'calls',
  labelSingular: msg`Звонок`,
  labelPlural: msg`Звонки`,
  description: msg`Запись телефонного звонка`,
  icon: STANDARD_OBJECT_ICONS.message,
  shortcut: 'K',
  labelIdentifierStandardId: CALL_STANDARD_FIELD_IDS.outcome,
})
@WorkspaceIsSearchable()
export class CallWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: CALL_STANDARD_FIELD_IDS.duration,
    type: FieldMetadataType.NUMBER,
    label: msg`Продолжительность`,
    description: msg`Продолжительность звонка в секундах`,
    icon: 'IconClock',
  })
  @WorkspaceIsNullable()
  duration: number;

  @WorkspaceField({
    standardId: CALL_STANDARD_FIELD_IDS.startedAt,
    type: FieldMetadataType.DATE_TIME,
    label: msg`Начало`,
    description: msg`Когда начался звонок`,
    icon: 'IconCalendar',
  })
  @WorkspaceIsNullable()
  startedAt: Date;

  @WorkspaceField({
    standardId: CALL_STANDARD_FIELD_IDS.endedAt,
    type: FieldMetadataType.DATE_TIME,
    label: msg`Окончание`,
    description: msg`Когда закончился звонок`,
    icon: 'IconCalendar',
  })
  @WorkspaceIsNullable()
  endedAt: Date;

  @WorkspaceField({
    standardId: CALL_STANDARD_FIELD_IDS.notes,
    type: FieldMetadataType.TEXT,
    label: msg`Заметки`,
    description: msg`Заметки и комментарии к звонку`,
    icon: 'IconNotes',
  })
  @WorkspaceIsNullable()
  notes: string;

  @WorkspaceField({
    standardId: CALL_STANDARD_FIELD_IDS.outcome,
    type: FieldMetadataType.TEXT,
    label: msg`Результат`,
    description: msg`Исход или результат звонка`,
    icon: 'IconTarget',
  })
  @WorkspaceIsNullable()
  outcome: string;

  @WorkspaceField({
    standardId: CALL_STANDARD_FIELD_IDS.recordingUrl,
    type: FieldMetadataType.TEXT,
    label: msg`Запись`,
    description: msg`Ссылка на запись звонка`,
    icon: 'IconMicrophone',
  })
  @WorkspaceIsNullable()
  recordingUrl: string;

  @WorkspaceField({
    standardId: CALL_STANDARD_FIELD_IDS.position,
    type: FieldMetadataType.POSITION,
    label: msg`Позиция`,
    description: msg`Позиция записи звонка`,
    icon: 'IconHierarchy2',
    defaultValue: 0,
  })
  @WorkspaceIsSystem()
  position: number;

  @WorkspaceField({
    standardId: CALL_STANDARD_FIELD_IDS.createdBy,
    type: FieldMetadataType.ACTOR,
    label: msg`Создано`,
    icon: 'IconCreativeCommonsSa',
    description: msg`Создатель записи`,
  })
  @WorkspaceIsFieldUIReadOnly()
  createdBy: ActorMetadata;

  // Relations
  @WorkspaceRelation({
    standardId: CALL_STANDARD_FIELD_IDS.contact,
    type: RelationType.MANY_TO_ONE,
    label: msg`Контакт`,
    description: msg`Контакт, связанный с этим звонком`,
    icon: 'IconUser',
    inverseSideTarget: () => ContactWorkspaceEntity,
    inverseSideFieldKey: 'calls',
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  contact: Relation<ContactWorkspaceEntity> | null;

  @WorkspaceJoinColumn('contact')
  contactId: string | null;

  @WorkspaceRelation({
    standardId: CALL_STANDARD_FIELD_IDS.lead,
    type: RelationType.MANY_TO_ONE,
    label: msg`Лид`,
    description: msg`Лид, связанный с этим звонком`,
    icon: 'IconTargetArrow',
    inverseSideTarget: () => LeadWorkspaceEntity,
    inverseSideFieldKey: 'calls',
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  lead: Relation<LeadWorkspaceEntity> | null;

  @WorkspaceJoinColumn('lead')
  leadId: string | null;

  @WorkspaceField({
    standardId: CALL_STANDARD_FIELD_IDS.searchVector,
    type: FieldMetadataType.TS_VECTOR,
    label: SEARCH_VECTOR_FIELD.label,
    description: SEARCH_VECTOR_FIELD.description,
    icon: 'IconUser',
    generatedType: 'STORED',
    asExpression: getTsVectorColumnExpressionFromFields(
      SEARCH_FIELDS_FOR_CALL,
    ),
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  @WorkspaceFieldIndex({ indexType: IndexType.GIN })
  searchVector: string;
}
