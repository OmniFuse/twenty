import { msg } from '@lingui/core/macro';
import { FieldMetadataType } from 'twenty-shared/types';

import { RelationOnDeleteAction } from 'src/engine/metadata-modules/field-metadata/interfaces/relation-on-delete-action.interface';
import { RelationType } from 'src/engine/metadata-modules/field-metadata/interfaces/relation-type.interface';
import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { ActorMetadata } from 'src/engine/metadata-modules/field-metadata/composite-types/actor.composite-type';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceIsFieldUIReadOnly } from 'src/engine/twenty-orm/decorators/workspace-is-field-ui-readonly.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceJoinColumn } from 'src/engine/twenty-orm/decorators/workspace-join-column.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { BASE_OBJECT_STANDARD_FIELD_IDS, CALL_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_ICONS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-icons';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
// search-vector utilities removed
import { AttachmentWorkspaceEntity } from 'src/modules/attachment/standard-objects/attachment.workspace-entity';
import { TimelineActivityWorkspaceEntity } from 'src/modules/timeline/standard-objects/timeline-activity.workspace-entity';

// Calls have no searchable fields

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.call,
  namePlural: 'calls',
  labelSingular: msg`Call`,
  labelPlural: msg`Calls`,
  description: msg`A call made to a contact`,
  icon: STANDARD_OBJECT_ICONS.task, // Using task icon as placeholder
  shortcut: 'K',
  labelIdentifierStandardId: BASE_OBJECT_STANDARD_FIELD_IDS.id,
})
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

  // Notes field removed

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

  @WorkspaceRelation({
    standardId: CALL_STANDARD_FIELD_IDS.timelineActivities,
    type: RelationType.ONE_TO_MANY,
    label: msg`Events`,
    description: msg`Timeline activities for this call`,
    icon: 'IconTimelineEvent',
    inverseSideTarget: () => TimelineActivityWorkspaceEntity,
    inverseSideFieldKey: 'call',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  timelineActivities: Relation<TimelineActivityWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: CALL_STANDARD_FIELD_IDS.attachments,
    type: RelationType.ONE_TO_MANY,
    label: msg`Attachments`,
    description: msg`Attachments linked to this call`,
    icon: 'IconFileImport',
    inverseSideTarget: () => AttachmentWorkspaceEntity,
    inverseSideFieldKey: 'call',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  attachments: Relation<AttachmentWorkspaceEntity[]>;

  // Search vector removed as there are no searchable fields on Call
}
