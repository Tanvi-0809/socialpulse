import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock,
  X,
  ExternalLink,
} from "lucide-react";

import { usePosts } from "../context/PostsContext";

import "../styles/Calendar.css";
import "../styles/CalendarEventModal.css";

function Calendar() {
  const navigate = useNavigate();

  // Get shared posts from React Context
  const { posts } = usePosts();

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());

  // Selected post for popup
  const [selectedPost, setSelectedPost] = useState(null);

  // Close popup when Escape is pressed
  useEffect(() => {
    if (!selectedPost) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedPost(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedPost]);

  // Current month and year
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Calendar calculations
  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Calendar navigation
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Find scheduled posts for a particular date
  const getPostsForDay = (day) => {
    const date = [
      year,
      String(month + 1).padStart(2, "0"),
      String(day).padStart(2, "0"),
    ].join("-");

    return posts.filter(
      (post) =>
        post.date === date &&
        post.status === "Scheduled"
    );
  };

  // Generate calendar days
  const calendarDays = [
    ...Array(firstDay).fill(null),

    ...Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    ),
  ];

  const today = new Date();

  // Navigate to Post Management
  const handleViewInPosts = () => {
    setSelectedPost(null);
    navigate("/posts");
  };

  return (
    <div className="page-content calendar-page">

      {/* PAGE HEADING */}

      <div className="calendar-page-heading">
        <div>
          <p className="eyebrow">CONTENT PLANNING</p>

          <h1>Content Calendar</h1>

          <p className="subtitle">
            Plan and visualize your upcoming social media posts.
          </p>
        </div>

        <div className="calendar-heading-icon">
          <CalendarDays size={25} />
        </div>
      </div>

      {/* CALENDAR CARD */}

      <div className="calendar-card">

        {/* MONTH NAVIGATION */}

        <div className="calendar-toolbar">
          <h2>{monthName}</h2>

          <div className="calendar-navigation">

            <button
              type="button"
              onClick={goToToday}
            >
              Today
            </button>

            <button
              type="button"
              onClick={previousMonth}
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>

          </div>
        </div>

        {/* CALENDAR GRID */}

        <div className="calendar-grid">

          {/* WEEKDAY HEADINGS */}

          {[
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ].map((day) => (
            <div
              className="calendar-weekday"
              key={day}
            >
              {day}
            </div>
          ))}

          {/* CALENDAR DATES */}

          {calendarDays.map((day, index) => {

            const dayPosts = day
              ? getPostsForDay(day)
              : [];

            const isToday =
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();

            return (
              <div
                key={index}
                className={`calendar-day ${
                  !day ? "calendar-empty" : ""
                } ${isToday ? "calendar-today" : ""}`}
              >

                {day && (
                  <>
                    <span className="calendar-day-number">
                      {day}
                    </span>

                    {/* SCHEDULED POSTS */}

                    <div className="calendar-day-posts">

                      {dayPosts.map((post) => (
                        <button
                          type="button"
                          className="calendar-post calendar-post-button"
                          key={post.id}
                          title={post.caption}
                          onClick={() => setSelectedPost(post)}
                        >
                          <Clock size={12} />

                          <span>
                            {post.caption}
                          </span>
                        </button>
                      ))}

                    </div>
                  </>
                )}

              </div>
            );
          })}

        </div>
      </div>

      {/* POST DETAILS POPUP */}

      {selectedPost && (
        <div
          className="calendar-modal-overlay"
          onMouseDown={() => setSelectedPost(null)}
        >
          <div
            className="calendar-event-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="calendar-event-title"
            onMouseDown={(event) => event.stopPropagation()}
          >

            {/* POPUP HEADER */}

            <div className="calendar-event-header">
              <div>
                <p className="eyebrow">
                  SCHEDULED CONTENT
                </p>

                <h2 id="calendar-event-title">
                  Post Details
                </h2>
              </div>

              <button
                type="button"
                className="calendar-event-close"
                onClick={() => setSelectedPost(null)}
                aria-label="Close post details"
              >
                <X size={20} />
              </button>
            </div>

            {/* POST CAPTION */}

            <div className="calendar-event-caption">
              <p>{selectedPost.caption}</p>
            </div>

            {/* POST INFORMATION */}

            <div className="calendar-event-info">

              <div className="calendar-event-info-row">
                <span>Platform</span>

                <strong>
                  {selectedPost.platform}
                </strong>
              </div>

              <div className="calendar-event-info-row">
                <span>Scheduled Date</span>

                <strong>
                  {selectedPost.date}
                </strong>
              </div>

              <div className="calendar-event-info-row">
                <span>Status</span>

                <span className="calendar-event-status">
                  {selectedPost.status}
                </span>
              </div>

            </div>

            {/* VIEW IN POSTS BUTTON */}

            <button
              type="button"
              className="calendar-view-post-btn"
              onClick={handleViewInPosts}
            >
              View in Posts
              <ExternalLink size={16} />
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Calendar;