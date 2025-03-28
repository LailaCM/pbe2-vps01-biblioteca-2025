const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const livros = await prisma.livros.create({
            data: req.body
        });
        return res.status(201).json(livros);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    const livros = await prisma.livros.findMany();
    return res.json(livros);
}

const update = async (req, res) => {
    try {
        const livros = await prisma.livros.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });
        return res.status(202).json(livros);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.livros.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}


module.exports = {
    create,
    read,
    update,
    remove
};