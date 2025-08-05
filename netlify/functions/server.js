exports.handler = async (event, context) => {
  const { httpMethod, path, body } = event;
  
  // Health check
  if (httpMethod === 'GET' && path === '/api/health') {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        status: 'healthy',
        timestamp: new Date().toISOString()
      })
    };
  }
  
  // Admin login
  if (httpMethod === 'POST' && path === '/api/admin/login') {
    const data = JSON.parse(body || '{}');
    const { username, password } = data;
    
    if (username === 'admin' && password === '1111') {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: true,
          token: 'admin-token-' + Date.now(),
          user: { id: 'admin', username: 'admin', role: 'admin' }
        })
      };
    } else {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Invalid credentials' })
      };
    }
  }
  
  return {
    statusCode: 404,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: 'Not found' })
  };
};