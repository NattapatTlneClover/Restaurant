const Table = require('../models/table');

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
        const { numberTable, chairQuantity } = req.body;
        const table = await Table.create({ numberTable, chairQuantity });
        res.status(201).json(table);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ReserveTable
exports.reserveTable = async (req, res,next) => {
    try {
        const table = await Table.findByPk(req.params.id);
        if (!table) return res.status(404).json({ error: 'Table not found' });

        table.isReserved = true;
        table.reservedAt = new Date();
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
        table.reservedAt = null;
        await table.save();

        res.json({ message: 'Reservation cancelled', table });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

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
