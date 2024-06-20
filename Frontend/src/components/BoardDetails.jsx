import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import "./BoardDetails.css";
import BoardCard from './BoardCard';

const LOGO = "https://i.vimeocdn.com/video/557834687-b8d55eb049d1702b589b4ad62c31fe18ac0f44f0316546d6aef20c61be70435c-d_640?f=webp";

function BoardDetails () {
    const {boardId} = useParams();
    const [cards, setCards] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/boards/${boardId}`)
          .then(response => response.json())
          .then(data => {
            if (data && data.cards) {
                setCards(data.cards);
            } else {
                setCards([]);  
            }
        })
          .catch(error => console.error('Error fetching cards:', error));
          console.log(boardId, cards)
    }, [boardId]);

    const deleteCard = (cardId) => {
        fetch(`http://localhost:3000/cards/${cardId}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (response.ok) {
            setCard(prevCards => prevCards.filter(card => card.id !== cardId));
          }
        })
        .catch(error => console.error('Error deleting card:', error));
      }

    return (
        <>
        <div className='header-board'>
            <div className="header">
                <div className='header-logo'>
                    <img src={LOGO} alt="" />
                </div>
                <div className='header-create'>
                    <button type="submit" className='create-button'>Create A New Card</button>
                </div>
            </div>
        </div>
        <div className="board-details">
            {cards.map(card => (
                <BoardCard deleteCard={() => deleteCard(card.id)} key={card.id} title={card.title} />
            ))}
        </div>
        </>
    )
}

export default BoardDetails