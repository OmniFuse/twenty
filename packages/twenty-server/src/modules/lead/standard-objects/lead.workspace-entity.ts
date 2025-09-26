import { msg } from '@lingui/core/macro';
import { FieldMetadataType } from 'twenty-shared/types';

import { RelationOnDeleteAction } from 'src/engine/metadata-modules/field-metadata/interfaces/relation-on-delete-action.interface';
import { RelationType } from 'src/engine/metadata-modules/field-metadata/interfaces/relation-type.interface';
import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { SEARCH_VECTOR_FIELD } from 'src/engine/metadata-modules/constants/search-vector-field.constants';
import { ActorMetadata } from 'src/engine/metadata-modules/field-metadata/composite-types/actor.composite-type';
import { AddressMetadata } from 'src/engine/metadata-modules/field-metadata/composite-types/address.composite-type';
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
import { LEAD_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_ICONS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-icons';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import {
    type FieldTypeAndNameMetadata,
    getTsVectorColumnExpressionFromFields,
} from 'src/engine/workspace-manager/workspace-sync-metadata/utils/get-ts-vector-column-expression.util';
import { CallWorkspaceEntity } from 'src/modules/call/standard-objects/call.workspace-entity';
import { ContactWorkspaceEntity } from 'src/modules/contact/standard-objects/contact.workspace-entity';

const NAME_FIELD_NAME = 'name';
const DESCRIPTION_FIELD_NAME = 'description';

export const SEARCH_FIELDS_FOR_LEAD: FieldTypeAndNameMetadata[] = [
  { name: NAME_FIELD_NAME, type: FieldMetadataType.TEXT },
  { name: DESCRIPTION_FIELD_NAME, type: FieldMetadataType.TEXT },
];

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.lead,
  namePlural: 'leads',
  labelSingular: msg`Лид`,
  labelPlural: msg`Лиды`,
  description: msg`Потенциальный клиент`,
  icon: STANDARD_OBJECT_ICONS.opportunity,
  shortcut: 'L',
  labelIdentifierStandardId: LEAD_STANDARD_FIELD_IDS.name,
})
@WorkspaceIsSearchable()
export class LeadWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: LEAD_STANDARD_FIELD_IDS.name,
    type: FieldMetadataType.TEXT,
    label: msg`Имя`,
    description: msg`Имя лида`,
    icon: 'IconUser',
  })
  name: string;

  @WorkspaceField({
    standardId: LEAD_STANDARD_FIELD_IDS.description,
    type: FieldMetadataType.TEXT,
    label: msg`Описание`,
    description: msg`Подробное описание лида`,
    icon: 'IconNotes',
  })
  @WorkspaceIsNullable()
  description: string;

  @WorkspaceField({
    standardId: LEAD_STANDARD_FIELD_IDS.amount,
    type: FieldMetadataType.NUMBER,
    label: msg`Сумма`,
    description: msg`Потенциальная сумма сделки`,
    icon: 'IconCurrencyDollar',
  })
  @WorkspaceIsNullable()
  amount: number;

  @WorkspaceField({
    standardId: LEAD_STANDARD_FIELD_IDS.currency,
    type: FieldMetadataType.TEXT,
    label: msg`Валюта`,
    description: msg`Валюта сделки`,
    icon: 'IconCurrencyDollar',
    defaultValue: 'RUB',
  })
  @WorkspaceIsNullable()
  currency: string;

  @WorkspaceField({
    standardId: LEAD_STANDARD_FIELD_IDS.source,
    type: FieldMetadataType.TEXT,
    label: msg`Источник`,
    description: msg`Источник получения лида`,
    icon: 'IconSource',
  })
  @WorkspaceIsNullable()
  source: string;

  @WorkspaceField({
    standardId: LEAD_STANDARD_FIELD_IDS.workspaceMemberId,
    type: FieldMetadataType.TEXT,
    label: msg`ID участника`,
    description: msg`ID участника рабочего пространства, создавшего лида`,
    icon: 'IconUser',
  })
  @WorkspaceIsNullable()
  workspaceMemberId: string;

  @WorkspaceField({
    standardId: LEAD_STANDARD_FIELD_IDS.createdByName,
    type: FieldMetadataType.TEXT,
    label: msg`Создал`,
    description: msg`Имя человека, создавшего лида`,
    icon: 'IconUser',
  })
  @WorkspaceIsNullable()
  createdByName: string;

  @WorkspaceField({
    standardId: LEAD_STANDARD_FIELD_IDS.context,
    type: FieldMetadataType.TEXT,
    label: msg`Контекст`,
    description: msg`Дополнительная информация о лиде`,
    icon: 'IconNotes',
  })
  @WorkspaceIsNullable()
  context: string;

  @WorkspaceField({
    standardId: LEAD_STANDARD_FIELD_IDS.address,
    type: FieldMetadataType.ADDRESS,
    label: msg`Адрес`,
    description: msg`Адрес лида`,
    icon: 'IconMap',
  })
  @WorkspaceIsNullable()
  address: AddressMetadata;

  @WorkspaceField({
    standardId: LEAD_STANDARD_FIELD_IDS.position,
    type: FieldMetadataType.POSITION,
    label: msg`Позиция`,
    description: msg`Позиция записи лида`,
    icon: 'IconHierarchy2',
    defaultValue: 0,
  })
  @WorkspaceIsSystem()
  position: number;

  @WorkspaceField({
    standardId: LEAD_STANDARD_FIELD_IDS.createdBy,
    type: FieldMetadataType.ACTOR,
    label: msg`Создано`,
    icon: 'IconCreativeCommonsSa',
    description: msg`Создатель записи`,
  })
  @WorkspaceIsFieldUIReadOnly()
  createdBy: ActorMetadata;

  // Relations
  @WorkspaceRelation({
    standardId: LEAD_STANDARD_FIELD_IDS.contacts,
    type: RelationType.MANY_TO_MANY,
    label: msg`Контакты`,
    description: msg`Контакты, связанные с этим лидом`,
    icon: 'IconUsers',
    inverseSideTarget: () => ContactWorkspaceEntity,
    inverseSideFieldKey: 'leads',
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsSystem()
  contacts: Relation<ContactWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: LEAD_STANDARD_FIELD_IDS.calls,
    type: RelationType.ONE_TO_MANY,
    label: msg`Звонки`,
    description: msg`Звонки, связанные с этим лидом`,
    icon: 'IconPhone',
    inverseSideTarget: () => CallWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsSystem()
  calls: Relation<CallWorkspaceEntity[]>;

  @WorkspaceField({
    standardId: LEAD_STANDARD_FIELD_IDS.searchVector,
    type: FieldMetadataType.TS_VECTOR,
    label: SEARCH_VECTOR_FIELD.label,
    description: SEARCH_VECTOR_FIELD.description,
    icon: 'IconUser',
    generatedType: 'STORED',
    asExpression: getTsVectorColumnExpressionFromFields(
      SEARCH_FIELDS_FOR_LEAD,
    ),
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  @WorkspaceFieldIndex({ indexType: IndexType.GIN })
  searchVector: string;
}
