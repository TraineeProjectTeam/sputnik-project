import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { languages } from '../model/languages-selector.constants';
import EnFlag from '../assets/flags/en.svg';
import RuFlag from '../assets/flags/ru.svg';
import { ReactNode } from 'react';
import styled from 'styled-components';

const { Option } = Select;

const flags = {
  en: EnFlag,
  ru: RuFlag
};

const FlagComponent = ({ lang }: { lang: string }): ReactNode => {
  const flagImage = flags[lang as keyof typeof flags];
  return flagImage ? <StyledFlag src={flagImage} alt={`${lang}_flag`} /> : null;
};

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguageHandler = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Select
      defaultValue={i18n.language}
      onChange={changeLanguageHandler}
    >
      {languages.map(lang =>
        <Option
          key={lang.code}
          value={lang.code}
        >
          <FlagComponent lang={lang.code} />
          {lang.name}
        </Option>
      )}
    </Select>
  );
};

const StyledFlag = styled.img`
  height: 1.25rem;
  width: 1.875rem;
`