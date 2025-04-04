import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Footer = () => {

    return(
        <>
        <div className="footer-container">
            <section className="section-one">
                <h3>contact us</h3>
                <p>email: skiShop@gmail.com</p>
                <p>number: 074-887 34 38</p>
            </section>
            <section className="section-two">
                <h2>skiShop</h2>
            </section>
            <section className="section-three">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>

            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>

            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            </section>
        </div>

        </>
    )
}