import { useState } from "react";
import "./Modal.css"


function Modal ({props, isOpen, onClose}) {

    // add onChange functions to each of these inputs
    if(!isOpen) return null;
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="modal-close" onClick={onClose}>×</span>
                <form className="modal-form">
                        <input
                            type="text"
                            name="title"
                            value=''
                            // onChange={handleChange}
                            required
                            placeholder="Title"
                        />
                        <textarea
                            name="description"
                            value=""
                            // onChange={handleChange}
                            required
                            placeholder="Description"
                        />
                        <select
                            name="category"
                            value=""
                            // value={formData.category}
                            required
                        >
                            <option value="">Select a Category</option>
                            <option value="inpiration">Inspiration</option>
                            <option value="celebration">Celebration</option>
                            <option value="recent">Recent</option>
                            <option value="thankyou">Thank You</option>

                        </select>
                        <input
                            type="file"
                            name="image"
                            // onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="author"
                            value=""
                            // onChange={handleChange}
                            placeholder="Author (Optional)"
                        />
                        <button type="submit">Submit</button>
                </form>
            </div>
        </div>

    )
}

export default Modal
