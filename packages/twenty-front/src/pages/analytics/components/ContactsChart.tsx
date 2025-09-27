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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: ${({ theme }) => theme.border.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.font.size.lg};
  position: relative;
  overflow: hidden;
`;

const ChartBars = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  height: 60px;
  display: flex;
  align-items: end;
  gap: 8px;
`;

const Bar = styled.div<{ height: number }>`
  flex: 1;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  height: ${({ height }) => height}%;
  min-height: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
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

// Mock data for the chart
const mockContactsData = [
  { day: 'Mon', contacts: 12, processed: 8 },
  { day: 'Tue', contacts: 18, processed: 15 },
  { day: 'Wed', contacts: 8, processed: 6 },
  { day: 'Thu', contacts: 24, processed: 20 },
  { day: 'Fri', contacts: 16, processed: 12 },
  { day: 'Sat', contacts: 6, processed: 4 },
  { day: 'Sun', contacts: 10, processed: 8 },
];

export const ContactsChart = () => {
  const { t } = useLingui();
  
  const totalContacts = mockContactsData.reduce((sum, day) => sum + day.contacts, 0);
  const totalProcessed = mockContactsData.reduce((sum, day) => sum + day.processed, 0);
  const processingRate = Math.round((totalProcessed / totalContacts) * 100);
  
  const maxContacts = Math.max(...mockContactsData.map(d => d.contacts));

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>{t`Контакты за эту неделю`}</ChartTitle>
      </ChartHeader>
      
      <MockChart>
        <div style={{ 
          position: 'absolute', 
          top: '20px', 
          left: '20px', 
          color: 'rgba(255,255,255,0.9)',
          fontSize: '14px'
        }}>
          {t`Создание контактов по дням`}
        </div>
        
        <ChartBars>
          {mockContactsData.map((day, index) => (
            <Bar 
              key={day.day} 
              height={(day.contacts / maxContacts) * 100}
              title={`${day.day}: ${day.contacts} contacts`}
            />
          ))}
        </ChartBars>
        
        <div style={{ 
          position: 'absolute', 
          bottom: '85px', 
          left: '20px', 
          right: '20px', 
          display: 'flex', 
          justifyContent: 'space-between',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.8)'
        }}>
          {mockContactsData.map(day => (
            <span key={day.day}>{day.day}</span>
          ))}
        </div>
      </MockChart>
      
      <StatsRow>
        <StatItem>
          <StatValue>{totalContacts}</StatValue>
          <StatLabel>{t`Всего создано`}</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{totalProcessed}</StatValue>
          <StatLabel>{t`Обработано`}</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{processingRate}%</StatValue>
          <StatLabel>{t`Показатель обработки`}</StatLabel>
        </StatItem>
      </StatsRow>
    </ChartContainer>
  );
};
