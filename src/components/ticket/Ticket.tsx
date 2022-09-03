import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import moonbeam from '../../../public/images/moonbeam-token.png';

import { TicketType } from '@/types';

interface TicketPropsType {
  ticket: TicketType;
  toggleSelectedTickets: (ticket: TicketType) => void;
}
const Ticket = (props: TicketPropsType) => {
  const [isSold, setIsSold] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    setIsSold(props.ticket.sold !== undefined);
  }, [props.ticket.sold]);

  const toggleHover = () => {
    setIsHover((isHoverVal) => !isHoverVal);
  };

  // Ticket is sold
  if (isSold && props.ticket.sold) {
    const address = props.ticket.sold;
    return (
      <div className='mx-1 flex h-[100px] min-w-[100px] cursor-pointer flex-col rounded bg-moonbeam-grey-light px-4 py-2 transition-all md:mx-2 md:h-[200px] md:min-w-[200px]'>
        <div className='neonTextPink rounded-full text-2xl md:text-4xl'>{props.ticket.id}</div>
        <div className='rounded-full text-xs text-white md:text-lg'>
          {`${address.substring(0, 4)}...${address.substring(address.length - 4)}`}
        </div>
        <p className='mb-4 flex grow items-center justify-center text-lg text-white md:text-4xl'>
          SOLD
        </p>
      </div>
    );
  }

  // Ticket is not sold
  return (
    <div
      onMouseEnter={toggleHover}
      onClick={() => props.toggleSelectedTickets(props.ticket)}
      onMouseLeave={toggleHover}
      className='h-[210px] md:h-[400px]'
    >
      <div
        className={`mx-1 md:mx-2 ${
          isHover || props.ticket.isSelected ? 'mt-10' : ''
        } flex h-[150px] min-w-[100px] cursor-pointer flex-col rounded md:h-[350px] md:min-w-[200px] ${
          props.ticket.isSelected ? 'bg-moonbeam-cyan' : 'bg-moonbeam-blue'
        } border px-4 py-2 transition-all`}
      >
        <div className='neonTextPink rounded-full text-2xl md:text-4xl'>{props.ticket.id}</div>
        <div className='flex grow items-center justify-center'>
          <div className='mb-8 hidden md:block'>
            <Image src={moonbeam} layout='fixed' height='100px' width='100px' alt='' />
          </div>
          <div className='mb-8 block md:hidden'>
            <Image src={moonbeam} layout='fixed' height='50px' width='50px' alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
