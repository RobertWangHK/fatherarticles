// Function to get URL parameters
function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// Function to load and display article content
async function loadArticle() {
    const articleParam = getUrlParameter('article');

    if (!articleParam) {
        displayError('No article specified');
        return;
    }

    try {
        const response = await fetch(`articles/${articleParam}`);

        if (!response.ok) {
            displayError('Could not load the article');
            return;
        }

        const content = await response.text();

        // Set the article title
        const title = formatTitle(articleParam);
        document.getElementById('article-title').textContent = title;

        // Format and display the article content
        displayContent(content);

        // Set page title
        document.title = `${title} - Memorial Library`;

    } catch (error) {
        console.error('Error loading article:', error);
        displayError('Error loading the article. Please try again later.');
    }
}

// Function to format the filename as a title
function formatTitle(filename) {
    // Remove file extension and replace dashes/underscores with spaces
    let title = filename.replace(/\.[^/.]+$/, "")
                         .replace(/-/g, ' ')
                         .replace(/_/g, ' ');

    // Capitalize first letter of each word
    title = title.split(' ')
                 .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                 .join(' ');

    return title;
}

// Function to display the content with proper formatting
function displayContent(content) {
    const contentContainer = document.getElementById('article-content');
    contentContainer.innerHTML = '';

    // Split content by double line breaks to create paragraphs
    const paragraphs = content.split(/\n\n+/);

    paragraphs.forEach(paragraph => {
        // Skip empty paragraphs
        if (paragraph.trim() === '') return;

        const p = document.createElement('p');

        // Replace single line breaks with spaces
        p.textContent = paragraph.replace(/\n/g, ' ').trim();

        contentContainer.appendChild(p);
    });
}

// Function to display error messages
function displayError(message) {
    document.getElementById('article-title').textContent = 'Error';
    document.getElementById('article-content').innerHTML = `<p class="error">${message}</p>`;
}

// Load article when the page loads
document.addEventListener('DOMContentLoaded', loadArticle);