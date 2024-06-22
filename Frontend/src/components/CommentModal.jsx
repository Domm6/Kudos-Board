import { useState, useEffect } from "react";
import "./CommentModal.css"

function CommentModal ({props, isOpen, onClose, gifUrl, cardId}) {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        if (isOpen) {
            fetch(`http://localhost:3000/cards/${cardId}/comments`)
                .then(response => response.json())
                .then(data => setComments(data))
                .catch(error => console.error('Error fetching comments:', error));
        }
    }, [isOpen, cardId]);

    const handleInputChange = (e) => {
        setCommentText(e.target.value)
    }

    const handleCommentPost = () => {
        const newComment = {
            text: commentText,
            author: "Anonymous"
        };
        fetch(`http://localhost:3000/cards/${cardId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
        .then(response => response.json())
        .then(data => {
            setComments([...comments, data]);
            setCommentText("");
        })
        .catch(error => console.error('Error posting comment:', error));
    }

    // add onChange functions to each of these inputs
    if(!isOpen) return null;
    return (
        <div className="comment-modal">
            <div className="comment-modal-content">
                <span className="comment-modal-close" onClick={onClose}>×</span>
                <div className="comment-body">
                    <div className="comment-left">
                        <img src={gifUrl || LOGO} alt="selected GIF" />
                    </div>
                    <div className="comment-right">
                        <div className="comments-display">
                            {comments.map((comment, index) => (
                                <p key={index}>{comment.text}</p>
                            ))}
                        </div>
                        <div className="comment-input">
                            <input type="text" placeholder="Post a comment..." value={commentText} onChange={handleInputChange}/>
                            <button type="button" onClick={handleCommentPost}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CommentModal
