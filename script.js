// URL of the quotes text file
const quotesFileUrl = 'quotes.txt'; // Replace with your actual URL

async function fetchQuotes() {
  try {
    const response = await fetch(quotesFileUrl);
    const text = await response.text();
    const quotes = text.split('\n').filter(quote => quote.trim() !== '');
    return quotes;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
}

async function getRandomQuote() {
  const quotes = await fetchQuotes();
  if (quotes.length === 0) return 'No quotes available.';
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

async function updateQuotes() {
  document.getElementById('frontQuote').innerText = await getRandomQuote();
  document.getElementById('backQuote').innerText = await getRandomQuote();
}

// Update quotes initially
updateQuotes();

// Add an event listener to the card to update quotes on flip
document.querySelector('.thecard').addEventListener('transitionend', function(e) {
  // Ensure the card has flipped completely
  if (getComputedStyle(e.target).transform === 'matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)') {
    updateQuotes();
  }
});
