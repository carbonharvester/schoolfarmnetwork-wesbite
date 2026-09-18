import { hydrateRoot,createRoot } from 'react-dom/client';
import App from './App';
const root=document.getElementById('root')!;
if(root.querySelector('main')) hydrateRoot(root,<App/>); else createRoot(root).render(<App/>);
