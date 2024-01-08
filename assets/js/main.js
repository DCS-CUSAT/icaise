(function ($)
  { "use strict"
  
/* 1. Proloder */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

/* 2. sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  

/* 3. slick Nav */
// mobile_menu
    var menu = $('ul#navigation');
    if(menu.length){
      menu.slicknav({
        prependTo: ".mobile_menu",
        closedSymbol: '+',
        openedSymbol:'-'
      });
    };

/* 4. MainSlider-1 */
    // h1-hero-active
    function mainSlider() {
      var BasicSlider = $('.slider-active');
      BasicSlider.on('init', function (e, slick) {
        var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
        doAnimations($firstAnimatingElements);
      });
      BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
        var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
        doAnimations($animatingElements);
      });
      BasicSlider.slick({
        autoplay: false,
        autoplaySpeed: 5000,
        dots: false,
        fade: true,
        arrows: false, 
        prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
        responsive: [{
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false
            }
          }
        ]
      });

      function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function () {
          var $this = $(this);
          var $animationDelay = $this.data('delay');
          var $animationType = 'animated ' + $this.data('animation');
          $this.css({
            'animation-delay': $animationDelay,
            '-webkit-animation-delay': $animationDelay
          });
          $this.addClass($animationType).one(animationEndEvents, function () {
            $this.removeClass($animationType);
          });
        });
      }
    }
    mainSlider();

/* 5. Testimonial Active*/

/* 4. Testimonial Active*/
    var testimonial = $('.h1-testimonial-active');
    if(testimonial.length){
    testimonial.slick({
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay:false,
        loop:true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
              arrow:false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows:false
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows:false,
            }
          }
        ]
      });
    }



/* 6. Nice Selectorp  */
  var nice_Select = $('select');
    if(nice_Select.length){
      nice_Select.niceSelect();
    }

/* 7. data-background */
    $("[data-background]").each(function () {
      $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
      });


/* 10. WOW active */
    new WOW().init();

// 11. ---- Mailchimp js --------//  
    function mailChimp() {
      $('#mc_embed_signup').find('form').ajaxChimp();
    }
    mailChimp();


// 12 Pop Up Img
    var popUp = $('.single_gallery_part, .img-pop-up');
      if(popUp.length){
        popUp.magnificPopup({
          type: 'image',
          gallery:{
            enabled:true
          }
        });
      }
// 12 Pop Up Video
    var popUp = $('.popup-video');
    if(popUp.length){
      popUp.magnificPopup({
        type: 'iframe'
      });
    }

/* 13. counterUp*/
    $('.counter').counterUp({
      delay: 10,
      time: 3000
    });
    /*------------------
        CountDown
    --------------------*/
    // For demo preview
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    if(mm == 12) {
        mm = '01';
        yyyy = yyyy + 1;
    } else {
        mm = parseInt(mm) + 1;
        mm = String(mm).padStart(2, '0');
    }
    var timerdate = mm + '/' + dd + '/' + yyyy;
    // For demo preview end
    

    // Use this for real timer date
  var timerdate = "2023/03/15";

	$("#countdown").countdown(timerdate, function(event) {
        $(this).html(event.strftime("<div class='cd-item'><span>%D</span><p>Days</p> </div>" + "<div class='cd-item'><span>%H</span><p>Hrs</p> </div>" + "<div class='cd-item'><span>%M</span><p>Min</p> </div>" + "<div class='cd-item'><span>%S</span><p>Sec</p> </div>"));
    });



    
/* 14. Datepicker */
  $('#datepicker1').datepicker();

// 15. Time Picker
  $('#timepicker').timepicker();


})(jQuery);


fetch('Json/hotels.json')
    .then((response) => response.json())
    .then((json) => deploy(json));

function deploy(json){
  json.forEach(element => {
    // console.log(element.name)
    // console.log(element.website)
    try {
      document.getElementById("hotels-nearby").innerHTML += ('<li>'+`<a href="${element.website}">${element.name}</a>`+'</li>');
    } catch (error) {
      console.log(error)
    }
  });
}

fetch('Json/committee.json')
    .then((response) => response.json())
    .then((json) => committee(json));

function committee(json){
  json.forEach(element => {
    try {
      document.getElementById("pc-list").innerHTML += (
        `<h5>&#x2022; ${element.name}</h5>`+
        `<h5 class="mb-4">${element.designation}</h5>`
      );  
    } catch (error) {
      console.log(error)
    }
  });
}

function tourismPhotos({image, name}){
  return `
    <div class="col-sm-12 col-lg-6 col-xxl-6 pt-4">
      <div class="card">
          <img class="card-img-top img-fluid" src="${image}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
          </div>
      </div>
    </div>  
  `
}

