import React from 'react'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';

const Community = () => {
  return (
    <>
      <section style={{marginBottom: '50px'}} className="title_2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Community Guidelines</h1>
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
            

			  <p>Howlyr’s mission is to create the soundtrack of your life.  </p>

			  <p>Howlyr redefines modern communication through sound, replacing written communication with soundbites, to make texting and social media posts more fun and exciting. </p>

			  <p>Soundbites from movies, TV shows, music, sports, memes and other culturally relevant references can breathe life and laughs into everyday communication, while fueling today’s universal fascination with pop culture. </p>

			  <p>To make our community as engaging and meaningful as possible, it is essential that you and the rest of our users feel safe and enjoy being part of the Howlyr community. Therefore, we have developed the following set of Community Guidelines to govern what kind of communication is allowed and what type of content may violate our standards.  Please be aware that certain content may be offensive or disagreeable to some users, but will not necessarily violate these Community Guidelines.  </p>


			  <h2>Augment Your Communication</h2>

			 
			  
			  <p> Howlyr is pioneering the use of sound and pop culture references to enhance other forms of mobile communication.  Whether you are texting your friends or posting on your second or third favorite social media platforms (behind Howlyr, of course), you can now replace written language or bring photos to life with audio memes and pop culture soundbites. To get the most of your experience, we encourage you to search all the available soundbites in the vast database, create your own soundbites to add to the database, and keep track of all of your favorite and trending soundbites.</p>
			  
			  
			  <h2>Community Database </h2>

			  <p>Like other crowdsourced platforms, you and your fellow users (the Howlyr community) give Howlyr life.  The more people use Howlyr to create and contribute to its global database, the richer our collective language of sounds becomes. To enhance Howlyr’s communicative power, we encourage you to create and share wholly unique soundbites which capture the essence of modern communication: relevant references to pop culture and your own, personal sounds that may become the next viral meme.  In the interest of keeping our auditory language as rich as possible, we reserve the right to remove any content which may or does constitute spam, a scam, or otherwise violates our Terms of Use, Privacy Policy or these Community Guidelines.  In adding metadata (i.e., tags) to created clips, please ensure that all information is accurate and not misleading so that our community can benefit from having the most robust database we possibly can, and the most relevant soundbite to use in any given context. </p>

			  <h2> Safety </h2>

			  <p>We may remove any content or disable any accounts as necessary if we believe that there is a risk of any physical harm or threat to the public safety.  Do not use Howlyr if you are under the age of 13, and please get permission from your parent or guardian before using Howlyr if you are under 18.  Howlyr may not be used to harm or threaten harm against any other person, entity or community.  </p>

			  <h2>Bullying and Harassment </h2>

			  <p>We do not condone any bullying or harassment.  Howlyr is intended to facilitate open and creative expression, but not to the extent that such communication bullies or harasses another person.  Howlyr aims to help people strengthen their social relationships through pop culture, and to allow people to focus on and share what they have in common with others, rather than the differences among us. </p>

			  <h2>DMCA </h2>

			  <p>If your copyrighted material has been used to create a Howl on Howlyr without your permission and you believe it should be removed, please follow the DMCA guidelines set out in our <span> <Link to="/terms-of-use"> Terms of Use</Link></span>. </p>

			  <h2>Unauthorized Content </h2>

			  <p>Do not create, send, post, or share any content which is sexually explicit, obscene, hateful, illegal, infringing, threatening, or defamatory.  Do not create any content or use Howlyr in any way which does, might, or is intended to scam any other person or entity, do not post any spam, do not disclose any other person’s personal details (and be mindful about disclosing your own), and overall, use your best judgment.  Report any inappropriate content.  While Howlyr is not obligated to remove any reported content, Howlyr reserves the right to remove any content (whether or not it is reported) at its sole discretion. </p>

			  <p>Howlyr is intended for personal, original, and communicative purposes, so be creative with it!  However, Howlyr’s content may not be used for commercial purposes. </p>

			  <h2>Howlyr at Ya </h2>

			  <p>Most importantly, have fun and keep Howlyn’!  If you’re at a loss for words, just remember – there’s a Howl for that. </p>



		 
           
           
          </div>
        </div>
      </div>
    </section>
  
      <Footer />
    </>
  )
}

export default Community;