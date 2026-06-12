import React, { useState, useRef, useEffect } from 'react';
import { Share2, Facebook, Twitter, Link } from 'lucide-react';
import './ShareButton.css';

const ShareButton = ({ title, text, url }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const shareData = {
    title: title || 'NextRoute',
    text: text || 'Check this out on NextRoute!',
    url: url || window.location.href,
  };

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Error sharing", err);
        }
      }
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
    alert("Copied to clipboard!");
    setShowDropdown(false);
  };

  const getWhatsappUrl = () => `https://api.whatsapp.com/send?text=${encodeURIComponent(shareData.text + " " + shareData.url)}`;
  const getFacebookUrl = () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
  const getTwitterUrl = () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;

  return (
    <div className="share-container" ref={dropdownRef}>
      <button className="share-trigger-btn" onClick={handleShareClick} aria-label="Share" type="button">
        <Share2 size={18} />
        <span className="ms-2">Share</span>
      </button>

      {showDropdown && (
        <div className="share-dropdown shadow-lg">
          <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer" className="share-option whatsapp">
            <span className="share-icon-placeholder">💬</span>
            <span>WhatsApp</span>
          </a>
          <a href={getFacebookUrl()} target="_blank" rel="noopener noreferrer" className="share-option facebook">
            <Facebook size={16} />
            <span>Facebook</span>
          </a>
          <a href={getTwitterUrl()} target="_blank" rel="noopener noreferrer" className="share-option twitter">
            <Twitter size={16} />
            <span>Twitter</span>
          </a>
          <button onClick={copyToClipboard} className="share-option copy" type="button">
            <Link size={16} />
            <span>Copy Link</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
