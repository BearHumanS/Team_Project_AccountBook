import React, { useState } from 'react';
import ExpensesAmount from './ExpensesAmount';
import ExpensesTag from './ExpensesTag';
import DepositTag from './DepositTag';
import PaymentMethod from './PaymentMethod';
import { numeric } from '@/lib/utils/Numeric';
import { createdExpense } from '@/lib/api/Api';
import { styled, css } from 'styled-components';
import { theme } from '@/styles/theme';


function Modal() {
  const [type, setType] = useState<string | undefined>('');
  const [amount, setAmount] = useState(0);
  const [tag, setTag] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const formType = e.currentTarget.dataset.formType;
    setType(formType);
    setActiveButton(formType || '');
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setAmount(numeric(input));
  };

  const handleTagChange = (tags: string) => {
    setTag(tags);
  };

  const handleMethodChange = (tags: string) => {
    setPaymentMethod(tags);
  };

  const handleSubmit =  async () => {
    let formAmount = amount;
    if (type === 'expense') {
      formAmount = -amount;
    }
   const data = {
    amount: formAmount,
    category: tag,
    date: new Date().toISOString()
    };
    await createdExpense(data);
  };

  return (
    <Container>
      <ButtonCotainer>
        <DepositButton $green="true" data-form-type="deposit" $active={activeButton === 'deposit'} onClick={handleButtonClick}>입금</DepositButton>
        <ExpenseButton $red="ture" data-form-type="expense" $active={activeButton === 'expense'} onClick={handleButtonClick}>지출</ExpenseButton>
      </ButtonCotainer>
      <ExpensesAmount amount={amount} handleAmountChange={handleAmountChange}/>
      {type === 'deposit' ? <DepositTag handleTagChange={handleTagChange} /> : 
      type === 'expense' ? <ExpensesTag handleTagChange={handleTagChange} /> : null}
      {type === 'deposit' ? null : 
      type === 'expense' ? <PaymentMethod handleMethodChange={handleMethodChange}/> : null}
      <Submit onClick={handleSubmit}>확인</Submit>
    </Container>
  )
}

const Container = styled.div `
  width: 390px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const ButtonCotainer = styled.div `
  display: flex;
  gap: 50px;
  justify-content: center;
  margin: 10px;
`;

const DepositButton = styled.button<{ 
  $green?: string 
  $active?: string
}>`
  width: 100px;
  height: 30px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all ease 1s 0s;

  ${(props) =>
    props.$green &&
    css`
      &:hover {
        background-color: ${theme.colors.green};
        color: #ffffffdb;
        background-image: linear-gradient(315deg, #b9fad9, transparent);
      }
    `}

    ${(props) =>
      props.$active &&
      css`
        background-color: ${theme.colors.green};
        color: #ffffffdb;
        background-image: linear-gradient(315deg, #b9fad9, transparent);
      `}
`;


const ExpenseButton = styled.button <{
  $red?: string;
  $active?: string
}> `
  width: 100px;
  height: 30px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all ease 1s 0s;

  ${(props) =>
    props.$red &&
    css`
     &: hover {
      background-color: ${theme.colors.red};
      color: #ffffffdb;
      background-image: linear-gradient(315deg, #e6b0c3, transparent);
      }
    `}

    ${(props) =>
      props.$active &&
      css`
        background-color: ${theme.colors.red};
        color: #ffffffdb;
        background-image: linear-gradient(315deg, #e6b0c3, transparent);
      `}
`;

const Submit = styled.button `
  width: 250px;
  height: 50px;
  margin: 10px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  font-weight: bold;

  &: hover {
    background-color: #33ff99;
    color: #ffffffdb;
  }
`;
export default Modal