import { DayProps } from '@/components/Home/TheCalender';
import { css, styled } from 'styled-components';
import { theme } from '@/styles/theme';

interface NotCurrentMonthProps {
  week: number;
  day: number;
  prevMonthLastDate: number;
  firstDayIdx: number;
  $isCurrentMonth: boolean;
  currentDay: number;
  lastDate: number;
  nextMonthFirstIdx: number;
}

function NotCurrentMonth({
  week,
  day,
  prevMonthLastDate,
  firstDayIdx,
  $isCurrentMonth,
  currentDay,
  lastDate,
  nextMonthFirstIdx,
}: NotCurrentMonthProps) {
  return (
    <>
      {/* '0주차이고, 첫 번째 요일 인덱스보다 day 값이 작거나 같을 경우' 또는
      '현재 날짜(currentDay)가 마지막 날짜(lastDate)를 초과한 경우' */}
      {week === 0 && day <= firstDayIdx ? (
        // 0주차이고, 첫 번째 요일 인덱스보다 day 값이 작거나 같을 경우 (1일 이전)
        <Day key={`prev-${week}-${day}`} $isCurrentMonth={$isCurrentMonth}>
          <DayContent $isCurrentMonth={$isCurrentMonth}>
            {/* 30 - firstDayIndex + day */}
            {prevMonthLastDate - (firstDayIdx - day)}
          </DayContent>
        </Day>
      ) : (
        // 현재 날짜(currentDay)가 마지막 날짜를 초과한 경우(31일 이후)
        <Day key={`next-${week}-${day}`} $isCurrentMonth={false}>
          <DayContent $isCurrentMonth={false}>
            {/* 현재 날짜 - 마지막 해당 월의 날짜 + day - 다음 달의 첫 날짜 index - 1 */}
            {currentDay - lastDate + day - nextMonthFirstIdx - 1}
          </DayContent>
        </Day>
      )}
    </>
  );
}
const Day = styled.button<DayProps>`
  display: flex;
  justify-content: center;
  color: #888888;
  border: none;
  cursor: pointer;
  background-color: inherit;
  min-width: 1.5rem;
`;

const DayContent = styled.div<DayProps>`
  color: #000;

  ${(props) =>
    props.$day === 7 &&
    css`
      color: blue;
    `}

  ${(props) =>
    props.$day === 1 &&
    css`
      color: ${theme.colors.red};
    `}
    

  ${(props) => props.$isCurrentMonth && css``}

   ${(props) =>
    !props.$isCurrentMonth &&
    css`
      color: #b9b7b7;
    `}
`;
export default NotCurrentMonth;
