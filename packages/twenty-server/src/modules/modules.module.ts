import { Module } from '@nestjs/common';

import { CalendarModule } from 'src/modules/calendar/calendar.module';
import { CallModule } from 'src/modules/call/call.module';
import { ConnectedAccountModule } from 'src/modules/connected-account/connected-account.module';
import { ContactModule } from 'src/modules/contact/contact.module';
import { FavoriteFolderModule } from 'src/modules/favorite-folder/favorite-folder.module';
import { FavoriteModule } from 'src/modules/favorite/favorite.module';
import { LeadModule } from 'src/modules/lead/lead.module';
import { MessagingModule } from 'src/modules/messaging/messaging.module';
import { ViewModule } from 'src/modules/view/view.module';
import { WorkflowModule } from 'src/modules/workflow/workflow.module';

@Module({
  imports: [
    MessagingModule,
    CalendarModule,
    ConnectedAccountModule,
    ViewModule,
    WorkflowModule,
    FavoriteFolderModule,
    FavoriteModule,
    ContactModule,
    LeadModule,
    CallModule,
  ],
  providers: [],
  exports: [],
})
export class ModulesModule {}
