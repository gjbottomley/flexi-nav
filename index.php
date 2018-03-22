<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Flexi Navigation</title>
    <link rel="stylesheet" type="text/css" href="assets/css/navigation.css">
  </head>
  <body>
    <nav class="flexi-navigation fixed">
      <h1>Flexi Nav</h1>
      <ul class="flexi-navigation__list">
        <li><a href="#" title="simple item">simple item</a></li>
        <li class="flexi-navigation__dropdown">
          <a href="#" title="dropdown">dropdown</a>
          <ul class="flexi-toggler">
            <li><a href="#" title="Dropdown item">Dropdown item</a></li>
            <li><a href="#" title="Dropdown item">Dropdown item</a></li>
            <li><a href="#" title="Dropdown item">Dropdown item</a></li>
          </ul>
        </li>
        <li><a href="#">handles</a></li>
        <li><a href="#">overflowing</a></li>
        <li><a href="#">menu</a></li>
        <li><a href="#">elements</a></li>
        <li><a href="#">effortlessly</a></li>
      </ul>
    <a href="javascript:void(0);" class="flexi-burger count">
      <span class="flexi-burger__icon">
        <span class="flexi-burger__break"></span>
      </span>
    </a>
    <ul class="flexi-responder flexi-toggler"></ul>
    </nav>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="assets/js/navigation.js"></script>
  </body>
</html>
