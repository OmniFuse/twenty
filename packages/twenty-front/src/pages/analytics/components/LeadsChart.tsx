import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { Card } from 'twenty-ui/layout';

const ChartContainer = styled(Card)`
  padding: ${({ theme }) => theme.spacing(6)};
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const ChartTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.font.color.primary};
  margin: 0;
`;

const MockChart = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
  border-radius: ${({ theme }) => theme.border.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.font.size.lg};
  position: relative;
  overflow: hidden;
`;

const DonutChart = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: conic-gradient(
    #00ff88 0deg 72deg,
    #ff9500 72deg 144deg,
    #ff6b6b 144deg 216deg,
    rgba(255, 255, 255, 0.3) 216deg 360deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
    border-radius: 50%;
  }
`;

const DonutCenter = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
`;

const CenterValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const CenterLabel = styled.div`
  font-size: 12px;
  opacity: 0.9;
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.font.color.secondary};
`;

const LegendColor = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${({ color }) => color};
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing(4)};
  padding-top: ${({ theme }) => theme.spacing(4)};
  border-top: 1px solid ${({ theme }) => theme.border.color.medium};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  color: ${({ theme }) => theme.font.color.primary};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.font.color.secondary};
`;

// Mock data for leads
const mockLeadData = {
  new: 20,
  contacted: 15,
  qualified: 8,
  closed: 4,
  totalValue: 245000, // в рублях
  avgValue: 5200,
};

export const LeadsChart = () => {
  const { t } = useLingui();
  
  const total = mockLeadData.new + mockLeadData.contacted + mockLeadData.qualified + mockLeadData.closed;
  const conversionRate = Math.round((mockLeadData.closed / total) * 100);

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>{t`Статус воронки лидов`}</ChartTitle>
      </ChartHeader>
      
      <MockChart>
        <div style={{ 
          position: 'absolute', 
          top: '20px', 
          left: '20px', 
          color: 'rgba(255,255,255,0.9)',
          fontSize: '14px'
        }}>
          {t`Распределение лидов по статусам`}
        </div>
        
        <DonutChart>
          <DonutCenter>
            <CenterValue>{total}</CenterValue>
            <CenterLabel>{t`Всего лидов`}</CenterLabel>
          </DonutCenter>
        </DonutChart>
        
        <Legend>
          <LegendItem>
            <LegendColor color="#00ff88" />
            <span>{t`Новые`} ({mockLeadData.new})</span>
          </LegendItem>
          <LegendItem>
            <LegendColor color="#ff9500" />
            <span>{t`Связались`} ({mockLeadData.contacted})</span>
          </LegendItem>
          <LegendItem>
            <LegendColor color="#ff6b6b" />
            <span>{t`Квалифицированы`} ({mockLeadData.qualified})</span>
          </LegendItem>
          <LegendItem>
            <LegendColor color="rgba(255, 255, 255, 0.3)" />
            <span>{t`Закрыты`} ({mockLeadData.closed})</span>
          </LegendItem>
        </Legend>
      </MockChart>
      
      <StatsRow>
        <StatItem>
          <StatValue>₽{mockLeadData.totalValue.toLocaleString()}</StatValue>
          <StatLabel>{t`Общая стоимость воронки`}</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>₽{mockLeadData.avgValue.toLocaleString()}</StatValue>
          <StatLabel>{t`Средняя стоимость лида`}</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{conversionRate}%</StatValue>
          <StatLabel>{t`Конверсия`}</StatLabel>
        </StatItem>
      </StatsRow>
    </ChartContainer>
  );
};
