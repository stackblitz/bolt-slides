import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

/* Dev-only slide review (R): GET/POST /__review?deck=<id> reads/writes
   src/decks/<id>/revue.json, versioned next to the deck it reviews. */
function review(): Plugin {
  return {
    name: 'deck-review',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__review', (req, res) => {
        const deck = new URL(req.url ?? '', 'http://x').searchParams.get('deck') ?? '';
        const dir = path.resolve(__dirname, 'src/decks', deck);
        if (!/^[a-z0-9-]+$/.test(deck) || !fs.existsSync(dir)) {
          res.statusCode = 400;
          return res.end('unknown deck');
        }
        const file = path.join(dir, 'revue.json');
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (c) => (body += c));
          req.on('end', () => {
            try {
              fs.writeFileSync(file, JSON.stringify(JSON.parse(body), null, 2) + '\n');
              res.end('ok');
            } catch {
              res.statusCode = 400;
              res.end('invalid json');
            }
          });
          return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(fs.existsSync(file) ? fs.readFileSync(file) : '{}');
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), review()],
});
