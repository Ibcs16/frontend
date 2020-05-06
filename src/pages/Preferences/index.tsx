import React, { useState, useEffect } from 'react';
import { FaChevronLeft } from 'react-icons/fa';

import { useHistory } from 'react-router-dom';
import GridTeams from '../../components/GridTeams';
import GridPreferences from '../../components/GridPreferences';
import PreferenceButton from '../../components/Button/Preference';

import { useShowHeader } from '../../hooks/showHeader';
import { usePreference } from '../../hooks/preference';

import {
  FullPage,
  Title,
  TitleHighlight,
  Description,
  DescriptionHighlight,
  CenterContainer,
  ButtonsContainer,
  PreviousDiv,
} from './styles';

interface PreferenceContent {
  title: string;
  subtitle: string;
  subtitleHighlight: string;
  options: Array<string>;
}

interface Preference {
  realities: string[];
  teams: string[];
}

const content: Array<PreferenceContent> = [
  {
    title: '1 Escolha seus |programas| favoritos',
    subtitle:
      'Escolha seus gêneros de filmes, séries e programas preferidos, assim podemos criar uma melhor recomendação.',
    subtitleHighlight: 'Clique nas categorias que você gosta!',
    options: [
      'Novelas',
      'Séries',
      'Cinema',
      'Infantil',
      'Humor',
      'Variedade',
      'Realities',
      'Música',
      'Documentários',
      'Jornalismo',
      'Esportes',
      'Programs Locais',
    ],
  },
  {
    title: '2 Escolha seus |gêneros musicais| favoritos',
    subtitle:
      'Escolha seus gêneros musicais preferidos, assim podemos criar uma melhor recomendação.',
    subtitleHighlight: 'Clique nas categorias que você gosta!',
    options: [
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
    ],
  },
  {
    title: '3 Escolha seus |gêneros de podcasts| favoritos',
    subtitle:
      'Escolha seus gêneros de podcasts preferidos, assim podemos criar uma melhor recomendação.',
    subtitleHighlight: 'Clique nas categorias que você gosta!',
    options: [
      'Estilo de Vida',
      'Saúde',
      'Auto-ajuda',
      'Comédia',
      'Notícias',
      'Sociedade',
      'Cultura',
      'Esportes',
      'Negócios',
      'Linguagem',
      'Tecnologia',
      'Religião',
    ],
  },
  {
    title: '4 Escolha seus |times| favoritos',
    subtitle:
      'Escolha seus times preferidos, assim podemos criar uma melhor recomendação.',
    subtitleHighlight: 'Clique nas categorias que você gosta!',
    options: [
      'Athletico Paranaense',
      'Athletico Goianiense',
      'Athletico Mineiro',
      'Bahia',
      'Botafogo',
      'Bragrantino',
      'Ceara',
      'Corinthians',
      'Coritiba',
      'Flamengo',
      'Fluminense',
      'Goias',
      'Grêmio',
      'Internacional',
      'Palmeiras',
      'Santos',
      'São Paulo',
      'Sport',
      'Vasco',
    ],
  },
];

const Preferences: React.FC = () => {
  const history = useHistory();
  const { setPreferences } = usePreference();
  const [prefIndex, setPrefIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  const { options, title, subtitle, subtitleHighlight } = content[prefIndex];
  const [titleBegin, titleHightlight, titleEnd] = title.split('|');

  const goBack = () => {
    setPrefIndex(prefIndex - 1);
  };

  const goHome = () => {
    const localStoragePrefs = localStorage.getItem('preferences');
    const preferences = localStoragePrefs
      ? JSON.parse(localStoragePrefs)
      : { realities: [], teams: [] };

    localStorage.setItem(
      'preferences',
      JSON.stringify({
        ...preferences,
        teams: selected,
      }),
    );
    setPreferences({
      preferences: {
        ...preferences,
        teams: selected,
      },
    });

    history.push('/dashboard');
  };

  const goFoward = () => {
    const localStoragePrefs = localStorage.getItem('preferences');
    const preferences: Preference = localStoragePrefs
      ? JSON.parse(localStoragePrefs)
      : { realities: [], teams: [] };

    const realities: Array<string> = [
      ...(preferences.realities ? preferences.realities : []),
      ...selected,
    ].filter((pref, index, array) => array.indexOf(pref) === index);

    const newPreferences: Preference = {
      teams: preferences.teams,
      realities,
    };
    localStorage.setItem('preferences', JSON.stringify(newPreferences));

    setPrefIndex(prefIndex + 1);
    setSelected([]);
  };

  const onItemSelected = (name: string) => {
    setSelected(
      selected.includes(name)
        ? selected.filter((option) => option !== name)
        : [...selected, name],
    );
  };

  const renderButtons = () => {
    if (prefIndex === content.length - 1) {
      return (
        // <Link to="/">
        <PreferenceButton onclick={() => goHome()} stateType="subscribe">
          Salvar preferências
        </PreferenceButton>
        // </Link>
      );
    }
    if (prefIndex === 0) {
      return (
        <PreferenceButton onclick={goFoward} stateType="subscribe">
          Continuar
        </PreferenceButton>
      );
    }
    return (
      <>
        <PreferenceButton onclick={goFoward} stateType="subscribe">
          Continuar
        </PreferenceButton>
        <PreferenceButton onclick={goFoward} stateType="info">
          Pular etapa
        </PreferenceButton>
      </>
    );
  };

  const { showHeader } = useShowHeader();

  useEffect(() => {
    showHeader(false);
  }, []);

  return (
    <FullPage>
      <CenterContainer>
        <Title>
          {prefIndex ? (
            <PreviousDiv onClick={() => goBack()}>
              <FaChevronLeft size={20} color="white" />
            </PreviousDiv>
          ) : (
            <></>
          )}
          {titleBegin} <TitleHighlight>{titleHightlight}</TitleHighlight>
          {titleEnd}
        </Title>
        <Description>
          {subtitle}
          <DescriptionHighlight>{subtitleHighlight}</DescriptionHighlight>
        </Description>
        {prefIndex !== content.length - 1 ? (
          <GridPreferences
            contentList={options}
            onItemSelected={onItemSelected}
            selectedItens={selected}
          />
        ) : (
          <GridTeams
            contentList={options}
            onItemSelected={onItemSelected}
            selectedItens={selected}
          />
        )}
        <ButtonsContainer>{renderButtons()}</ButtonsContainer>
      </CenterContainer>
    </FullPage>
  );
};

export default Preferences;
