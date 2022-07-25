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
  const result = a < b ? 1 : a > b ? -1 : 0;
  return inverse ? -result : result;
}

export default function Home() {
  const [column, setColumn] = React.useState({
    number: 0.25,
    artist: 0.25,
    title: 0.25,
    label: 0.25,
  });
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
    const percentDelta = deltaX / width;

    if (dataKey === 'number') {
      setColumn({
        ...column,
        number: column.number + percentDelta,
        artist: column.artist - percentDelta,
      });
    } else if (dataKey === 'artist') {
      setColumn({
        ...column,
        artist: column.artist + percentDelta,
        title: column.title - percentDelta,
      });
    } else if (dataKey === 'title') {
      setColumn({
        ...column,
        title: column.title + percentDelta,
        label: column.label - percentDelta,
      });
    }
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
          <Column
            dataKey="number"
            headerRenderer={(data) => headerRenderer(data, width)}
            label="#"
            width={width * column.number}
          />
          <Column
            dataKey="artist"
            headerRenderer={(data) => headerRenderer(data, width)}
            label="Artist"
            width={width * column.artist}
          />
          <Column
            dataKey="title"
            headerRenderer={(data) => headerRenderer(data, width)}
            label="Title"
            width={width * column.title}
          />
          <Column
            dataKey="label"
            headerRenderer={(data) => headerRenderer(data, width, false)}
            label="Label"
            width={width * column.label}
          />
        </Table>
      )}
    </AutoSizer>
  );
}
