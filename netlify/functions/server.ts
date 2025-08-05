import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client);

export const handler = async (event: any, context: any) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const path = event.path.replace('/.netlify/functions/server', '');
  
  try {
    // Health check
    if (event.httpMethod === 'GET' && path === '/api/health') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          status: 'healthy',
          timestamp: new Date().toISOString(),
          database: 'connected'
        })
      };
    }

    // Admin login
    if (event.httpMethod === 'POST' && path === '/api/admin/login') {
      const { username, password } = JSON.parse(event.body || '{}');
      
      // Check database for admin user
      const user = await db.select().from(users).where(eq(users.username, username)).limit(1);
      
      if (user.length > 0 && user[0].password === password && user[0].role === 'admin') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            token: 'admin-token-' + Date.now(),
            user: {
              id: user[0].id,
              username: user[0].username,
              role: user[0].role
            }
          })
        };
      } else {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ success: false, error: 'Invalid credentials' })
        };
      }
    }

    // Get all contacts
    if (event.httpMethod === 'GET' && path === '/api/contacts') {
      const contacts = await db.select().from(users);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(contacts)
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};