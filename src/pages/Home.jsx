import React from "react";
import "./Home.css";
export default function Home() {
  return (
    <>
      <div className="bck">
        <div className="headings">
          <h1 className="home-h1 animate-slide-up">Welcome to Solar Energy!</h1>
          <h3 className="animate-slide-up delay">
            We are here to groom your business
          </h3>
        </div>
      </div>
      <div className="get">
        <div className="get-overlay">
          <h2>What You Can Get From Us</h2>
          <div className="get-cards">
            <div className="get-card">
              <h3>✔ Qualified Solar Leads</h3>
              <p>
                We deliver highly targeted leads that match your solar business
                profile. These are not just clicks or forms — they’re people
                genuinely interested in solar solutions, ready for a
                conversation and decision-making.
              </p>
            </div>

            <div className="get-card">
              <h3>✔ Confirmed Appointments</h3>
              <p>
                No more chasing unresponsive prospects. We schedule solid
                appointments with ready-to-talk clients, so your sales team
                focuses only on closing, not cold outreach.
              </p>
            </div>

            <div className="get-card">
              <h3>✔ Expert Cold Calling</h3>
              <p>
                Our agents are trained in persuasive communication. We handle
                cold calling with proven scripts that convert cold contacts into
                warm leads and sales opportunities.
              </p>
            </div>

            <div className="get-card">
              <h3>✔ Household Repair Lead Generation</h3>
              <p>
                Whether it’s plumbing, electrical, or general maintenance, we
                generate leads for clients looking for reliable repair
                professionals in their area. We help local businesses grow
                efficiently.
              </p>
            </div>

            <div className="get-card">
              <h3>✔ Cost-Efficient Results</h3>
              <p>
                We don’t just get you leads — we get you results. With a focus
                on return on investment, we reduce your marketing costs and
                increase your revenue through focused, smart outreach.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="contentOuter">
        <div className="keptAll">
          <div className="content">
            <h1>SOLAR ENERGY</h1>
            <p>
              Shift to Smart Solar Energy System by SOLAR ENERGY and start
              enjoying unlimited benefits for life.
            </p>
            <div className="bar"></div>
          </div>
          <div className="outerSlashes">
            <div className="slashes">
              <span className="tick">✔</span> You can get solar leads
            </div>
            <div className="slashes">
              <span className="tick">✔</span> You can get solar appointments
            </div>
            <div className="slashes">
              <span className="tick">✔</span> You can test our cold calling
              services
            </div>
          </div>
        </div>
        <img
          className="homeFstImg"
          src="https://mbsolar.pk/wp-content/uploads/2020/11/mb-solar-home.png"
          alt=""
        />
      </div>
    </>
  );
}
