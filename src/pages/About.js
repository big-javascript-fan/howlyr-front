import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <section style={{marginBottom: '50px'}} className="title_2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Howlyr, Inc.</h1>

              <p style={{ fontSize: '14px', color: 'white', opacity: 0.7}}> Effective Date: November 5, 2018</p>
              <br />
              <div className="row justify-content-center">
                <ul className="legal-nav">
                  <li> <Link className="nav-link" to="/">Home</Link> </li>
                  <li> <Link className="nav-link" to="/about">About Howlyr</Link> </li>
                  <li> <Link className="nav-link" to="/community">Community Guidelines</Link> </li>
                  <li> <Link className="nav-link" to="/terms-of-use">Terms of Use</Link> </li>
                  <li> <Link className="nav-link" to="/privacy-policy">Privacy Policy</Link> </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="legal">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-9">
              <p> At a loss for words?  <span>There’s a Howl for that. </span></p>
              <p>Howlyr reinvents modern communication by adding sound to your text message conversations and social media posts, allowing you to express yourself in a way you cannot do with words and images alone.  </p>
              <p>As the next evolution in communication, Howlyr:</p>
              <ol>
                <li> <p> <span>Creates a new way to communicate on messaging platforms.</span>  Access a vast database of pop culture soundbites from your favorite movies, TV shows, songs, Internet memes and other culturally relevant sources, and “Howl” (send) those soundbites directly to your friends through the Howlyr iMessage extension and other messaging apps. </p></li>
                <li> <p> <span>Revolutionizes social media photos.</span> Attach soundbites to your personal photos and bring them to life when you share on social media platforms like Instagram, Facebook and Twitter. </p></li>
                <li><p> <span> Promotes your favorite artists, performers and influencers.</span> Transform short soundbites into communicative tools by sharing them with your friends and social media followers, exposing your favorite content to broader audiences.   </p> </li>
                <li> <p>  <span> Turns YOU into a content creator.</span> Promote and grow your own personal brand by creating your own soundbites.  You will be empowered to say what you want, brand a new catch phrase, and put your own mark on pop culture.  Not only can you influence pop culture, but you can become pop culture.</p> </li>
              </ol>
              <p>Howlyr allows us to focus on and share what we have in common with others – rather than what separates us – through pop culture references and inside jokes.</p>
              <p><span> Search. Favorite. Share. Create the Soundtrack of Your Life.</span></p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default About;