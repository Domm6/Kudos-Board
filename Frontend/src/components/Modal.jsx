import { useState } from "react";
import "./Modal.css"


function Modal ({props, isOpen, onClose, addKudo}) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        kudo: "",
        image: "",
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
                    kudo: "",
                    image: "",
                    author: ""
                });
                onClose();
            })
            .catch(error => console.error('Error fetching Kudos:', error));

    }

    // add onChange functions to each of these inputs
    if(!isOpen) return null;
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="modal-close" onClick={onClose}>×</span>
                <form className="modal-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Title"
                        />
                        <select
                            name="kudo"
                            value={formData.kudo}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a Category</option>
                            <option value="Recent">Recent</option>
                            <option value="Inspiration">Inspiration</option>
                            <option value="Celebration">Celebration</option>
                            <option value="Thank You">Thank You</option>

                        </select>
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

export default Modal
