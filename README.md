# totals

  Totalized-data View Component for Zenzey project.

  ![js totals component - horizontal](http://d.pr/i/JlKI+)
  ![js totals component - vertical](http://d.pr/i/GdQM+)

## Examples

* Init and render

```js
var data = { tweets: 523 , replies: 110 };
var titles = { tweets: 'Tweets' , replies: 'Replies' };

var totals = require('totals');

totals('#metrics', data, { direction: 'vertical', titles: titles }).render();
```

* Save instance and work with it

```js
var data = { tweets: 523 , replies: 110 };
var titles = { tweets: 'Tweets' , replies: 'Replies' };

var totals = require('totals');
var metrics = totals('#metrics');

metrics
  .set(data)
  .option('direction', 'horizontal')
  .option('titles', titles)
  .render();

// `data` changes...

metrics
  .set(data)
  .option({ direction: 'vertical' })
  .render();
```

## API

### totals(element)
  Return a `Totals` instance with the given element
  via selector, html, arrays, nodelists, etc.

```js
var tweetsMetrics = totals('#tweets');
var repliesMetrics = totals(document.getElementById('replies'));
```

### totals(element, data, [options])
  Return a `Totals` with the given element
  and sets data and options.

```js
var networkMetrics = totals('#network', data, options);
```

### .set(data)
  Set current totalized data.

```js
metrics.set({ tweets: 523 , replies: 110 });
```

### .get()
  Get current totalized data.

```js
var currentMetrics = metrics.get();
```

### .option(setting)
  Get setting value.

```js
metrics.option('direction');
```

### .option(setting, value)
  Set setting value.

```js
metrics.option('direction', 'horizontal');
```

### .option(settings)
  Set multiple settings values.

```js
metrics.option({ direction: 'vertical', titles: { tweets: 'My tweets!'} });
```

### .render()
  Render current data to provided dom element.

```js
metrics.render();
```

## License

  MIT