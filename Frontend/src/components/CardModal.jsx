import { useState } from "react";
import "./CardModal.css"


function CardModal ({props, isOpen, onClose, addKudo}) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        kudo: "",
        gif: "",
        author: ""
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/boards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                addKudo(data)
                setFormData({
                    title: "",
                    description: "",
                    gif: "",
                    image: "",
                    author: ""
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
                            value={formData.gif}
                            onChange={handleChange}
                            required
                            placeholder="gif"
                        />
                        <button>Search</button>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            placeholder="Author (Optional)"
                        />
                        <button type="submit">Submit</button>
                </form>
            </div>
        </div>

    )
}

export default CardModal
