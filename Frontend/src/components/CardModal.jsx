import { useState } from "react";
import "./CardModal.css"


function CardModal ({props, isOpen, onClose, addCard, boardId}) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        gifUrl: "",
        author: ""
    })

    const [searchTerm, setSearchTerm] = useState("");
    const [gifs, setGifs] = useState([]);
    const API_KEY = 'LOVvDZw8dwqMxR4ddeoRdwA6Bt7wGbwK';

    const fetchGifs = () => {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=6`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setGifs(data.data);
            })
            .catch(error => console.error('Error fetching GIFs:', error));
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.gifUrl) {
            setSubmitAttempted(true);
            return;
        }
        const cardData = {
            ...formData,
            boardId: parseInt(boardId, 10)
        };

        fetch('http://localhost:3000/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                addCard(data)
                setFormData({
                    title: "",
                    description: "",
                    gifUrl: "",
                    author: "",
                });
                onClose();
            })
            .catch(error => console.error('Error fetching cards:', error));

    }

    // add onChange functions to each of these inputs
    if(!isOpen) return null;
    return (
        <div className="card-modal">
            <div className="card-modal-content">
                <span className="card-modal-close" onClick={onClose}>×</span>
                <form className="card-modal-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Title"
                        />
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            placeholder="description"
                        />
                        <input
                            type="text"
                            name="gif"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            required
                            placeholder="gif"
                        />
                        <button type="button" onClick={fetchGifs}>Search</button>
                        <div className="card-modal-gif">
                            {gifs.map(gif => (
                                <img
                                    key={gif.id}
                                    src={gif.images.fixed_height_small.url}
                                    alt={gif.title}
                                    onClick={() => setFormData({ ...formData, gifUrl: gif.images.fixed_height.url })}
                                    required
                                />
                            ))}
                        </div>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            placeholder="Author (Optional)"
                        />
                        <button type="submit" disabled={!formData.gifUrl}>Submit</button>
                </form>
            </div>
        </div>

    )
}

export default CardModal
