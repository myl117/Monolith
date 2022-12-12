const miniSearch = new MiniSearch({
  fields: ['symbol', 'name',], // fields to index for full-text search
  storeFields: ['symbol', 'name', 'exchange'] // fields to return with search results
});

const init = async () => {
  const URI = 'http://localhost:3000/stocks';
  const resp = await fetch(URI);
  const { stocks } = await resp.json();
  miniSearch.addAll(stocks)
}

init();

var timeout = null;

$('#search').keyup(function () {
  clearTimeout(timeout);

  timeout = setTimeout(function () {
    const query = $('#search').val();
    let results = miniSearch.search(query);

    $('.results').empty();

    for (entry of results) {
      const { symbol, name, exchange } = entry;

      $('.results').append(`
      <div class="item mb-3">
        <hr class="hr mt-0">
        <div class="container">
          <div class="row">
            <div class="col">
              <h3 class="mb-0">${symbol}</h3>
            </div>
            <div class="col-auto">
              <p class="text-muted mb-0">${exchange}</p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p class="text-muted mb-0">${name}</p>
            </div>
          </div>
        </div>
      </div>
      `)
    }
  }, 500);
});
