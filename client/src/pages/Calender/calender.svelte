<!-- Header -->
<div class="header">
    <h1>Klimakalenderen</h1>
    <p>Her kan du finde kommende klimavenlige events, foredrag, demonstrationer og andre begivenheder</p>
  </div>
  
  <!-- Photo Grid -->
  <div class="row"> 

    <div class="column">
        <a><img src="madkursus.png" style="width:580px;height:290px"><div class="desc">Madlavningskursus 23. januar</div></a>
        <a><img src="klimafolkemødet.png" style="width:580px;height:290px"><div class="desc">Kimafolkemødet 2. september</div></a>
        <a><img src="klimamarch.png" style="width:580px;height:290px"><div class="desc">klimamarch 15. november</div></a>
    </div>
    <div class="column">
        <a><img src="klimamarch.png" style="width:580px;height:290px"><div class="desc">klimamarch 15. november</div></a>
        <a><img src="Morgenthaler.png" style="width:580px;height:290px"><div class="desc">Foredrag med Anders Morgenthaler 23. januar</div></a>
        <a><img src="Jesper.png" style="width:580px;height:290px"><div class="desc">Kimafolkemødet 2. september</div></a>
    </div>

    </div>
<body>


    </body>

    <style>
        .text-block {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: black;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
}

 * {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial;
}

.header {
  text-align: center;
  padding: 32px;
}

.row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
  padding: 0 4px;
}

/* Create four equal columns that sits next to each other */
.column {
  -ms-flex: 25%; /* IE10 */
  flex: 25%;
  max-width: 100%;
  padding: 0 20px;
}

.column img {
  margin-top: 30px;
  vertical-align: middle;
  width: 100%;
}

/* Responsive layout - makes a two column-layout instead of four columns */
@media screen and (max-width: 800px) {
  .column {
    -ms-flex: 50%;
    flex: 50%;
    max-width: 50%;
  }
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    -ms-flex: 100%;
    flex: 100%;
    max-width: 100%;
  }
}
        </style>