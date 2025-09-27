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
  background: linear-gradient(135deg, #20c933 0%, #00d4ff 100%);
  border-radius: ${({ theme }) => theme.border.radius.md};
  display: flex;
  flex-direction: column;
  color: white;
  font-size: ${({ theme }) => theme.font.size.lg};
  position: relative;
  overflow: hidden;
  padding: 20px;
`;

const CallsTimeline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  height: 120px;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const TimeSlot = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const CallBar = styled.div<{ height: number; outcome: 'successful' | 'missed' | 'busy' }>`
  width: 20px;
  height: ${({ height }) => height}px;
  background-color: ${({ outcome }) => {
    switch (outcome) {
      case 'successful': return '#00ff88';
      case 'missed': return '#ff6b6b';
      case 'busy': return '#ff9500';
      default: return 'rgba(255, 255, 255, 0.5)';
    }
  }};
  border-radius: 2px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
    transform: translateY(-2px);
  }
`;

const TimeLabel = styled.div`
  font-size: 10px;
  opacity: 0.8;
`;

const CallOutcomes = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const OutcomeItem = styled.div`
  text-align: center;
`;

const OutcomeValue = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const OutcomeLabel = styled.div`
  font-size: 12px;
  opacity: 0.9;
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

// Mock data for calls
const mockCallsData = [
  { time: '9-10', successful: 3, missed: 1, busy: 2 },
  { time: '10-11', successful: 5, missed: 2, busy: 1 },
  { time: '11-12', successful: 4, missed: 3, busy: 2 },
  { time: '12-13', successful: 2, missed: 1, busy: 1 },
  { time: '13-14', successful: 1, missed: 0, busy: 1 },
  { time: '14-15', successful: 6, missed: 2, busy: 3 },
  { time: '15-16', successful: 4, missed: 1, busy: 2 },
  { time: '16-17', successful: 3, missed: 2, busy: 1 },
];

const totalStats = mockCallsData.reduce((acc, slot) => ({
  successful: acc.successful + slot.successful,
  missed: acc.missed + slot.missed,
  busy: acc.busy + slot.busy,
}), { successful: 0, missed: 0, busy: 0 });

const totalCalls = totalStats.successful + totalStats.missed + totalStats.busy;
const avgDuration = '4:32'; // средняя длительность звонка
const successRate = Math.round((totalStats.successful / totalCalls) * 100);

export const CallsChart = () => {
  const { t } = useLingui();

  const maxCalls = Math.max(...mockCallsData.map(slot => 
    slot.successful + slot.missed + slot.busy
  ));

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>{t`Активность звонков сегодня`}</ChartTitle>
      </ChartHeader>
      
      <MockChart>
        <div style={{ 
          color: 'rgba(255,255,255,0.9)',
          fontSize: '14px',
          marginBottom: '16px'
        }}>
          {t`Звонки по часам`}
        </div>
        
        <CallsTimeline>
          {mockCallsData.map((slot, index) => {
            const totalHeight = (slot.successful + slot.missed + slot.busy) / maxCalls * 80;
            return (
              <TimeSlot key={slot.time}>
                <CallBar 
                  height={totalHeight} 
                  outcome="successful"
                  title={`${slot.time}: ${slot.successful + slot.missed + slot.busy} calls`}
                />
                <TimeLabel>{slot.time}</TimeLabel>
              </TimeSlot>
            );
          })}
        </CallsTimeline>
        
        <CallOutcomes>
          <OutcomeItem>
            <OutcomeValue style={{ color: '#00ff88' }}>
              {totalStats.successful}
            </OutcomeValue>
            <OutcomeLabel>{t`Успешные`}</OutcomeLabel>
          </OutcomeItem>
          <OutcomeItem>
            <OutcomeValue style={{ color: '#ff6b6b' }}>
              {totalStats.missed}
            </OutcomeValue>
            <OutcomeLabel>{t`Пропущенные`}</OutcomeLabel>
          </OutcomeItem>
          <OutcomeItem>
            <OutcomeValue style={{ color: '#ff9500' }}>
              {totalStats.busy}
            </OutcomeValue>
            <OutcomeLabel>{t`Занято`}</OutcomeLabel>
          </OutcomeItem>
        </CallOutcomes>
      </MockChart>
      
      <StatsRow>
        <StatItem>
          <StatValue>{totalCalls}</StatValue>
          <StatLabel>{t`Всего звонков`}</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{avgDuration}</StatValue>
          <StatLabel>{t`Средн. длительность`}</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{successRate}%</StatValue>
          <StatLabel>{t`Процент успеха`}</StatLabel>
        </StatItem>
      </StatsRow>
    </ChartContainer>
  );
};
