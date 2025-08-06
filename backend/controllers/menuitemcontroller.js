const MenuItem = require('../models/menuitem');
const { validationResult } = require('express-validator');
const { getIO } = require('../config/socket');

// GetAllMenuItems
exports.getAllMenuItems = async (req, res, next) => {
    try {
        const menuItems = await MenuItem.findAll();
        res.json(menuItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// CreateNewMenuItem
exports.createNewMenuItem = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description, price, category, isAvailable, isSignature } = req.body;

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const menuItem = await MenuItem.create({
            name,
            description,
            price,
            category,
            imageUrl,
            isAvailable,
            isSignature
        });
        res.status(201).json(menuItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// UpdateMenuItem 
exports.updateMenuitem = async (req, res, next) => {
    try {
        const menuItemId = req.params.id;
        const { name, description, price, category, isAvailable, isSignature } = req.body;
        const imageFile = req.file;

        const menuItem = await MenuItem.findByPk(menuItemId);
        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        menuItem.name = name || menuItem.name;
        menuItem.description = description || menuItem.description;
        menuItem.price = price || menuItem.price;
        menuItem.category = category || menuItem.category;
        menuItem.isAvailable = isAvailable !== undefined ? isAvailable : menuItem.isAvailable;
        menuItem.isSignature = isSignature !== undefined ? isSignature : menuItem.isSignature;  

        if (imageFile) {
            menuItem.imageUrl = `/uploads/${imageFile.filename}`;
            menuItem.updatedAt = new Date();
        }
        await menuItem.save();

        // ดึงข้อมูลล่าสุด
        const updatedMenuItem = await MenuItem.findByPk(menuItemId);
        updatedMenuItem.dataValues.updatedAt = new Date(updatedMenuItem.updatedAt).getTime();

        console.log('Updated menu item updatedAt timestamp:', updatedMenuItem.dataValues.updatedAt);

        const io = getIO();
        io.emit('menuUpdated', updatedMenuItem);

        // ส่งข้อมูลอัปเดตล่าสุดกลับ
        res.json({ message: 'Menu item updated successfully', menuItem: updatedMenuItem });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DeleteTable
exports.deleteMenuItem = async (req, res, next) => {
    try {
        const menuItem = await MenuItem.findByPk(req.params.id);
        if (!menuItem) return res.status(404).json({ error: 'menuItem not found' });

        await menuItem.destroy();
        res.json({ message: 'menuItem deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};