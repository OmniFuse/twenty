import { useLingui } from '@lingui/react/macro';

import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SubMenuTopBarContainer } from '@/ui/layout/page/components/SubMenuTopBarContainer';
import { H2Title } from 'twenty-ui/display';
import { Section } from 'twenty-ui/layout';
import { CallsChart } from './components/CallsChart';
import { ContactsChart } from './components/ContactsChart';
import { KpiCards } from './components/KpiCards';
import { LeadsChart } from './components/LeadsChart';

export const Analytics = () => {
  const { t } = useLingui();

  return (
    <SubMenuTopBarContainer
      title={t`Аналитика`}
      links={[
        { children: t`Аналитика` },
      ]}
    >
      <SettingsPageContainer>
        <Section>
          <H2Title 
            title={t`Ключевые показатели эффективности`} 
            description={t`Обзор эффективности вашей воронки продаж`}
          />
          <KpiCards />
        </Section>

        <Section>
          <H2Title 
            title={t`Аналитика контактов`} 
            description={t`Тенденции создания и обработки телефонных контактов`}
          />
          <ContactsChart />
        </Section>

        <Section>
          <H2Title 
            title={t`Аналитика лидов`} 
            description={t`Анализ генерации и конверсии лидов`}
          />
          <LeadsChart />
        </Section>

        <Section>
          <H2Title 
            title={t`Аналитика звонков`} 
            description={t`Отслеживание активности и результатов звонков`}
          />
          <CallsChart />
        </Section>
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
