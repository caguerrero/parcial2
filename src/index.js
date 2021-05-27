import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { IntlProvider } from 'react-intl';
import Series from './components/Series';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import localEsMessages from "./locales/es.json";
import localEnMessages from "./locales/en.json";

const language = window.navigator.language || navigator.browserLanguage;
ReactDOM.render(
  <IntlProvider locale={language} messages={language === "es-ES" ? localEsMessages : localEnMessages}>
    <Series 
    lang={language === "es-ES" ? "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/a467415350e87c13faf9c8e843ea2fd20df056f3/series-es.json" : "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/e2d16f7440d51cae06a9daf37b0b66818dd1fe31/series-en.json"} 
    errMsg = {language === "es-ES" ? "Error al cargar la imagen.":"Error while loading image."}
    />
  </IntlProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();