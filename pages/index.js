import { Column, SortDirection, Table } from 'react-virtualized';
import React from 'react';

import data from '../top50.json';

export default function Home() {
  const [list, setList] = React.useState(data);
  const [sortBy, setSortBy] = React.useState(null);
  const [sortDirection, setSortDirection] = React.useState(SortDirection.ASC);

  const ref = React.useRef();

  function compare(a, b) {
    if (a[sortBy] < b[sortBy]) {
      return sortDirection === SortDirection.ASC ? -1 : 1;
    } else if (a[sortBy] > b[sortBy]) {
      return sortDirection === SortDirection.ASC ? 1 : -1;
    } else {
      return 0;
    }
  }

  function sort({ sortBy, sortDirection }) {
    setList([...list].sort(compare));
    setSortBy(sortBy);
    setSortDirection(sortDirection);
  }

  return (
    <Table
      headerHeight={40}
      height={500}
      ref={ref}
      rowCount={list.length}
      rowGetter={({ index }) => list[index]}
      rowHeight={40}
      rowStyle={{ display: 'flex' }}
      sort={sort}
      sortBy={sortBy}
      sortDirection={sortDirection}
      width={940}
    >
      <Column label="#" dataKey="number" width={40} />
      <Column label="Artist" dataKey="artist" width={300} />
      <Column label="Title" dataKey="title" width={300} />
      <Column label="Label" dataKey="label" width={300} />
    </Table>
  );
}
