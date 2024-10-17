This sample shows how to truncate several text lines and set ellipsis at the end.

In some cases there is not enough CSS.
Assume you have HTML

```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="lib/style.css">
  </head>
  <body>
    <div class="container">
      <h1 class="text">Скидки и акции от продавцов.</h1>
    </div>
  </body>
</html>
```
and CSS

```css
.container {
  box-sizing: border-box;
  padding: 8px;
  width: 106px;
  background-color: aqua;
}

.text {
  overflow: hidden;
  /* Change the font to "Times New Roman" or comment to fix. */
  font-family: Arial;
  font-size: 24px;
  line-height: 1.33;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
```
There's still enough of space there, but the three dots are placed too early.\
This does not happen in Latin, but it does happen in Cyrillic.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
