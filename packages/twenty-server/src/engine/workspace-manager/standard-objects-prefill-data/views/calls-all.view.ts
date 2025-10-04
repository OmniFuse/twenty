import { msg } from '@lingui/core/macro';

import { type ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import { DEFAULT_VIEW_FIELD_SIZE } from 'src/engine/workspace-manager/standard-objects-prefill-data/views/constants/DEFAULT_VIEW_FIELD_SIZE';
import {
    BASE_OBJECT_STANDARD_FIELD_IDS,
    CALL_STANDARD_FIELD_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';

export const callsAllView = (
  objectMetadataItems: ObjectMetadataEntity[],
  useCoreNaming = false,
) => {
  const callObjectMetadata = objectMetadataItems.find(
    (object) => object.standardId === STANDARD_OBJECT_IDS.call,
  );

  if (!callObjectMetadata) {
    throw new Error('Call object metadata not found');
  }

  return {
    name: useCoreNaming ? msg`All {objectLabelPlural}` : 'All Calls',
    objectMetadataId: callObjectMetadata.id ?? '',
    type: 'table',
    key: 'INDEX',
    position: 0,
    icon: 'IconPhone',
    kanbanFieldMetadataId: '',
    filters: [],
    fields: [
      {
        fieldMetadataId:
          callObjectMetadata.fields.find(
            (field) => field.standardId === CALL_STANDARD_FIELD_IDS.status,
          )?.id ?? '',
        position: 0,
        isVisible: true,
        size: 120,
      },
      {
        fieldMetadataId:
          callObjectMetadata.fields.find(
            (field) => field.standardId === CALL_STANDARD_FIELD_IDS.contact,
          )?.id ?? '',
        position: 1,
        isVisible: true,
        size: DEFAULT_VIEW_FIELD_SIZE,
      },
      {
        fieldMetadataId:
          callObjectMetadata.fields.find(
            (field) => field.standardId === CALL_STANDARD_FIELD_IDS.scheduledAt,
          )?.id ?? '',
        position: 2,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          callObjectMetadata.fields.find(
            (field) => field.standardId === CALL_STANDARD_FIELD_IDS.duration,
          )?.id ?? '',
        position: 3,
        isVisible: true,
        size: 100,
      },
      {
        fieldMetadataId:
          callObjectMetadata.fields.find(
            (field) =>
              field.standardId === BASE_OBJECT_STANDARD_FIELD_IDS.createdAt,
          )?.id ?? '',
        position: 4,
        isVisible: true,
        size: 150,
      },
      // position 5 intentionally unused after removing notes
    ],
  };
};



