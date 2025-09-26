import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { Card } from 'twenty-ui/card';
import { IconPhone, IconTargetArrow, IconTrendingUp, IconUsers } from 'twenty-ui/display';

const KpiContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const KpiCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing(4)};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const KpiIcon = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.border.radius.md};
  background-color: ${({ color }) => color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    color: ${({ color }) => color};
    width: 24px;
    height: 24px;
  }
`;

const KpiContent = styled.div`
  flex: 1;
`;

const KpiValue = styled.div`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  color: ${({ theme }) => theme.font.color.primary};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const KpiLabel = styled.div`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.font.color.secondary};
`;

const mockKpiData = {
  totalContacts: 1245,
  totalLeads: 89,
  totalCalls: 156,
  conversionRate: 7.2,
};

export const KpiCards = () => {
  const { t } = useLingui();

  return (
    <KpiContainer>
      <KpiCard>
        <KpiIcon color="#0066CC">
          <IconUsers />
        </KpiIcon>
        <KpiContent>
          <KpiValue>{mockKpiData.totalContacts.toLocaleString()}</KpiValue>
          <KpiLabel>{t`Всего контактов`}</KpiLabel>
        </KpiContent>
      </KpiCard>

      <KpiCard>
        <KpiIcon color="#FF6B35">
          <IconTargetArrow />
        </KpiIcon>
        <KpiContent>
          <KpiValue>{mockKpiData.totalLeads.toLocaleString()}</KpiValue>
          <KpiLabel>{t`Активные лиды`}</KpiLabel>
        </KpiContent>
      </KpiCard>

      <KpiCard>
        <KpiIcon color="#20C933">
          <IconPhone />
        </KpiIcon>
        <KpiContent>
          <KpiValue>{mockKpiData.totalCalls.toLocaleString()}</KpiValue>
          <KpiLabel>{t`Всего звонков`}</KpiLabel>
        </KpiContent>
      </KpiCard>

      <KpiCard>
        <KpiIcon color="#AB6AFF">
          <IconTrendingUp />
        </KpiIcon>
        <KpiContent>
          <KpiValue>{mockKpiData.conversionRate}%</KpiValue>
          <KpiLabel>{t`Конверсия`}</KpiLabel>
        </KpiContent>
      </KpiCard>
    </KpiContainer>
  );
};
