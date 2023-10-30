import './footer.scss'

const Footer = () => {
    return (
        <footer>
            <div>
                <h3>Contact Us</h3>
                <p><a href="mailto:dummy@gmail.com">dummy@gmail.com</a></p>
            </div>
            <div>
                <h3>Quick Links</h3>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Services</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div>
                <h3>Follow Us</h3>
                <div class="social-icons">
                    <i class="fab fa-facebook"></i>
                    <i class="fab fa-twitter"></i>
                    <i class="fab fa-instagram"></i>
                    <i class="fab fa-linkedin"></i>
                </div>
            </div>
        </footer>
    )
}

export default Footer