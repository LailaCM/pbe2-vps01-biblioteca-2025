const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const emprestimo = await prisma.emprestimo.create({
            data: {
                ...req.body,
                devolucao: null
            }
        });
        res.status(201).json(emprestimo);
    } catch (error) {
        if (error.code == 'P2003')
            res.status(404).json({ erro: error.meta.field_name + ' não encontrada(o)' });
        else
            res.status(400).json(error);
    }
};

const read = async (req, res) => {
    const emprestimo = await prisma.emprestimo.findMany();
    res.status(200).json(emprestimo);
};

const update = async (req, res) => {
    try {
        const { devolucao } = req.body;
        let multa = null;
        if (devolucao) {
            const emprestimo = await prisma.emprestimo.findUnique({
                where: {
                    id: Number(req.params.id)
                }
            });

            if (!emprestimo) {
                return res.status(404).json({ error: "Emprestimo não encontrado" });
            }

            const retiradaDate = new Date(emprestimo.retirada);
            const devolucaoDate = new Date(devolucao);

            const difEmTempo = devolucaoDate.getTime() - retiradaDate.getTime();
            const difEmDias = Math.floor(difEmTempo / (1000 * 60 * 60 * 24)); 
            if (difEmDias > 3) {
                multa = (difEmDias - 3) * 10.0; 
            }
            else{
                multa=0;
            }
        }
        const atualizarEmprestimo = await prisma.emprestimo.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                ...req.body,
                multa: multa
            }
        });

        return res.status(202).json(atualizarEmprestimo);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        await prisma.emprestimo.delete({
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