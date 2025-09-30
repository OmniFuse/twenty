import { msg } from '@lingui/core/macro';
import { FieldMetadataType } from 'twenty-shared/types';

import { RelationOnDeleteAction } from 'src/engine/metadata-modules/field-metadata/interfaces/relation-on-delete-action.interface';
import { RelationType } from 'src/engine/metadata-modules/field-metadata/interfaces/relation-type.interface';
import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { SEARCH_VECTOR_FIELD } from 'src/engine/metadata-modules/constants/search-vector-field.constants';
import { ActorMetadata } from 'src/engine/metadata-modules/field-metadata/composite-types/actor.composite-type';
import { PhonesMetadata } from 'src/engine/metadata-modules/field-metadata/composite-types/phones.composite-type';
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

const NAME_FIELD_NAME = 'name';
const PHONES_FIELD_NAME = 'phones';

export const SEARCH_FIELDS_FOR_CONTACT: FieldTypeAndNameMetadata[] = [
  { name: NAME_FIELD_NAME, type: FieldMetadataType.TEXT },
  { name: PHONES_FIELD_NAME, type: FieldMetadataType.PHONES },
];

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.contact,
  namePlural: 'contacts',
  labelSingular: msg`Contact`,
  labelPlural: msg`Contacts`,
  description: msg`A contact entry for lead management`,
  icon: STANDARD_OBJECT_ICONS.person,
  shortcut: 'C',
  labelIdentifierStandardId: CONTACT_STANDARD_FIELD_IDS.name,
})
@WorkspaceIsSearchable()
export class ContactWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: CONTACT_STANDARD_FIELD_IDS.name,
    type: FieldMetadataType.TEXT,
    label: msg`Name`,
    description: msg`Contact name`,
    icon: 'IconUser',
  })
  name: string;

  @WorkspaceField({
    standardId: CONTACT_STANDARD_FIELD_IDS.source,
    type: FieldMetadataType.TEXT,
    label: msg`Source`,
    description: msg`Contact source information`,
    icon: 'IconSource',
  })
  @WorkspaceIsNullable()
  source: string | null;

  @WorkspaceField({
    standardId: CONTACT_STANDARD_FIELD_IDS.additionalInfo,
    type: FieldMetadataType.RAW_JSON,
    label: msg`Additional Info`,
    description: msg`Additional contact information in JSON format`,
    icon: 'IconInfoCircle',
  })
  @WorkspaceIsNullable()
  additionalInfo: any;

  @WorkspaceField({
    standardId: CONTACT_STANDARD_FIELD_IDS.processed,
    type: FieldMetadataType.BOOLEAN,
    label: msg`Processed`,
    description: msg`Whether the contact has been processed`,
    icon: 'IconCheck',
    defaultValue: false,
  })
  processed: boolean;

  @WorkspaceField({
    standardId: CONTACT_STANDARD_FIELD_IDS.phones,
    type: FieldMetadataType.PHONES,
    label: msg`Phones`,
    description: msg`Contact phone numbers`,
    icon: 'IconPhone',
  })
  phones: PhonesMetadata;

  @WorkspaceField({
    standardId: CONTACT_STANDARD_FIELD_IDS.position,
    type: FieldMetadataType.POSITION,
    label: msg`Position`,
    description: msg`Contact record Position`,
    icon: 'IconHierarchy2',
    defaultValue: 0,
  })
  @WorkspaceIsSystem()
  position: number;

  @WorkspaceField({
    standardId: CONTACT_STANDARD_FIELD_IDS.createdBy,
    type: FieldMetadataType.ACTOR,
    label: msg`Created by`,
    icon: 'IconCreativeCommonsSa',
    description: msg`The creator of the record`,
  })
  @WorkspaceIsFieldUIReadOnly()
  createdBy: ActorMetadata;

  // Relations
  @WorkspaceRelation({
    standardId: CONTACT_STANDARD_FIELD_IDS.leads,
    type: RelationType.ONE_TO_MANY,
    label: msg`Leads`,
    description: msg`Leads associated with this contact`,
    icon: 'IconTargetArrow',
    inverseSideTarget: () => require('../../../lead/standard-objects/lead.workspace-entity').LeadWorkspaceEntity,
    inverseSideFieldKey: 'contact',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsFieldUIReadOnly()
  leads: Relation<any[]>; // Will be properly typed when LeadWorkspaceEntity is defined

  @WorkspaceRelation({
    standardId: CONTACT_STANDARD_FIELD_IDS.calls,
    type: RelationType.ONE_TO_MANY,
    label: msg`Calls`,
    description: msg`Calls made to this contact`,
    icon: 'IconPhone',
    inverseSideTarget: () => require('../../../call/standard-objects/call.workspace-entity').CallWorkspaceEntity,
    inverseSideFieldKey: 'contact',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsFieldUIReadOnly()
  calls: Relation<any[]>; // Will be properly typed when CallWorkspaceEntity is defined

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
