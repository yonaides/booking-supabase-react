import { useSearchParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import Pagination from '../../ui/Pagination';

function CabinTable() {
  const { isLoading, cabins, count } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins) return <Empty resourceName='Cabins' />;
  if (!cabins.length) return <Empty resourceName='Cabins' />;

  const filterValue = searchParams.get('discount') || 'all';

  //1) filter
  let filteredCabins;

  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount') filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === 'with-discount') filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  //2) filter data sort

  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  let sortedCabins = {};
  if (field === 'name' && direction === 'asc') {
    sortedCabins = filteredCabins.sort((a, b) => (a[field] > b[field] ? -1 : 0));
  } else if (field === 'name' && direction === 'desc') {
    sortedCabins = filteredCabins.sort((a, b) => (b[field] > a[field] ? -1 : 0));
  } else {
    sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);
  }

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Options</div>
        </Table.Header>
        <Table.Body data={sortedCabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}>
          {cabins.map((cabin) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          ))}
        </Table.Body>
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default CabinTable;
