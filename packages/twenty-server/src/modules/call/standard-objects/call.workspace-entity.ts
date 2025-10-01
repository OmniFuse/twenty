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

const NOTES_FIELD_NAME = 'notes';

export const SEARCH_FIELDS_FOR_CALL: FieldTypeAndNameMetadata[] = [
  { name: NOTES_FIELD_NAME, type: FieldMetadataType.TEXT },
];

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.call,
  namePlural: 'calls',
  labelSingular: msg`Call`,
  labelPlural: msg`Calls`,
  description: msg`A call made to a contact`,
  icon: STANDARD_OBJECT_ICONS.task, // Using task icon as placeholder
  shortcut: 'K',
  labelIdentifierStandardId: CALL_STANDARD_FIELD_IDS.notes,
})
@WorkspaceIsSearchable()
export class CallWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: CALL_STANDARD_FIELD_IDS.status,
    type: FieldMetadataType.SELECT,
    label: msg`Status`,
    description: msg`Call status`,
    icon: 'IconCheckbox',
    options: [
      { value: 'SCHEDULED', label: 'Scheduled', color: 'blue' },
      { value: 'COMPLETED', label: 'Completed', color: 'green' },
      { value: 'MISSED', label: 'Missed', color: 'red' },
      { value: 'CANCELLED', label: 'Cancelled', color: 'gray' },
    ],
    defaultValue: "'SCHEDULED'",
  })
  status: string;

  @WorkspaceField({
    standardId: CALL_STANDARD_FIELD_IDS.notes,
    type: FieldMetadataType.TEXT,
    label: msg`Notes`,
    description: msg`Call notes and details`,
    icon: 'IconNotes',
  })
  @WorkspaceIsNullable()
  notes: string | null;

  @WorkspaceField({
    standardId: CALL_STANDARD_FIELD_IDS.duration,
    type: FieldMetadataType.NUMBER,
    label: msg`Duration`,
    description: msg`Call duration in minutes`,
    icon: 'IconClock',
  })
  @WorkspaceIsNullable()
  duration: number | null;

  @WorkspaceField({
    standardId: CALL_STANDARD_FIELD_IDS.scheduledAt,
    type: FieldMetadataType.DATE_TIME,
    label: msg`Scheduled At`,
    description: msg`When the call is scheduled`,
    icon: 'IconCalendar',
  })
  @WorkspaceIsNullable()
  scheduledAt: Date | null;

  @WorkspaceField({
    standardId: CALL_STANDARD_FIELD_IDS.completedAt,
    type: FieldMetadataType.DATE_TIME,
    label: msg`Completed At`,
    description: msg`When the call was completed`,
    icon: 'IconCalendar',
  })
  @WorkspaceIsNullable()
  completedAt: Date | null;

  @WorkspaceField({
    standardId: CALL_STANDARD_FIELD_IDS.position,
    type: FieldMetadataType.POSITION,
    label: msg`Position`,
    description: msg`Call record Position`,
    icon: 'IconHierarchy2',
    defaultValue: 0,
  })
  @WorkspaceIsSystem()
  position: number;

  @WorkspaceField({
    standardId: CALL_STANDARD_FIELD_IDS.createdBy,
    type: FieldMetadataType.ACTOR,
    label: msg`Created by`,
    icon: 'IconCreativeCommonsSa',
    description: msg`The creator of the record`,
  })
  @WorkspaceIsFieldUIReadOnly()
  createdBy: ActorMetadata;

  // Relations
  @WorkspaceRelation({
    standardId: CALL_STANDARD_FIELD_IDS.contact,
    type: RelationType.MANY_TO_ONE,
    label: msg`Contact`,
    description: msg`Call contact`,
    icon: 'IconUser',
    inverseSideTarget: () => require('../../contact/standard-objects/contact.workspace-entity').ContactWorkspaceEntity,
    inverseSideFieldKey: 'calls',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsNullable()
  contact: Relation<any> | null;

  @WorkspaceJoinColumn('contact')
  contactId: string | null;

  @WorkspaceField({
    standardId: CALL_STANDARD_FIELD_IDS.searchVector,
    type: FieldMetadataType.TS_VECTOR,
    label: SEARCH_VECTOR_FIELD.label,
    description: SEARCH_VECTOR_FIELD.description,
    icon: 'IconPhone',
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
