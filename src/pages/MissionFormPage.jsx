"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/missionForm.css";

const MissionFormPage = () => {
  const [formData, setFormData] = useState({
    missionTitle: "",
    shortDescription: "",
    date: "",
    time: "",
    place: "",
    latitude: "",
    longitude: "",
    fullDescription: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // ✅ Added

  const validateForm = () => {
    const newErrors = {};

    if (!formData.missionTitle.trim()) {
      newErrors.missionTitle = "Mission title is required";
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.place.trim()) {
      newErrors.place = "Location is required";
    }
    if (!formData.latitude) {
      newErrors.latitude = "Latitude is required";
    }
    if (!formData.longitude) {
      newErrors.longitude = "Longitude is required";
    }
    if (!formData.fullDescription.trim()) {
      newErrors.fullDescription = "Full description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleInputChange("image", file);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/missions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          missionTitle: formData.missionTitle,
          shortDescription: formData.shortDescription,
          date: formData.date,
          time: formData.time,
          place: formData.place,
          fullDescription: formData.fullDescription,
          imageUrl: formData.image ? formData.image.name : null,
          latitude: formData.latitude,
          longitude: formData.longitude,
        }),
      });

      if (!response.ok) throw new Error("Failed to save mission");

      setShowSuccessModal(true); // ✅ Show success modal instead of alert

      setFormData({
        missionTitle: "",
        shortDescription: "",
        date: "",
        time: "",
        place: "",
        fullDescription: "",
        latitude: "",
        longitude: "",
        image: null,
      });

      const fileInput = document.getElementById("image-upload");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Error submitting mission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    navigate("/all-missions"); // ✅ Navigate after closing modal
  };

  return (
    <div className="mission-form-container bg-[#151414] min-h-screen pt-24 relative">
      <img
        src="/images/BackgroundLogo.png"
        alt="Background Logo"
        className="fixed left-1/2 top-1/2 w-[500px] opacity-70 -translate-x-1/2 -translate-y-1/2 z-0"
      />
      <img
        src="/images/web2.png"
        className="fixed top-0 left-0 w-[250px] opacity-15 z-0"
        alt="web-top-left"
      />
      <img
        src="/images/web1.png"
        className="fixed top-0 right-0 w-[180px] opacity-10 z-0 pointer-events-none"
        alt="web-top-right"
      />

      <div className="form-header relative z-10">
        <div className="header-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
        </div>
        <div className="header-content">
          <h1 className="main-title">New Mission Entry</h1>
          <p className="subtitle">Document your web-slinging adventures</p>
        </div>
      </div>

      <div className="form-wrapper relative z-10">
        <div className="form-card">
          <div className="card-header">
            <div className="card-icon">M</div>
            <h2>Mission Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="mission-form">
            {/* Mission Title */}
            <div className="form-group">
              <label htmlFor="missionTitle" className="form-label">
                <span className="label-icon">📝</span>
                Mission Title *
              </label>
              <input
                type="text"
                id="missionTitle"
                value={formData.missionTitle}
                onChange={(e) =>
                  handleInputChange("missionTitle", e.target.value)
                }
                placeholder="e.g., Night Patrol"
                className={`form-input ${errors.missionTitle ? "error" : ""}`}
              />
              {errors.missionTitle && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {errors.missionTitle}
                </div>
              )}
            </div>

            {/* Short Description */}
            <div className="form-group">
              <label htmlFor="shortDescription" className="form-label">
                <span className="label-icon">📄</span>
                Short Description *
              </label>
              <input
                type="text"
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) =>
                  handleInputChange("shortDescription", e.target.value)
                }
                placeholder="Brief mission summary (1-2 lines)"
                className={`form-input ${
                  errors.shortDescription ? "error" : ""
                }`}
              />
              {errors.shortDescription && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {errors.shortDescription}
                </div>
              )}
            </div>

            {/* Date and Time */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date" className="form-label">
                  <span className="label-icon">📅</span>
                  Date *
                </label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className={`form-input ${errors.date ? "error" : ""}`}
                />
                {errors.date && (
                  <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    {errors.date}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="time" className="form-label">
                  <span className="label-icon">🕐</span>
                  Time (Optional)
                </label>
                <input
                  type="time"
                  id="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            {/* Place */}
            <div className="form-group">
              <label htmlFor="place" className="form-label">
                <span className="label-icon">📍</span>
                Location *
              </label>
              <input
                type="text"
                id="place"
                value={formData.place}
                onChange={(e) => handleInputChange("place", e.target.value)}
                placeholder="e.g., Queens Rooftop"
                className={`form-input ${errors.place ? "error" : ""}`}
              />
              {errors.place && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {errors.place}
                </div>
              )}
            </div>

            {/* Latitude */}
            <div className="form-group">
              <label htmlFor="latitude" className="form-label">
                <span className="label-icon">📍</span>
                Latitude *
              </label>
              <input
                type="text"
                id="latitude"
                value={formData.latitude}
                onChange={(e) => handleInputChange("latitude", e.target.value)}
                placeholder="e.g., 40.7128"
                className={`form-input ${errors.latitude ? "error" : ""}`}
              />
              {errors.latitude && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {errors.latitude}
                </div>
              )}
            </div>

            {/* Longitude */}
            <div className="form-group">
              <label htmlFor="longitude" className="form-label">
                <span className="label-icon">📍</span>
                Longitude *
              </label>
              <input
                type="text"
                id="longitude"
                value={formData.longitude}
                onChange={(e) => handleInputChange("longitude", e.target.value)}
                placeholder="e.g., -74.0060"
                className={`form-input ${errors.longitude ? "error" : ""}`}
              />
              {errors.longitude && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {errors.longitude}
                </div>
              )}
            </div>

            {/* Full Description */}
            <div className="form-group">
              <label htmlFor="fullDescription" className="form-label">
                <span className="label-icon">📋</span>
                Full Mission Report *
              </label>
              <textarea
                id="fullDescription"
                value={formData.fullDescription}
                onChange={(e) =>
                  handleInputChange("fullDescription", e.target.value)
                }
                placeholder="Detailed mission story and outcomes..."
                rows="6"
                className={`form-textarea ${
                  errors.fullDescription ? "error" : ""
                }`}
              />
              {errors.fullDescription && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {errors.fullDescription}
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label htmlFor="image-upload" className="form-label">
                <span className="label-icon">📷</span>
                Mission Photo (Optional)
              </label>
              <div className="file-upload-container">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <label htmlFor="image-upload" className="file-upload-label">
                  <div className="upload-icon">📤</div>
                  <span className="upload-text">
                    {formData.image
                      ? formData.image.name
                      : "Click to upload mission photo"}
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-submit">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`submit-button ${isSubmitting ? "loading" : ""}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner"></div>
                    Logging Mission...
                  </>
                ) : (
                  <>
                    <span className="button-icon">✅</span>
                    Log Mission
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ✅ Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">✅</div>
            <h3 className="modal-title">Mission Logged Successfully!</h3>
            <p className="modal-message">
              Your mission has been added to the Web-Crawler Database. Great
              work, Spider-Man!
            </p>
            <button onClick={closeModal} className="modal-close-button">
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionFormPage;
