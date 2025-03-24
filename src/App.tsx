import type { JSX } from 'react';

import type { Locale } from '@interfaces';
import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent, Stack } from '@mui/material';
import { useLocalizationContext } from '@providers';

import reactLogo from './assets/react.svg';

import './App.css';

const App = (): JSX.Element => {
  const {
    currentLangSettings,
    setCurrentLanguage,
    helpers: { langAsOptions },
    hooks: { useLocalizedInfo, useTranslation },
  } = useLocalizationContext();
  const { displayDate, displayTime } = useLocalizedInfo();
  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent): void => {
    setCurrentLanguage(event.target.value as Locale);
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Stack direction="column" alignItems="center">
        <FormControl>
          <InputLabel id="demo-lang-label">{t('common:input.label')}</InputLabel>
          <Select
            labelId="demo-lang-label"
            data-testid="demo-lang"
            value={currentLangSettings.locale}
            label={t('common:input.label')}
            onChange={handleChange}
          >
            {langAsOptions.map((option, index) => {
              return (
                <MenuItem key={`${option.value}-${index}`} value={option.value}>
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <table>
          <thead>
            <tr>
              <th>Short Date</th>
              <th>Long Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{displayDate()}</td>
              <td>{displayDate({ longFormat: true })}</td>
              <td>{displayTime()}</td>
            </tr>
          </tbody>
        </table>
        <p>{t('translation:helperTexts.primary')}</p>
      </Stack>
      <p className="read-the-docs">{t('translation:helperTexts.secondary')}</p>
    </div>
  );
};

export default App;
