const searchBox = document.getElementById('top-search')
searchBox.onsubmit = (ev) => {
  console.log('submitted top-search with', ev)
  ev.preventDefault()
  // https://stackoverflow.com/a/26892365/1449799
  const formData = new FormData(ev.target)
  console.log(formData)
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
  }
  const queryText = formData.get('query')
  console.log("queryText", queryText)
  
  const quoteResultsPromise = getQuotes(queryText)

  quoteResultsPromise.then((PromiseResult) => {
    const quoteContent = PromiseResult.results[0].content;
    const quoteAuthor = PromiseResult.results[0].author;
    var caption = document.createElement('span');
    caption.innerHTML = quoteContent;
    document.body.appendChild(caption);

    var author = document.createElement('span');
    author.innerHTML = ("-" + quoteAuthor);
    document.body.appendChild(author);
    console.log(quoteContent);
  });
  
  console.log("quote", quoteResultsPromise)
  const pic = fetch(`http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true`).then((r) => r.json())

  pic.then((PromiseResult) => {
    const picURL = PromiseResult[0];
    var img = new Image();
    img.src = picURL
    img_home.appendChild(img);
  });
  console.log("picture", pic)

    
}

// with a word, find a quote with that word
// https://api.goprogram.ai/inspiration/docs/

const getQuotes = (word) => {
  console.log("attempting to get quotes for", word);
  return fetch(
    `https://api.quotable.io/search/quotes?limit=1&query=${word}&fields=content`
  ).then((resp) => resp.json());
};

