import express from 'express';
import axios from 'axios';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/notes', authenticateAdmin, async (req, res) => {
  try {
    const response = await axios.get(`${process.env.USER_BACKEND_URL}/admin/notes`, {
      headers: {
        'Authorization': req.headers.authorization,
        'X-Admin-Request': 'true'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
});

export default router;