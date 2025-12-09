import type { Plugin } from 'vite';

/**
 * Vite plugin to log RSVP form submissions to the terminal
 */
export function rsvpLogger(): Plugin {
  return {
    name: 'rsvp-logger',
    configureServer(server) {
      // Log when server starts
      console.log('\n📋 RSVP Logger: Watching for form submissions...\n');
      
      // Intercept requests to log RSVP submissions
      server.middlewares.use((req, res, next) => {
        // Check if this is a POST request to the log endpoint
        if (req.method === 'POST' && req.url === '/api/rsvp-log') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const { message, data, timestamp } = JSON.parse(body);
              
              // Format the log message nicely
              const time = new Date(timestamp).toLocaleTimeString();
              console.log(`\n[${time}] ${message}`);
              
              if (data) {
                if (typeof data === 'object') {
                  // Pretty print objects
                  for (const [key, value] of Object.entries(data)) {
                    if (typeof value === 'object') {
                      console.log(`   ${key}:`, JSON.stringify(value, null, 2).split('\n').join('\n   '));
                    } else {
                      console.log(`   ${key}:`, value);
                    }
                  }
                } else {
                  console.log(`   Data:`, data);
                }
              }
              console.log(''); // Empty line for readability
            } catch (e) {
              console.log('📋 RSVP Log (raw):', body);
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ logged: true }));
          });
        } else {
          next();
        }
      });
    },
  };
}

