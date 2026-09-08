import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../db/index.js';
import { generateToken, authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';
import { createAuditLog } from '../middleware/audit.js';

const router = Router();

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email or username is required' });
    }

    let userQuery = 'SELECT * FROM users WHERE email = $1';
    const params: any[] = [email.toLowerCase().trim()];

    if (role) {
      userQuery += ' AND role = $2';
      params.push(role);
    }

    const userResult = await query(userQuery, params);
    if (userResult.rowCount === 0) {
      return res.status(401).json({ error: 'Invalid credentials or user not found' });
    }

    const user = userResult.rows[0];

    // For demo convenience, allow 'password123' or real bcrypt check
    let validPassword = false;
    if (password) {
      validPassword = await bcrypt.compare(password, user.password_hash) || password === 'password123';
    } else {
      validPassword = true; // demo convenience if just selecting role
    }

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department_id: user.department_id,
      designation: user.designation,
    });

    // Check if user has associated startup
    let startup = null;
    if (user.role === 'startup') {
      const startupRes = await query('SELECT * FROM startups WHERE user_id = $1', [user.id]);
      if (startupRes.rowCount > 0) {
        startup = startupRes.rows[0];
      }
    }

    await createAuditLog(user.id, 'USER_LOGIN', 'USER', user.id, `User logged in as ${user.role}`);

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department_id: user.department_id,
        designation: user.designation,
        phone: user.phone,
        avatar_url: user.avatar_url,
      },
      startup,
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error during login' });
  }
});

// Quick Switch Demo Role (allows instant switching between Government, Startup, Evaluator, Admin)
router.post('/switch-role', async (req: Request, res: Response) => {
  try {
    const { role } = req.body;
    const roleEmailMap: Record<string, string> = {
      government: 'officer@maharashtra.gov.in',
      startup: 'greentech@startup.in',
      evaluator: 'evaluator@maha.gov.in',
      admin: 'admin@mahinnovate.gov.in',
    };

    const targetEmail = roleEmailMap[role] || 'officer@maharashtra.gov.in';
    const userRes = await query('SELECT * FROM users WHERE email = $1', [targetEmail]);
    if (userRes.rowCount === 0) {
      return res.status(404).json({ error: 'User for role not found' });
    }

    const user = userRes.rows[0];
    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department_id: user.department_id,
      designation: user.designation,
    });

    let startup = null;
    if (user.role === 'startup') {
      const startupRes = await query('SELECT * FROM startups WHERE user_id = $1', [user.id]);
      if (startupRes.rowCount > 0) {
        startup = startupRes.rows[0];
      }
    }

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department_id: user.department_id,
        designation: user.designation,
      },
      startup,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to switch role' });
  }
});

// Register Startup or Officer
router.post('/register', async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      role = 'startup',
      company_name,
      industry,
      technologies,
      dpiit_number,
      website,
      about,
      city = 'Mumbai',
    } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existing = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase().trim()]);
    if (existing.rowCount > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userInsert = await query(
      `INSERT INTO users (name, email, password_hash, role, designation)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email.toLowerCase().trim(), passwordHash, role, role === 'startup' ? 'Founder & CEO' : 'Department Officer']
    );
    const newUser = userInsert.rows[0];

    let startup = null;
    if (role === 'startup') {
      const techArray = Array.isArray(technologies) ? technologies : (technologies ? [technologies] : ['AI', 'IoT']);
      const startupInsert = await query(
        `INSERT INTO startups (user_id, company_name, industry, technologies, dpiit_number, website, about, city, verification_status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'VERIFIED') RETURNING *`,
        [newUser.id, company_name || `${name}'s Innovations`, industry || 'CleanTech', techArray, dpiit_number || 'DIPP99999', website || '', about || '', city]
      );
      startup = startupInsert.rows[0];
    }

    const token = generateToken({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department_id: newUser.department_id,
      designation: newUser.designation,
    });

    await createAuditLog(newUser.id, 'USER_REGISTER', 'USER', newUser.id, `New user registered as ${role}`);

    return res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      startup,
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: 'Registration failed' });
  }
});

// Current User Profile
router.get('/me', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userRes = await query('SELECT id, name, email, role, designation, department_id, phone, avatar_url FROM users WHERE id = $1', [req.user!.id]);
    if (userRes.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userRes.rows[0];
    let startup = null;
    if (user.role === 'startup') {
      const startupRes = await query('SELECT * FROM startups WHERE user_id = $1', [user.id]);
      if (startupRes.rowCount > 0) {
        startup = startupRes.rows[0];
      }
    }

    return res.json({ user, startup });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

export default router;
