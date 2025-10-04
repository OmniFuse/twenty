import { msg } from '@lingui/core/macro';

import { AggregateOperations } from 'src/engine/api/graphql/graphql-query-runner/constants/aggregate-operations.constant';
import { type ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import { DEFAULT_VIEW_FIELD_SIZE } from 'src/engine/workspace-manager/standard-objects-prefill-data/views/constants/DEFAULT_VIEW_FIELD_SIZE';
import {
    BASE_OBJECT_STANDARD_FIELD_IDS,
    LEAD_STANDARD_FIELD_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';

export const leadsAllView = (
  objectMetadataItems: ObjectMetadataEntity[],
  useCoreNaming = false,
) => {
  const leadObjectMetadata = objectMetadataItems.find(
    (object) => object.standardId === STANDARD_OBJECT_IDS.lead,
  );

  if (!leadObjectMetadata) {
    throw new Error('Lead object metadata not found');
  }

  return {
    name: useCoreNaming ? msg`All {objectLabelPlural}` : 'All Leads',
    objectMetadataId: leadObjectMetadata.id ?? '',
    type: 'table',
    key: 'INDEX',
    position: 0,
    icon: 'IconTargetArrow',
    kanbanFieldMetadataId: '',
    filters: [],
    fields: [
      {
        fieldMetadataId:
          leadObjectMetadata.fields.find(
            (field) => field.standardId === LEAD_STANDARD_FIELD_IDS.name,
          )?.id ?? '',
        position: 0,
        isVisible: true,
        size: DEFAULT_VIEW_FIELD_SIZE,
      },
      {
        fieldMetadataId:
          leadObjectMetadata.fields.find(
            (field) => field.standardId === LEAD_STANDARD_FIELD_IDS.amount,
          )?.id ?? '',
        position: 1,
        isVisible: true,
        size: 120,
        aggregateOperation: AggregateOperations.SUM,
      },
      {
        fieldMetadataId:
          leadObjectMetadata.fields.find(
            (field) => field.standardId === LEAD_STANDARD_FIELD_IDS.location,
          )?.id ?? '',
        position: 2,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          leadObjectMetadata.fields.find(
            (field) => field.standardId === LEAD_STANDARD_FIELD_IDS.contact,
          )?.id ?? '',
        position: 3,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          leadObjectMetadata.fields.find(
            (field) =>
              field.standardId === BASE_OBJECT_STANDARD_FIELD_IDS.createdAt,
          )?.id ?? '',
        position: 4,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          leadObjectMetadata.fields.find(
            (field) =>
              field.standardId === LEAD_STANDARD_FIELD_IDS.additionalInfo,
          )?.id ?? '',
        position: 5,
        isVisible: false,
        size: 200,
      },
    ],
  };
};