const tourism = [
  {
    "name":"Athirapilly Waterfalls",
    "image":"assets/img/tourism/Athirappally.jpg"
  },
  {
    "name":"Alleppey",
    "image":"assets/img/tourism/Alleppey.jpg"
  },
  {
    "name":"Alwaye",
    "image":"assets/img/tourism/Alwaye.jpg"
  },
  {
    "name":"Backwaters",
    "image":"assets/img/tourism/Backwaters.jpg"
  },
  {
    "name":"Chineese Net",
    "image":"assets/img/tourism/Chineese Net.jpg"
  },
  {
    "name":"Fort Kochi",
    "image":"assets/img/tourism/Fortkochi.jpg"
  },
  {
    "name":"Hill Palace",
    "image":"assets/img/tourism/Hill Palace.jpg"
  },
  {
    "name":"Kumarakom",
    "image":"assets/img/tourism/Kumarakom.jpg"
  },
  {
    "name":"Marine Drive",
    "image":"assets/img/tourism/MarineDrive.jpg"
  },
  {
    "name":"Munnar",
    "image":"assets/img/tourism/Munnar.jpg"
  },
  {
    "name":"Vypin Beach",
    "image":"assets/img/tourism/Vypin Beach.jpg"
  },
  {
    "name":"Willington Island",
    "image":"assets/img/tourism/Willington Island.jpg"
  }
]

try {
  document.getElementById("tourism").innerHTML = tourism.map(tourismPhotos).join('');
} catch (error) {
  console.log(error)
}

$.getJSON("https://api.countapi.xyz/hit/icaise.cusat.ac.in", function(response) {
  document.getElementById("view-count").innerHTML = 1000+response.value;
  // console.log(response.value)
});


const speakers = [
  {
    "name":"Prof. Marjan Mernik",
    "designation":"University of Maribor, Slovenia,<br>Editor-In-Chief Journal of Computer Languages, Associate Editor Information Sciences, Applied Soft Computing, Swarm and Evolutionary Computation",
    "cover_img":"assets/img/speakers/marjanmernik.png",
    "topic":"From Grammar Inference to Semantic Inference"
  },
  {
    "name":"Dr. Jey Veerasamy",
    "designation":"Director, Center for Computer Science Education & Outreach, Professor of Instruction, Department of Computer Science, Erik Jonsson School of Engineering & Computer Science, University of Texas at Dallas, USA",
    "cover_img":"assets/img/speakers/jey.png",
    "topic":"Enjoyable Programming"
  },
  {
    "name":"Mr. Vivek R",
    "designation":"Infrastructure Software Engineer,<br>Chorus One",
    "cover_img":"assets/img/speakers/Frame 4.png",
    "topic": "Blockchain consensus and running validators for PoS networks"
  },
  {
    "name":"Dr. Vinu Sherimon",
    "designation":"University of Technology and Applied Sciences,<br>Muscat, Sultanate of Oman",
    "cover_img":"assets/img/speakers/Frame 3.png",
    "topic": "Exit the Internet and enter the Metaverse?"
  },
  {
    "name":"Mr. Anbu Ponniah",
    "designation":"Chief Architect, IBM India Software Labs<br>Automation, ISL Kochi",
    "cover_img":"assets/img/speakers/anbu.png",
    "topic": "AI and Intelligent Automation"
  },
]



function speakerCard({name,designation,cover_img,topic}){
  return `
  <div class="col-lg-4 col-md-6 col-12">
    <div class="single-team mb-30">
        <div class="team-img">
            <img src="${cover_img}" alt="">
        </div>
        <div class="team-caption">
            <h3 class="w-100"><a href="#">${name}</a></h3>
            <p>${designation}</p>
            <p><strong> Topic: "${topic}"</strong> </p>
        </div>
    </div>
  </div>`
}

try {
  document.getElementById("speaker-card").innerHTML = speakers.map(speakerCard).join('');
} catch (error) {
  console.log(error)
}


function albumImages({image, name}){
  console.log(image+""+name)
  return `
    <div class="col-sm-12 col-lg-6 col-xxl-6 pt-4">
      <div class="card">
          <img class="card-img-top img-fluid" src="${image}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
          </div>
      </div>
    </div>  
  `
}


const albums = [
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1368.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1367.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1373.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1376.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T0929.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T0933.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T0942.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T0969.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T0972.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T0975.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T0978.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T0982.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T0984.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T0996.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T1000.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T1013.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T1015.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T1016.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T1017.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T1018.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T1019.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T1026.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T1032.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T1034.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T1038.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T1041.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T1047.jpg'},
  {'name': '', 'image': 'assets/img/album/Day1/BE3T1048.jpg'},
  {'name': '', 'image': 'assets/img/album/Day2/BE3T1084.jpg'},
  {'name': '', 'image': 'assets/img/album/Day2/BE3T1092.jpg'},
  {'name': '', 'image': 'assets/img/album/Day2/BE3T1103.jpg'},
  {'name': '', 'image': 'assets/img/album/Day2/BE3T1106.jpg'},
  {'name': '', 'image': 'assets/img/album/Day2/BE3T1110.jpg'},
  {'name': '', 'image': 'assets/img/album/Day2/BE3T1119.jpg'},
  {'name': '', 'image': 'assets/img/album/Day2/BE3T1124.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1334.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1336.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1345.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1346.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1347.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1351.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1353.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1354.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1356.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1357.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1360.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1366.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1377.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1384.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1385.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1388.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1395.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1404.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1406.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1409.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1411.jpg'},
  {'name': '', 'image': 'assets/img/album/Day3/BE3T1416.jpg'}
]

try {
  document.getElementById("albums").innerHTML = albums.map(albumImages).join('');
} catch (error) {
  console.log(error)
}
