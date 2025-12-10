import React from "react";
import "./About.css";

const About = () => {
  return (
<div>
  <h1 className="heading">ABOUT US</h1>
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-header">1. What Is NEXTROUTE ?</h1>
        <p className="about-text">
          More Than Just a Travel Blog "Welcome to NEXTROUTE. Think of this
          platform as your digital compass in a chaotic world of travel advice.
          While Instagram shows you the 'highlight reel,' this website is built
          to show you the blueprint. This is a comprehensive travel resource
          dedicated to dissecting destinations, reviewing gear, and providing
          the raw, logistical details that other guides leave out. Whether you
          are planning a weekend getaway or a six-month expedition, this is your
          central hub for reliable, on-the-ground information."
        </p>
      </div>

      <div className="about-content">
        <h1 className="about-header">2. Our Mission</h1>
        <p className="about-text">
          Why We Are Here "The goal of NEXTROUTE is simple: To bridge the gap
          between dreaming about a trip and actually booking the ticket. I
          realized that too many people stay home because travel feels too
          expensive, too dangerous, or too complicated to plan. My mission is to
          dismantle those barriers. I want to provide you with: Clarity:
          Itineraries that actually work in the real world. Transparency: Real
          costs, real struggles, and real reviews. Empowerment: The confidence
          to navigate a foreign city like a local."
        </p>
      </div>

      <div className="about-content">
        <h1 className="about-header">3. The Ideology</h1>
        <p className="about-text">
          How We Travel "I believe in Immersion over Escapism. Travel shouldn't
          just be about escaping your daily life; it should be about expanding
          your perspective. Go Slow: I prefer staying in one city for a week
          rather than rushing through five countries in five days. Stay Local: I
          prioritize local businesses, street food, and public transport over
          all-inclusive resorts. Tech-Smart: As a modern traveler, I believe in
          leveraging technology—from apps to hacks—to make the journey smoother
          and safer."
        </p>
      </div>

      <div className="about-content">
        <h1 className="about-header">4. Who Are NORMIE DEVS?</h1>
        <p className="about-text">
          The Team Behind the Code "We are a collective of college students,
          developers, and explorers known as NORMIE DEVS. When we aren't staring
          at terminal windows or debugging C++ code, we are out exploring the
          physical world. We combine our technical background with a love for
          adventure. We aren't professional travel agents; we are just a group
          of friends who love building cool things and going to cool places—and
          we built this site to help you do the same."
        </p>
      </div>
    </div>
  </div>
  );
};

export default About;