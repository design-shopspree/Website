// Fetch and parse the RSS feed
fetch('scraped_feed.xml')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.text();
  })
  .then((data) => {
    // Parse the XML data
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'application/xml');

    // Extract items from the RSS feed
    const items = xmlDoc.querySelectorAll('item');
    const rssFeed = document.getElementById('rss-feed');

    items.forEach((item) => {
      const title = item.querySelector('title').textContent;
      const link = item.querySelector('link').textContent;
      const listItem = document.createElement('li');
      listItem.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
      rssFeed.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error('Error fetching the RSS feed:', error);
  });
