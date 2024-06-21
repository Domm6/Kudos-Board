const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors');
router.use(cors());

router.get("/", async (req, res) => {
    const cards = await prisma.card.findMany()
    res.json(cards)
})

router.post("/", async (req, res) => {
    const { title, gifUrl, boardId, description, author } = req.body;
    const newCard = await prisma.card.create({
        data: {
            title: title,
            description: description,
            gifUrl: gifUrl,
            author: author,
            boardId
        }
      })
      res.json(newCard)
})

// update card like
router.put("/:cardId", async (req, res) => {
    const { cardId } = req.params
    const card = await prisma.card.findUnique({
        where: {id: parseInt(cardId)}
    });
    if (card) {
        const updatedCard = await prisma.card.update({
            where: { id: parseInt(cardId) },
            data: {
              title: req.body.title || card.title,
              gifUrl: req.body.gifUrl || card.gifUrl,
              boardId: req/body.boardId || card.boardId,
              likes: card.likes + 1
          }
        })
        res.json(updatedCard)
    } else {
        res.status(404).send("Card not found");
    }
})

// delete card
router.delete("/:cardId", async (req, res) => {
    const { cardId } = req.params
    const deletedCard = await prisma.card.delete({
        where: { id: parseInt(cardId) },
    });
    if (deletedCard) {
        res.status(204).send();
    } else {
        res.status(404).send('Card not found');
    }
})

// like card
router.patch("/:cardId/like", async (req, res) => {
    try{
        const cardId = req.params.cardId
        console.log(cardId)
        const updatedCard = await prisma.card.update({
          where: { id: parseInt(cardId) },
          data: {
            likes: {increment: 1}
          }
        })
        res.json(updatedCard)
    } catch (error) {
        console.error("Failed to like", error)
        res.status(500).send("Error updating likes")
    }
})

module.exports = router