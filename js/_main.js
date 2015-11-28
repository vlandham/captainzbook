// Off Canvas Sliding
/* global $,d3,document */

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


$(document).ready(function(){
	$('.js-menu-trigger').on('click touchstart', function(e){
		$('body').toggleClass('no-scroll');
		$('.js-menu, .js-menu-screen').toggleClass('is-visible');
		$('.sliding-menu-button').toggleClass('slide close');
		$('#masthead, #page-wrapper').toggleClass('slide');
		e.preventDefault();
	});
	$('.js-menu-screen').on('click touchstart', function(e){
		$('body').toggleClass('no-scroll');
		$('.js-menu, .js-menu-screen').toggleClass('is-visible');
		$('.sliding-menu-button').toggleClass('slide close');
		$('#masthead, #page-wrapper').toggleClass('slide');
		e.preventDefault();
	});
});

function sail(d,i) {
  var ships = d3.select("#ships");
  var height = $(window).scrollTop() + $(window).height();
  var width = ships.style("width");

  var y =  getRandomInt($(window).scrollTop(), +height) + "px";


  d.direction = (d.direction && d.direction === "right") ? "left" : "right";

  d3.select(this)
    .classed("flip-horizontal", function(d) { return d.direction !== d.odirection; })
    .transition()
    .delay(i * 1000)
    .duration(20000)
    .ease("linear-in-out")
    .style("left", d.direction === "left" ? "-60px" : width)
    .style("top",y)
    //.style("height",getRandomInt(5, 10) + "%")
    .style("opacity",getRandomArbitrary(0.2, 0.8) )
    .each("end", sail);

}

function display(error, data) {
  var ships = d3.select("#ships");
  //var height = ships.style("height");
  //var width = ships.style("width");
  ships.selectAll(".ship").data(data)
  .enter()
  .append("img")
  .attr("src", function(d) { return "/images/ships/" + d.img; })
  .style("height", 100 + "px")
  .style("opacity", 0.0)
  .attr("class", "ship")
  .style("left", 0)
  .each(sail);
}

// FitVids
$(document).ready(function(){
	// Target your .container, .wrapper, .post, etc.
	$("#main").fitVids();

  d3.json("/js/data/ships.json", display);
});
