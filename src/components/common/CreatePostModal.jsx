import { useState } from "react";
import { X, CalendarDays, Send, FileText } from "lucide-react";
import "../../styles/CreatePostModal.css";

function CreatePostModal({ onClose, onSave }) {
  const [caption, setCaption] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Scheduled");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!caption.trim()) {
      setError("Please enter a caption.");
      return;
    }

    if (status === "Scheduled" && !date) {
      setError("Please select a publishing date.");
      return;
    }

    const today = new Date();
    const localToday = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    if (status === "Scheduled" && date < localToday) {
      setError("Please select today or a future date.");
      return;
    }

    onSave({
      id: Date.now(),
      caption: caption.trim(),
      platform,
      date: date || localToday,
      status,
      likes: 0,
      comments: 0,
      shares: 0,
      reach: 0,
    });
  };

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="create-post-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-post-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">CONTENT CREATION</p>
            <h2 id="create-post-title">Create New Post</h2>
            <p>Plan your next social media update.</p>
          </div>

          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <label htmlFor="post-caption">Post Caption</label>

            <textarea
              id="post-caption"
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
                setError("");
              }}
              placeholder="What would you like to share?"
              rows={5}
              maxLength={500}
            />

            <span className="character-count">
              {caption.length}/500 characters
            </span>
          </div>

          <div className="modal-field">
            <label htmlFor="post-platform">Platform</label>

            <select
              id="post-platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Twitter">Twitter</option>
            </select>
          </div>

          <div className="modal-field">
            <label htmlFor="post-status">Post Status</label>

            <select
              id="post-status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setError("");
              }}
            >
              <option value="Scheduled">Schedule Post</option>
              <option value="Draft">Save as Draft</option>
            </select>
          </div>

          <div className="modal-field">
            <label htmlFor="post-date">
              <CalendarDays size={16} />
              {status === "Scheduled"
                ? "Publishing Date"
                : "Planned Date (Optional)"}
            </label>

            <input
              id="post-date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setError("");
              }}
            />
          </div>

          {error && <p className="modal-error">{error}</p>}

          <div className="modal-actions">
            <button
              type="button"
              className="modal-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="modal-save-btn">
              {status === "Draft" ? (
                <FileText size={17} />
              ) : (
                <Send size={17} />
              )}

              {status === "Draft"
                ? "Save Draft"
                : "Schedule Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePostModal;