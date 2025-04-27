// Function to load articles from the articles directory
async function loadArticles() {
    try {
        // For GitHub Pages, we need to list articles in a specific way
        // This is the list of articles you'd manually update when adding new files
        // You could also automate this with a build script if you're familiar with that
        const articles = [
            'article1.txt',
            'article2.txt'
            // Add more article filenames here as you add them
        ];

        const articlesContainer = document.getElementById('articles-container');
        articlesContainer.innerHTML = ''; // Clear loading message

        if (articles.length === 0) {
            articlesContainer.innerHTML = '<li>No articles found</li>';
            return;
        }

        // Create a list item for each article
        articles.forEach(filename => {
            const title = formatTitle(filename);
            const li = document.createElement('li');
            const link = document.createElement('a');

            link.href = `viewer.html?article=${encodeURIComponent(filename)}`;
            link.textContent = title;

            li.appendChild(link);
            articlesContainer.appendChild(li);
        });

    } catch (error) {
        console.error('Error loading articles:', error);
        document.getElementById('articles-container').innerHTML =
            '<li>Error loading articles. Please try again later.</li>';
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

// Load articles when the page loads
document.addEventListener('DOMContentLoaded', loadArticles);