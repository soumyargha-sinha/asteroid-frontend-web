// import React from 'react'

const About = () => {
    return (
        <div className="container main-content-width">
            <h1>About CosmoDanob</h1>
            <p>This project is a web-based dashboard that fetches asteroid data from the NASA NEO API, providing insights on asteroids potentially approaching Earth.
                The dashboard visualizes various asteroid properties, including their diameter, velocity, and miss distance, in an intuitive interface.</p>
            <h2>NASA API</h2>
            <p>This app uses the NASA Near Earth Object (NEO) API to gather asteroid data. For more information, you can visit their official API page:
                <a href="https://api.nasa.gov" target="_blank" rel="noopener noreferrer">NASA NEO API</a>
            </p>
            <h2>Credits</h2>
            <h3>Dependencies</h3>
            <ul>
                <li><strong>axios</strong> - A promise-based HTTP client for JavaScript.
                    <br />License: MIT</li>
                <li><strong>chart.js</strong> - A JavaScript library for building charts.
                    <br />License: MIT</li>
                <li><strong>react</strong> - A JavaScript library for building user interfaces.
                    <br />License: MIT</li>
                <li><strong>react-chartjs-2</strong> - A wrapper for Chart.js for React.
                    <br />License: MIT</li>
                <li><strong>react-icons</strong> - A set of icons for React.
                    <br />License: MIT</li>
                <li><strong>react-router-dom</strong> - A collection of navigational components for React.
                    <br />License: MIT</li>
            </ul>
            <h2>Contact</h2>
            <p>If you have any questions or suggestions, feel free to reach out via email (decidekorataichaaper@gmail.com) or visit my <a href="https://github.com/soumyargha-sinha/" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
            <p>Source code: <a href="https://github.com/soumyargha-sinha/asteroid-frontend-web" target="_blank" rel="noopener noreferrer">Frontend</a>, <a href="https://github.com/soumyargha-sinha/asteroid-backend" target="_blank" rel="noopener noreferrer">Backend</a></p>
        </div>
    )
}

export default About