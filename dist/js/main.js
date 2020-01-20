var apod = {
  //Create a random date
  randomDate: function (start, end) {
    //Randomize the date https://gist.github.com/miguelmota/5b67e03845d840c949c4
    let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    //Format the date
    let d = date.getDate();
    let m = date.getMonth() + 1; //In JS months start at 0
    let y = date.getFullYear();

    //Change the month and day strings so that they match the documented format.
    if (m < 10) {
      m = '0' + m
    }

    if (d < 10) {
      d = '0' + d
    }

    return `${y}-${m}-${d}`;
  },

  //     // Application Constructor
  //     init: function () {
  //         let date = this.randomDate(new Date(1995, 5, 16), new Date());
  //         var url = "https://api.nasa.gov/planetary/apod?api_key=SvjNz04h69O7KEwCtUdgUndqngp1OSjF1zIMeWXz&date=" + date;

  //         $.ajax({
  //             url: url
  //         }).done(function (result) {
  //             document.querySelector("#apodTitle").text(result.title);
  //             document.querySelector("#apodImg").attr("src", result.url).attr('alt', result.title);
  //             document.querySelector("#apodCopyright").text("Copyright: " + result.copyright);
  //             document.querySelector("#apodDate").text("Date: " + date);
  //             document.querySelector("#apodDesc").text(result.explanation);
  //             //If the media type is video hide the image elements and display a video.
  //             if (result.media_type === 'video') {
  //                 document.querySelector("#apodImg").hide();
  //                 document.querySelector("#apodVideo > iframe").attr("src", result.url).show();
  //             } else {
  //                 document.querySelector("#apodVideo").hide();
  //                 document.querySelector("#apodImg").attr("src", result.url).attr('alt', result.title).show();
  //             }
  //         })
  //             /*.done(function (result) {
  //                 console.log(result);*/
  //             fail(function (result) {
  //                 console.log(result);
  //             });
  //     },
  // };
  // apod.init();

  //Injects the results of the API call into the DOM
  buildDOM: function (result) {
    let title = document.querySelector("#apodTitle").innerText = result.title;

    // console.log(innerText);

    if (result.media_type === 'video') {
      let img = document.querySelector("#apodImage");
      img = style.display = 'none';

      let vid = document.querySelector("#apodVideo > iframe");
      vid.src = result.url;
      vid.style.display = 'block';
      // document.querySelector("#apodImage").hide();
      // document.querySelector("#apodVideo > iframe").attr("src", result.url).show();
    } else {
      let vid = document.querySelector("#apodVideo");
      vid.style.display = 'none';

      let img = document.querySelector("#apodImage");
      img.src = result.url;
      img.style.display = 'block';
      // document.querySelector("#apodVideo").hide();
      // document.querySelector("#apodImg").attr("src", result.url).attr('alt', result.title).show();
    }

    let copy = document.querySelector("#apodCopyright");
    copy.innerText = "Copyright: " + result.copyright;

    let img = document.querySelector("#apodDate");
    apodDate.innerText = "Date: " + result.date;

    let description = document.querySelector("#apodDesc");
    description.innerText = result.explanation;

    // document.querySelector("#apodCopyright").text("Copyright: " + result.copyright);
    // document.querySelector("#apodDate").text("Date: " + result.date);
    // document.querySelector("#apodDesc").text(result.explanation);
  },

  //Executes an AJAX call to an API.
  getRequest: function () {
    let _this = this;
    // let date = "2013-06-06";
    let date = this.randomDate(new Date(1995, 5, 16), new Date());
    let url = "https://api.nasa.gov/planetary/apod?api_key=SvjNz04h69O7KEwCtUdgUndqngp1OSjF1zIMeWXz&date=" + date;

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", () => {

      let result = JSON.parse(oReq.response);

      console.log(result);

      _this.buildDOM(result);
    });
    oReq.open("GET", url);
    oReq.send();

    // fetch(url)
    //   .then(result => {
    //     _this.buildDOM(result)
    //   }) .catch(error=> {
    //     console.log(result)
    //   });

    //   $.ajax({
    //       url: url
    //   }).done(function(result){
    //       _this.buildDOM(result);
    //   }).fail(function(result){
    //     console.log(result);
    //   });
  },

  // Initialization method.
  init: function () {
    this.getRequest();
  },
}

apod.init();

/* https://learn.jquery.com/using-jquery-core/document-ready/ */
// $(function() {
document.querySelector('#btnRandApod')
  .addEventListener('click', function () {
    apod.getRequest();
  });
// });

