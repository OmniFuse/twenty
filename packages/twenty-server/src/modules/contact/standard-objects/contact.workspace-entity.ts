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
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { CONTACT_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_ICONS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-icons';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import {
    type FieldTypeAndNameMetadata,
    getTsVectorColumnExpressionFromFields,
} from 'src/engine/workspace-manager/workspace-sync-metadata/utils/get-ts-vector-column-expression.util';
import { CallWorkspaceEntity } from 'src/modules/call/standard-objects/call.workspace-entity';
import { LeadWorkspaceEntity } from 'src/modules/lead/standard-objects/lead.workspace-entity';

const PHONE_FIELD_NAME = 'phone';
const TAGS_FIELD_NAME = 'tags';
const NAME_FIELD_NAME = 'name';

export const SEARCH_FIELDS_FOR_CONTACT: FieldTypeAndNameMetadata[] = [
  { name: PHONE_FIELD_NAME, type: FieldMetadataType.TEXT },
  { name: TAGS_FIELD_NAME, type: FieldMetadataType.TEXT },
  { name: NAME_FIELD_NAME, type: FieldMetadataType.TEXT },
];

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.contact,
  namePlural: 'contacts',
  labelSingular: msg`Контакт`,
  labelPlural: msg`Контакты`,
  description: msg`Контакт с номером телефона`,
  icon: STANDARD_OBJECT_ICONS.person,
  shortcut: 'C',
  labelIdentifierStandardId: CONTACT_STANDARD_FIELD_IDS.phone,
})
@WorkspaceIsSearchable()
export class ContactWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: CONTACT_STANDARD_FIELD_IDS.phone,
    type: FieldMetadataType.TEXT,
    label: msg`Телефон`,
    description: msg`Номер телефона контакта`,
    icon: 'IconPhone',
  })
  phone: string;

  @WorkspaceField({
    standardId: CONTACT_STANDARD_FIELD_IDS.source,
    type: FieldMetadataType.TEXT,
    label: msg`Источник`,
    description: msg`Источник получения контакта`,
    icon: 'IconSource',
  })
  @WorkspaceIsNullable()
  source: string;

  @WorkspaceField({
    standardId: CONTACT_STANDARD_FIELD_IDS.workspaceMemberId,
    type: FieldMetadataType.TEXT,
    label: msg`ID участника`,
    description: msg`ID участника рабочего пространства, создавшего контакт`,
    icon: 'IconUser',
  })
  @WorkspaceIsNullable()
  workspaceMemberId: string;

  @WorkspaceField({
    standardId: CONTACT_STANDARD_FIELD_IDS.name,
    type: FieldMetadataType.TEXT,
    label: msg`Имя`,
    description: msg`Имя контакта`,
    icon: 'IconUser',
  })
  @WorkspaceIsNullable()
  name: string;

  @WorkspaceField({
    standardId: CONTACT_STANDARD_FIELD_IDS.context,
    type: FieldMetadataType.TEXT,
    label: msg`Контекст`,
    description: msg`Дополнительная информация о контакте`,
    icon: 'IconNotes',
  })
  @WorkspaceIsNullable()
  context: string;

  @WorkspaceField({
    standardId: CONTACT_STANDARD_FIELD_IDS.tags,
    type: FieldMetadataType.TEXT,
    label: msg`Теги`,
    description: msg`Теги, связанные с контактом`,
    icon: 'IconTag',
  })
  @WorkspaceIsNullable()
  tags: string;

  @WorkspaceField({
    standardId: CONTACT_STANDARD_FIELD_IDS.additionalInfo,
    type: FieldMetadataType.TEXT,
    label: msg`Доп. информация`,
    description: msg`Дополнительная информация в формате JSON`,
    icon: 'IconInfoCircle',
  })
  @WorkspaceIsNullable()
  additionalInfo: string;

  @WorkspaceField({
    standardId: CONTACT_STANDARD_FIELD_IDS.processed,
    type: FieldMetadataType.BOOLEAN,
    label: msg`Обработан`,
    description: msg`Обработан ли данный контакт`,
    icon: 'IconCheck',
    defaultValue: false,
  })
  processed: boolean;

  @WorkspaceField({
    standardId: CONTACT_STANDARD_FIELD_IDS.position,
    type: FieldMetadataType.POSITION,
    label: msg`Позиция`,
    description: msg`Позиция записи контакта`,
    icon: 'IconHierarchy2',
    defaultValue: 0,
  })
  @WorkspaceIsSystem()
  position: number;

  @WorkspaceField({
    standardId: CONTACT_STANDARD_FIELD_IDS.createdBy,
    type: FieldMetadataType.ACTOR,
    label: msg`Создано`,
    icon: 'IconCreativeCommonsSa',
    description: msg`Создатель записи`,
  })
  @WorkspaceIsFieldUIReadOnly()
  createdBy: ActorMetadata;

  // Relations
  @WorkspaceRelation({
    standardId: CONTACT_STANDARD_FIELD_IDS.leads,
    type: RelationType.MANY_TO_MANY,
    label: msg`Лиды`,
    description: msg`Лиды, связанные с этим контактом`,
    icon: 'IconTargetArrow',
    inverseSideTarget: () => LeadWorkspaceEntity,
    inverseSideFieldKey: 'contacts',
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsSystem()
  leads: Relation<LeadWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: CONTACT_STANDARD_FIELD_IDS.calls,
    type: RelationType.ONE_TO_MANY,
    label: msg`Звонки`,
    description: msg`Звонки, совершенные этому контакту`,
    icon: 'IconPhone',
    inverseSideTarget: () => CallWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsSystem()
  calls: Relation<CallWorkspaceEntity[]>;

  @WorkspaceField({
    standardId: CONTACT_STANDARD_FIELD_IDS.searchVector,
    type: FieldMetadataType.TS_VECTOR,
    label: SEARCH_VECTOR_FIELD.label,
    description: SEARCH_VECTOR_FIELD.description,
    icon: 'IconUser',
    generatedType: 'STORED',
    asExpression: getTsVectorColumnExpressionFromFields(
      SEARCH_FIELDS_FOR_CONTACT,
    ),
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  @WorkspaceFieldIndex({ indexType: IndexType.GIN })
  searchVector: string;
}
