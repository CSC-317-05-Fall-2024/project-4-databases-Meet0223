/* This file should contain any DOM manipulation
needed to populate the header, nav, and footer elements
*/

function createHeader(pageTitle) {
    const headerHTML = `
        <h3 id="Top_Text">Traveler / ${pageTitle} Page</h3>
        <img id="banner" src="images/Yosemite Banner.png" alt="Yosemite Banner">
    `;
    document.getElementById('header').innerHTML = headerHTML;
}

function createNav() {
    const navHTML = `  
        <nav id="navbar">
            <ul class="navbar-list">
                <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
                <li class="nav-item"><a href="Attractions.html" class="nav-link">Attractions</a></li>
                <li class="nav-item"><a href="/restaurants" class="nav-link">Restaurants</a></li>
                <li class="nav-item"><a href="new-restaurants.html" class="nav-link">New Restaurants</a></li>
            </ul>
        </nav>
    `;

    document.getElementById('navbar').innerHTML = navHTML;
}

function createFoot(){
    const footHTML = `
        <p id="AboutMe">Content Info: mpatel@sfsu.edu</p>    
    `;
    document.getElementById('footer').innerHTML = footHTML;
}


createNav()
createFoot()
