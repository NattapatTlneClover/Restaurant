const Table = require('../models/table');

function generateCredentialCode(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// GetAllTable
exports.getAllTables = async (req, res, next) => {
    try {
        const tables = await Table.findAll();
        res.json(tables);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// CreateTable
exports.createTable = async (req, res, next) => {
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        const { numberTable, chairQuantity } = req.body;

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const table = await Table.create({
            numberTable,
            chairQuantity,
            imageUrl
        });
        res.status(201).json(table);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ReserveTable
exports.reserveTable = async (req, res, next) => {
    try {

        const table = await Table.findByPk(req.params.id);

        if (!table) return res.status(404).json({ error: 'Table not found' });

        if (table.isReserved) {
            return res.status(400).json({ error: 'This table is already reserved' });
        }

        table.isReserved = true;
        table.reservedAt = new Date();
        table.credentialCode = generateCredentialCode();
        await table.save();

        res.json({ message: 'Table reserved', table });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UnreserveTable
exports.unreserveTable = async (req, res) => {
    try {
        const table = await Table.findByPk(req.params.id);
        if (!table) return res.status(404).json({ error: 'Table not found' });

        table.isReserved = false;
        table.credentialCode = null;
        table.reservedAt = null;
        await table.save();

        res.json({ message: 'Reservation cancelled', table });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UpdateTable
exports.updateTable = async (req, res, next) => {
    try {
        const tableId = req.params.id;

        const { numberTable, chairQuantity } = req.body;
        const imageFile = req.file;

        const tableItem = await Table.findByPk(tableId);
        if (!tableItem) {
            return res.status(404).json({ error: 'This Table Item not found' });
        }

        tableItem.numberTable = numberTable || tableItem.numberTable;
        tableItem.chairQuantity = chairQuantity || tableItem.chairQuantity;

        if (imageFile) {
            tableItem.imageUrl = `/uploads/${imageFile.filename}`;
        }

        await tableItem.save();

        res.json({ message: 'Table item updated successfully', tableItem });

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// DeleteTable
exports.deleteTable = async (req, res) => {
    try {
        const table = await Table.findByPk(req.params.id);
        if (!table) return res.status(404).json({ error: 'Table not found' });

        await table.destroy();
        res.json({ message: 'Table deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.loginWithCredential = async (req, res, next) => {
    try {
        const { credentialCode } = req.body;

        const table = await Table.findOne({
            where: { credentialCode, isReserved: true }
        });

        if (!table) {
            return res.status(401).json({ error: 'Invalid credential code or table not reserved' });
        }

        res.json({ message: 'Login successful', table });
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
}

exports.checkoutTable = async (req, res) => {
    try {
        const table = await Table.findByPk(req.params.id);
        if (!table) return res.status(404).json({ error: 'Table not found' });

        table.isReserved = false;
        table.credentialCode = null;
        table.reservedAt = null;
        await table.save();

        res.json({ message: 'Checkout success, table is now free', table });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

