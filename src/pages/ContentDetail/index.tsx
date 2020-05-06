import React, { useState, useEffect, FormEvent } from 'react';

import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
} from 'react-instantsearch-dom';
import { useRouteMatch } from 'react-router-dom';
import Hightlight from '../../components/Highlight';
import Offer from '../../components/Offer';
import SliderTC from '../../components/SliderTC';
import headlineBbb from '../../assets/headline1.png';
import highlightBbb from '../../assets/highlight.jpg';
import Tabs from '../../components/Tabs';
import TCItem from '../../components/TCItem';
import { usePreference } from '../../hooks/preference';
import TempContentHighlight from './components/TempContentHighlight';
import bbbEvent from '../../assets/bbb-event.jpg';
import sportEvent from '../../assets/campeonato.svg';
import Header from '../../components/Header';
import dados from '../../services/data';

interface ContentParams {
  id: string;
}

const searchClient = algoliasearch(
  '4QY1VFRTEI',
  'cc270b4bdedef830c10fc96247f2dd50',
);

interface Item {
  title: string;
  link: string;
  src: any;
  type: string;
  categories: string[];
  id: string;
  highlight: any;
  desc: string;
}

const Dashboard: React.FC = () => {
  const [filtered, setFiltered] = useState<Item[]>([]);
  const { params } = useRouteMatch<ContentParams>();
  const { items, preferences } = usePreference();

  const content = items[Number(params.id)];

  // useEffect(() => {}, []);

  return (
    <>
      <Header />
      <Hightlight
        title={content.title}
        highlightImg={content.highlight}
        headlineImg={headlineBbb}
        mainButtonType="watch"
      >
        {content.desc}
      </Hightlight>

      <Offer>
        <Tabs />
      </Offer>
      <Offer>
        {preferences.realities.some((el) => {
          return [
            'Lançamentos',
            'Mais tocadas',
            'Em ascenção',
            'Internacional',
            'Brasil',
            'Sertanejo',
            'Funk',
            'Samba',
            'Pagode',
            'MPB',
            'Eletrônica',
            'Bem estar',
          ].includes(el);
        }) &&
          params.id === '0' && (
            <SliderTC
              title="Músicas, Programas e Podcasts"
              isTC
              items={dados.music}
            />
          )}
      </Offer>

      <Offer>
        {preferences.realities.some((el) => {
          return ['Jornalismo', 'Esportes'].includes(el);
        }) && <SliderTC title="Notícias" isTC items={dados.news} />}
      </Offer>

      {/* <Offer>
        <Slider isTC items={items} />
      </Offer> */}
      <TempContentHighlight
        actionButtonText={params.id === '0' ? 'Votar' : 'Consulte a tabela'}
        bgColor={params.id === '0' ? '#000' : '#e3672b'}
        bgImg={params.id === '0' ? bbbEvent : sportEvent}
        hasBlur={params.id === '0'}
        hasMarginRight={params.id === '1'}
      >
        <div>{dados.events[Number(params.id)].desc}</div>
      </TempContentHighlight>
    </>
  );
};

export default Dashboard;
