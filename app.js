/*  id="carousel"  id="list" id="carouselMain"
    <li data-target="#cIndicators" data-slide-to="0" class="active"></li>
        <!-- <li data-target="#cIndicators" data-slide-to="1"></li>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100"
            src="https://cdn.cheapism.com/images/National_Park_Photos.2e16d0ba.fill-1440x605.png" alt="First slide">
          <div class="carousel-caption d-none d-md-block">
            <h5></h5>
            <p>Search Value</p>
          </div>
        </div>
*/
let searchVal = ""
let idCount = 0;
$('#find').on('click', function () {
    searchVal = $('#search').val()
    $('#search').val("");
    getData();
});

async function getData() {
    const config = {
        headers: {
            "Content-Type": "application/JSON",
        }
    };
    const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=M4E3LWcUjLxBizVRZiIxnv1wri1nXLg6&q=${searchVal}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
    const res = await axios.get(searchUrl, config);
    const apiURL = res.data.data[0].images.original.url;
    createElements(apiURL);
};

function createElements(url) {
    const $newLi = $(`<li data-target="#cIndicators" data-slide-to="${idCount}" class="active">`);
    const $div2 = $(`<div class="carousel-caption d-none d-md block" id="caption${idCount}>`);
    const $img = $(`<img class"d-block w-100" src="${url}" alt="Slide ${idCount}">`);
    const $div1 = $(`<div class="carousel-item active" id="imgdiv${idCount}">`).html($img, $div2);
    addElements($newLi, $div1,)
}

function addElements(li, d1,) {
    const $li = $('#list').children();
    if (idCount > 0) {
        for (let i = 0; i < idCount; i++) {
            $(`#imgdiv${i}`).removeClass('active');
            $('#list').children().removeClass('active');
        }
    } else {
        $('#carousel').removeClass('d-none').addClass('d-flex');
    }
    $('#list').append(li);
    $('#carouselMain').append(d1);
    idCount++;

}
$('#remove').on('click', function () {
    $('#carousel').removeClass('d-flex').addClass('d-none');
    $('#list').html("")
    $('#carouselMain').html("");
    idCount = 0;
})




