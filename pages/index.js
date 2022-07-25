import {
  AutoSizer,
  Column,
  createTableMultiSort,
  SortDirection,
  SortIndicator,
  Table,
} from 'react-virtualized';
import Draggable from 'react-draggable';
import React from 'react';

import 'react-virtualized/styles.css';

import data from '../top50.json';

let sortState = null;

function compare(a, b, inverse = false) {
  return (inverse ? -1 : 1) * (a < b ? 1 : a > b ? -1 : 0);
}

export default function Home() {
  const [columns, setColumns] = React.useState([
    { key: 'number', label: '#', width: 0.25 },
    { key: 'artist', label: 'Artist', width: 0.25 },
    { key: 'title', label: 'Title', width: 0.25 },
    { key: 'label', label: 'Label', width: 0.25 },
  ]);
  const [list, setList] = React.useState(data);
  const ref = React.useRef();

  // `sortState` is cleared every time `useState` is called
  if (!sortState) {
    sortState = createTableMultiSort(sort);
  }

  function headerRenderer(columnData, width, isDraggable = true) {
    const { dataKey, label } = columnData;

    return (
      <React.Fragment key={dataKey}>
        <span
          className="ReactVirtualized__Table__headerTruncatedText"
          title={label}
        >
          {label}
        </span>
        {sortState.sortBy.includes(dataKey) && (
          <SortIndicator sortDirection={sortState.sortDirection[dataKey]} />
        )}
        {isDraggable && (
          <Draggable
            axis="x"
            onDrag={(_, { deltaX }) => resizeRow(dataKey, deltaX, width)}
            position={{ x: 0 }}
            zIndex={1}
          >
            <span style={{ position: 'absolute', right: 0 }}>|</span>
          </Draggable>
        )}
      </React.Fragment>
    );
  }

  function resizeRow(dataKey, deltaX, width) {
    const index = columns.findIndex((value) => value.key === dataKey);
    const percentDelta = deltaX / width;

    setColumns(
      columns.map((column, i) => {
        if (i === index)
          return { ...column, width: column.width + percentDelta };
        else if (i === index + 1)
          return { ...column, width: column.width - percentDelta };
        return column;
      })
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
    <AutoSizer>
      {({ width, height }) => (
        <Table
          headerHeight={40}
          headerStyle={{ position: 'relative' }}
          height={height}
          ref={ref}
          rowCount={list.length}
          rowGetter={({ index }) => list[index]}
          rowHeight={40}
          sort={sortState.sort}
          width={width}
        >
          {columns.map((column, i) => (
            <Column
              dataKey={column.key}
              headerRenderer={(data) =>
                headerRenderer(data, width, i !== columns.length - 1)
              }
              key={column.key}
              label={column.label}
              width={width * column.width}
            />
          ))}
        </Table>
      )}
    </AutoSizer>
  );
}
