import './style.css'

import Transformer from './jsx_transformer.ts'
import App from "./App";
import { activeTheatre } from './theatreProps.ts';
const root = document.querySelector<HTMLDivElement>('#app');

root?.appendChild(App());
activeTheatre();