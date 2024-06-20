const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors')
const express = require('express')

const app = express()
app.use(express.json())
app.use(cors());
const PORT = 3000

// get baords
app.get('/boards', async (req,res) => {
    const board = await prisma.board.findMany()
    res.status(200).json(board);
})

// get specific board
app.get('/boards/:id', async (req, res) => {
    const { id } = req.params;
    const board = await prisma.board.findUnique({
        where: { id: parseInt(id) },
    });
    res.status(200).json(board); // Corrected variable name here
});

// post board
app.post('/boards', async (req, res) => {
    const { title, imageUrl, cards, kudo } = req.body;
    const newBoard = await prisma.board.create({
      data: {
        title,
        imageUrl,
        cards,
        kudo
      }
    })
    res.status(201).json(newBoard);
});

// delete board
app.delete("/boards/:id", async (req, res) => {
    const { id } = req.params
    const deletedBoard = await prisma.board.delete({
        where: { id: parseInt(id) },
    });
    if (deletedBoard) {
        res.status(204).send();
    } else {
        res.status(404).send('Board not found');
    }
})

// run port
app.listen(PORT, () => {
    console.log(`server is runnong on port:${PORT}`)
})