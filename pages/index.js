import { Column, SortDirection, Table } from 'react-virtualized';
import React from 'react';

// https://github.com/bvaughn/react-virtualized/blob/master/docs/multiColumnSortTable.md
export default function Home() {
  // A State of Trance Top 50 (2021)
  const [list, setList] = React.useState([
    { number: 50, artist: 'Orjan Nilsen', title: 'Volt', label: 'Armind' },
    {
      number: 49,
      artist: 'Somna & Jennifer Rene',
      title: 'Stars Collide (XiJaro & Pitch Remix)',
      label: 'Magik Muzik',
    },
    {
      number: 48,
      artist: 'Will Atkinson',
      title: 'The Last Rave On Earth',
      label: 'VII',
    },
    {
      number: 47,
      artist: 'Maor Levi & BT feat. Nation Of One',
      title: 'Here',
      label: 'Armind',
    },
    {
      number: 46,
      artist: 'Andy Moor, Somna & Linney',
      title: 'More Than Love (Craig Connelly Remix)',
      label: 'AVA',
    },
    {
      number: 45,
      artist: 'Giuseppe Ottaviani & Cari',
      title: 'Beautiful',
      label: 'Armind',
    },
    {
      number: 44,
      artist: 'Factor B',
      title: 'Innerspace',
      label: 'Theatre Of The Mind',
    },
    {
      number: 43,
      artist: 'Aly & Fila with Deirdre McLaughlin',
      title: 'Gravity (Daxson Remix)',
      label: 'Future Sound of Egypt',
    },
    {
      number: 42,
      artist: 'Armin van Buuren feat. Sarah Reeves',
      title: 'Tell Me Why',
      label: 'Armind',
    },
    {
      number: 41,
      artist: 'Markus Schulz & HALIENE',
      title: 'Tidal Wave (Will Atkinson Remix)',
      label: 'Coldharbour',
    },
    {
      number: 40,
      artist: 'Richard Durand & Susana',
      title: 'I Matter To You',
      label: 'Magik Muzik]',
    },
    {
      number: 39,
      artist: 'Sunlounger feat. Susie Ledge',
      title: 'Sail Away (Roger Shah & Yelow Uplifting Mix)',
      label: 'FSOE',
    },
    {
      number: 38,
      artist: 'Armin van Buuren & Rank 1',
      title: 'The Greater Light To Rule The Night',
      label: 'A State Of Trance',
    },
    {
      number: 37,
      artist: 'Roman Messer, Ahmed Helmy & Cari',
      title: 'Infinity',
      label: 'A State of Trance',
    },
    {
      number: 36,
      artist: 'Cosmic Gate & Diana Miro',
      title: 'Nothing To Hide',
      label: 'Wake Your Mind',
    },
    {
      number: 35,
      artist: 'Gareth Emery feat. Annabel',
      title: "You'll Be OK (Jorn van Deynhoven Remix)",
      label: "We'll Be OK]",
    },
    {
      number: 34,
      artist: 'Roman Messer feat. Joe Jury',
      title: 'The River',
      label: 'Suanda',
    },
    {
      number: 33,
      artist: 'Andrew Rayel pres. AETHER',
      title: 'Ascendit ad Paradisum',
      label: 'Find Your Harmony',
    },
    {
      number: 32,
      artist: 'Above & Beyond feat. Zoë Johnston',
      title: 'Good For Me (ALPHA 9 Remix)',
      label: 'Anjunabeats',
    },
    {
      number: 31,
      artist: 'Andrew Rayel & Tensteps feat. RUNAGROUND',
      title: 'Carry You Home',
      label: 'Find Your Harmony',
    },
    {
      number: 30,
      artist: 'Ciaran McAuley & Audrey Gallagher',
      title: 'If This Is How It Ends',
      label: 'FSOE',
    },
    {
      number: 29,
      artist: 'Gareth Emery feat. Sarah de Warren',
      title: 'Calling Home',
      label: "We'll Be OK",
    },
    {
      number: 28,
      artist: 'HALIENE',
      title: 'Glass Heart (Craig Connelly Remix)',
      label: 'Black Hole Recordings',
    },
    {
      number: 27,
      artist: 'Andrew Rayel & Robbie Seed feat. MaryJo Lilac',
      title: 'Blue Roses',
      label: 'Find Your Harmony',
    },
    {
      number: 26,
      artist: 'Armin van Buuren & Maor Levi',
      title: 'Divino',
      label: 'A State Of Trance',
    },
    {
      number: 25,
      artist: 'Stoneface & Terminal',
      title: 'Moonscape',
      label: 'FSOE',
    },
    {
      number: 24,
      artist: 'Giuseppe Ottaviani & Lucid Blue',
      title: 'Be The Angel',
      label: 'Black Hole Recordings',
    },
    {
      number: 23,
      artist: 'Armin van Buuren & Jorn van Deynhoven',
      title: 'Lost In Space',
      label: 'A State Of Trance',
    },
    {
      number: 22,
      artist: 'Aly & Fila and JES',
      title: 'Sunrise',
      label: 'Armind',
    },
    {
      number: 21,
      artist: 'Factor B & Arielle Maren',
      title: 'Connected',
      label: 'Theatre of the Mind',
    },
    {
      number: 20,
      artist: 'Alesso & Armin van Buuren',
      title: 'Leave A Little Love (Club Mix)',
      label: 'Armind',
    },
    {
      number: 19,
      artist: 'Andrew Rayel feat. AIDYL',
      title: 'River',
      label: 'Find Your Harmony',
    },
    {
      number: 18,
      artist: 'Armin van Buuren & Vini Vici feat. Tribal Dance & Natalie Wamba',
      title: 'Yama',
      label: 'Armind',
    },
    {
      number: 17,
      artist: 'Christina Novelli & Richard Durand',
      title: 'My Guiding Light',
      label: 'Muse',
    },
    {
      number: 16,
      artist: 'Armin van Buuren & Susana',
      title: 'Home With You',
      label: 'A State Of Trance',
    },
    {
      number: 15,
      artist: 'Armin van Buuren & AVIRA',
      title: 'Sirius',
      label: 'A State Of Trance',
    },
    {
      number: 14,
      artist: 'Ilan Bluestone feat. Ellen Smith',
      title: 'Stranger To Your Love',
      label: 'Anjunabeats',
    },
    {
      number: 13,
      artist: 'Bryan Kearney',
      title: 'Euphoric Recall',
      label: 'FSOE',
    },
    {
      number: 12,
      artist: 'Armin van Buuren & Giuseppe Ottaviani',
      title: 'Magico',
      label: 'A State Of Trance',
    },
    {
      number: 11,
      artist: 'Above & Beyond',
      title: 'Sun in Your Eyes (Daniel Kandi Remix)',
      label: 'Anjunabeats',
    },
    {
      number: 10,
      artist: 'Ruben de Ronde & That Girl',
      title: 'Lose Yourself',
      label: 'Statement!',
    },
    {
      number: 9,
      artist: 'Ciaran McAuley',
      title: "Tears Don't Mean You're Losing",
      label: 'FSOE',
    },
    {
      number: 8,
      artist: 'Armin van Buuren & Davina Michelle',
      title: 'Hold On',
      label: 'Armind',
    },
    {
      number: 7,
      artist: 'Ferry Corsten pres. Gouryella',
      title: 'Orenda',
      label: 'Flashover Recordings',
    },
    {
      number: 6,
      artist: 'RAM & Talla 2XLC & Natalie Gioia',
      title: 'Shine',
      label: 'Nocturnal Knights',
    },
    {
      number: 5,
      artist: 'Factor B',
      title: 'Sea Of Thoughts',
      label: 'Theatre Of The Mind',
    },
    {
      number: 4,
      artist: 'Above & Beyond and Justine Suissa',
      title: 'Almost Home (Above & Beyond Club Mix)',
      label: 'Anjunabeats]',
    },
    {
      number: 3,
      artist: 'Armin van Buuren',
      title: 'Turn The World Into A Dancefloor (ASOT 1000 Anthem)',
      label: 'A State Of Trance',
    },
    {
      number: 2,
      artist: 'Ferry Corsten & Ruben de Ronde',
      title: 'Bloodstream',
      label: 'Flashover Recordings',
    },
    {
      number: 1,
      artist: 'Armin van Buuren and Aly & Fila feat. Kazi Jay',
      title: 'For All Time',
      label: 'A State Of Trance',
    },
  ]);
  const [sortBy, setSortBy] = React.useState('number');
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
