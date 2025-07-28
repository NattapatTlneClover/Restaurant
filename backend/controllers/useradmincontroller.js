require('dotenv').config();
const Admin = require('../models/user');
const RefreshToken = require('../models/refreshtoken');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;
const refreshSecretKey = process.env.JWT_REFRESH_SECRET;
const refreshTokenExpiry = 7 * 24 * 60 * 60 * 1000;

function generateAccessToken(admin) {
    return jwt.sign({ id: admin.id, username: admin.username }, secretKey, {
        expiresIn: '1h',
    });
}

function generateRefreshToken(admin) {
    return jwt.sign({ id: admin.id, username: admin.username }, refreshSecretKey, {
        expiresIn: '7d',
    });
}

exports.registerAdmin = async (req, res) => {
    try {
        const { username, password, full_name, role } = req.body;

        if (!username || !password || !full_name || !role) {
            return res.status(400).json({ error: 'ข้อมูลไม่ครบถ้วน' });
        }

        const existingAdmin = await Admin.findOne({ where: { username } });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const employee_code = 'EMP-' + uuidv4().split('-')[0].toUpperCase();
        const created_at = new Date();

        const newAdmin = await Admin.create({
            username,
            password: hashedPassword,
            full_name: full_name.trim(),
            role: role || 'admin',
            employee_code,
            created_at,
        });

        res.status(201).json({
            message: 'Admin created successfully',
            admin: {
                id: newAdmin.id,
                username: newAdmin.username,
                full_name: newAdmin.full_name,
                role: newAdmin.role,
                employee_code: newAdmin.employee_code,
                created_at: newAdmin.created_at,
            },
        });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ error: 'Failed to create admin' });
    }
};

exports.loginadmin = async (req, res, next) => {
    try {
        //check data in
        const { username, password } = req.body;

        console.log("Input username:", username);
        console.log("Input password:", password);

        if (!username || !password) {
            return res.status(400).json({ message: 'please put your username and password' })
        }

        //check username in database
        const admin = await Admin.findOne({ where: { username } });
        if (!admin) {
            return res.status(401).json({ message: 'No User' })
        }

        //check password ismatched
        const isMatchPassword = await bcrypt.compare(password, admin.password);
        console.log("Password match:", isMatchPassword);
        if (!isMatchPassword) {
            return res.status(401).json({ message: 'Password not matched' });
        }

        //when login destroy refreshtoken still remain in db before create new
        await RefreshToken.destroy({ where: { user_id: admin.id } });

        const accessToken = generateAccessToken(admin);
        const refreshToken = generateRefreshToken(admin);

        // save refresh Token in DB
        await RefreshToken.create({
            token: refreshToken,
            user_id: admin.id,
            expiryDate: new Date(Date.now() + refreshTokenExpiry),
        });

        // correct condition
        res.status(200).json({
            message: 'Login successful',
            token: accessToken,
            refreshToken: refreshToken,
            admin: {
                id: admin.id,
                full_name: admin.full_name,
                username: admin.username,
                employee_code: admin.employee_code
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        console.log("ENV CHECK:", process.env.JWT_SECRET, process.env.JWT_REFRESH_SECRET);
        res.status(500).json({ error: 'Failed to login' })
    }
}

exports.refreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token is required' });
    }

    try {
        // check db
        const storedToken = await RefreshToken.findOne({ where: { token: refreshToken } });
        if (!storedToken) {
            return res.status(403).json({ message: 'Refresh token is invalid' });
        }

        // check token
        jwt.verify(refreshToken, refreshSecretKey, (err, admin) => {
            if (err) {
                return res.status(403).json({ message: 'Refresh token is expired' });
            }

            // create new token
            const accessToken = generateAccessToken(admin);
            res.json({ token: accessToken });
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to refresh token' });
    }
};

exports.logout = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        await RefreshToken.destroy({ where: { token: refreshToken } });
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to logout' });
    }
};