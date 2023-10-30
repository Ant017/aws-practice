import React from 'react';
import './About.scss'
import Header from '../../components/header/header';

function About() {
    return (
        <div className="about-page">
            <Header />
            <header className="header">
                <h1>About Us</h1>
            </header>
            <main className="content">
                <section className="about-section">
                    <h2>Our Story</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui vel
                        purus sagittis interdum. Vestibulum blandit, mauris ac hendrerit eleifend, ex
                        dolor tincidunt ex, non aliquet orci metus non ipsum. Sed non risus elit. Ut
                        vel massa vel mi scelerisque commodo. Nullam posuere, odio at euismod
                        auctor, nisl quam dignissim nulla, vel aliquam elit quam et quam.
                    </p>
                </section>
                <section className="team-section">
                    <h2>Our Team</h2>
                    <ul>
                        <li>John Doe - CEO</li>
                        <li>Jane Smith - CTO</li>
                        <li>Michael Johnson - COO</li>
                    </ul>
                </section>
            </main>
            <footer className="footer">
                <p>&copy; 2023 Your Company. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default About;
