const quotes = [
  {
    quote: 'We grow fearless when we do the things we fear.',
    author: 'Robin Sharma',
  },
  {
    quote:
      'And, when you want something, all the universe conspires in helping you to achieve it.',
    author: 'Paulo Coelho',
  },
  {
    quote:
      'When one door of happiness closes, another opens, but often we look so long at the closed door that we do not see the one which has been opened for us.',
    author: 'Helen Keller',
  },
  {
    quote:
      "If you hear a voice within you say 'you cannot paint,' then by all means paint and that voice will be silenced.",
    author: 'Vincent Van Gogh',
  },
  {
    quote:
      'Love is an untamed force. When we try to control it, it destroys us. When we try to imprison it, it enslaves us. When we try to understand it, it leaves us feeling lost and confused.',
    author: 'Paulo Coelho',
  },
];

const title = document.querySelector('.quote-container .title');
const author = document.querySelector('.quote-container .author');
const quote = document.querySelector('.quote-container .quote');
const quotesLength = quotes.length;
const todaysQuoteIndex = Math.floor(Math.random() * quotes.length);
const todaysQuote = quotes[todaysQuoteIndex];

title.innerText = `Random Quote #${todaysQuoteIndex + 1} / ${quotesLength}`;
author.innerText = `${todaysQuote.author}`;
quote.innerText = `"${todaysQuote.quote}"`;
