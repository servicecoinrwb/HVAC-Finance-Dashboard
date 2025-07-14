import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8000;

const plaidConfig = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(plaidConfig);

app.post('/api/create_link_token', async (req, res) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: 'user-id', // A unique ID for the end user
      },
      client_name: 'HVAC Finance Dashboard',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error creating link token:', error.response.data);
    res.status(500).json({ error: 'Failed to create link token' });
  }
});

app.post('/api/exchange_public_token', async (req, res) => {
  const { public_token } = req.body;
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: public_token,
    });
    // In a real application, you would securely store this access_token
    // in your database, associated with the user.
    const accessToken = response.data.access_token;
    console.log('Access Token:', accessToken);
    console.log('Item ID:', response.data.item_id);
    res.json({ message: 'Public token exchanged successfully.' });
  } catch (error) {
    console.error('Error exchanging public token:', error.response.data);
    res.status(500).json({ error: 'Failed to exchange public token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
