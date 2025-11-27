const { admin_login } = require('../../models/admin_login_model');
const jwt             = require('jsonwebtoken');
const bcrypt          = require('bcrypt');

exports.login = async (req, res) => {
  const { user_name, password } = req.body;

  try
  {
    const user = await admin_login.userExists(user_name);

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const roles = await admin_login.getUserRoles(user.user_id);
        const role_id = roles.length > 0 ? roles[0].role_id : null; // Get the first role_id

        // Generate JWT token
        const token = jwt.sign({ user_id: user.user_id, roles: roles.map(r => r.role_name) }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });


        return res.json({
            token,
            roles: roles.map(r => r.role_name),
            user_id: user.user_id,
            role_id: role_id,
            person_id:user.person_id,
            organization_id:user.organization_id
        });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
