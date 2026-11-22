import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb, Compass, Zap } from 'lucide-react';

const FOCUS_SLIDES = [
  {
    id: 1,
    tag: "FOCUS NOTES",
    icon: Compass,
    title: "Plan your day with purpose",
    description: "Organise your priorities and focus on what matters most. Break complex projects into 3 critical outcomes before starting deep execution.",
    actionText: "Focus on Top Priority",
    accentColor: "indigo"
  },
  {
    id: 2,
    tag: "DEEP WORK",
    icon: Zap,
    title: "Shield your uninterrupted flow",
    description: "Silence secondary notifications and batch routine communications. Dedicate 60–90 minute distraction-free focus blocks for complex problem solving.",
    actionText: "Set Focus Timer",
    accentColor: "amber"
  },
  {
    id: 3,
    tag: "DAILY REFLECTION",
    icon: Lightbulb,
    title: "Reflect and celebrate your progress",
    description: "Review accomplished milestones at day's close. Recognizing daily progress builds sustainable momentum and primes tomorrow's mental clarity.",
    actionText: "Review Completed Tasks",
    accentColor: "emerald"
  }
];

export default function FocusNotes({ onSlideAction }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const totalSlides = FOCUS_SLIDES.length;
  const currentSlide = FOCUS_SLIDES[currentSlideIndex];
  const IconComponent = currentSlide.icon;

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const handleSelectSlide = (index) => {
    setCurrentSlideIndex(index);
  };

  return (
    <section className="focus-notes-carousel" aria-label="Productivity Focus Notes Carousel">
      <div className={`focus-notes-card accent-${currentSlide.accentColor}`}>
        <div className="focus-notes-left">
          <div className="focus-notes-badge-row">
            <span className="focus-notes-badge">
              <IconComponent size={14} className="focus-badge-icon" />
              <span>{currentSlide.tag}</span>
            </span>
            <span className="focus-notes-counter" aria-live="polite">
              {currentSlideIndex + 1} OF {totalSlides}
            </span>
          </div>

          <h2 className="focus-notes-title">{currentSlide.title}</h2>
          <p className="focus-notes-description">{currentSlide.description}</p>
        </div>

        <div className="focus-notes-controls-column">
          {/* Circular previous & next buttons */}
          <div className="carousel-nav-buttons" role="group" aria-label="Carousel slide controls">
            <button
              type="button"
              className="carousel-btn prev-btn"
              onClick={handlePrev}
              aria-label={`Previous slide (current slide ${currentSlideIndex + 1} of ${totalSlides})`}
              title="Previous note"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="carousel-btn next-btn"
              onClick={handleNext}
              aria-label={`Next slide (current slide ${currentSlideIndex + 1} of ${totalSlides})`}
              title="Next note"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-indicators" role="tablist" aria-label="Slide indicators">
            {FOCUS_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={idx === currentSlideIndex}
                aria-label={`Jump to slide ${idx + 1}: ${slide.title}`}
                className={`indicator-dot ${idx === currentSlideIndex ? 'active' : ''}`}
                onClick={() => handleSelectSlide(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
