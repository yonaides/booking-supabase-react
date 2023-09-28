import { HiOutlineBriefcase } from 'react-icons/hi2';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { HiOutlineChartBar } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => +cur.totalPrice, 0);
  const checkins = confirmedStays.length;

  let occupation = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);

  if (occupation === undefined || isNaN(occupation)) {
    occupation = 0;
  }

  return (
    <>
      <Stat title='booking' color='blue' icon={<HiOutlineBriefcase />} value={numBookings} />
      <Stat title='Sales' color='gree' icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
      <Stat title='Check ins' color='indigo' icon={<HiOutlineCalendarDays />} value={checkins} />
      <Stat title='Occupancy' color='yellow' icon={<HiOutlineChartBar />} value={Math.round(occupation * 100) + '%'} />
    </>
  );
}

export default Stats;
