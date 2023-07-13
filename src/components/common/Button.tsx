import { theme } from '@/styles/theme';
import styled, { css } from 'styled-components';

interface IButtonProps {
  [props: string]: any;
}

function Button({ ...props }: IButtonProps) {
  return <StyledButton type="button" {...props} />;
}

const StyledButton = styled.button<{
  green?: boolean;
  lightgreen?: boolean;
  red?: boolean;
  gray?: boolean;
}>`
  cursor: pointer;
  border-radius: 5px;

  ${(props) =>
    props.green &&
    css`
      background-color: ${theme.colors.green};
    `}

  ${(props) =>
    props.lightgreen &&
    css`
      background-color: ${theme.colors.lightgreen};
    `}

  ${(props) =>
    props.red &&
    css`
      background-color: ${theme.colors.red};
    `}

  ${(props) =>
    props.gray &&
    css`
      background-color: ${theme.colors.gray[0]};
      color: ${theme.colors.gray[2]};
    `}
`;

export default Button;
