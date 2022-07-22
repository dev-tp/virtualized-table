import {
  Column,
  createTableMultiSort,
  SortDirection,
  SortIndicator,
  Table,
} from 'react-virtualized';
import React from 'react';

import 'react-virtualized/styles.css';

import data from '../top50.json';

let sortState = null;

function compare(a, b, inverse = false) {
  const result = a < b ? 1 : a > b ? -1 : 0;
  return inverse ? -result : result;
}

export default function Home() {
  const [list, setList] = React.useState(data);
  const ref = React.useRef();

  // `sortState` is cleared every time `useState` is called
  if (!sortState) {
    sortState = createTableMultiSort(sort);
  }

  function headerRenderer({ dataKey, label }) {
    return (
      <>
        <span title={label}>{label}</span>
        {sortState.sortBy.includes(dataKey) && (
          <SortIndicator sortDirection={sortState.sortDirection[dataKey]} />
        )}
      </>
    );
  }

  function sort({ sortBy, sortDirection }) {
    if (sortBy.length === 0) {
      return setList(data);
    }

    const sortedList = [...list].sort((a, b) =>
      sortBy
        .map((label) =>
          compare(
            a[label],
            b[label],
            sortDirection[label] === SortDirection.DESC
          )
        )
        .reduce((a, b) => a || b)
    );

    setList(sortedList);
  }

  return (
    <Table
      headerHeight={40}
      height={500}
      ref={ref}
      rowCount={list.length}
      rowGetter={({ index }) => list[index]}
      rowHeight={40}
      sort={sortState.sort}
      width={940}
    >
      <Column
        dataKey="number"
        headerRenderer={headerRenderer}
        label="#"
        width={40}
      />
      <Column
        dataKey="artist"
        headerRenderer={headerRenderer}
        label="Artist"
        width={300}
      />
      <Column
        dataKey="title"
        headerRenderer={headerRenderer}
        label="Title"
        width={300}
      />
      <Column
        dataKey="label"
        headerRenderer={headerRenderer}
        label="Label"
        width={300}
      />
    </Table>
  );
}
