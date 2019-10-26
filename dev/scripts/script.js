var audio = {};

audio.tempo1 = new Audio();
audio.tempo1.src = './assets/audio/fx-navi.mp3';

audio.tempo2 = new Audio();
audio.tempo2.src = './assets/audio/fx-streetfighter.mp3';

audio.melody1 = new Audio();
audio.melody1.src = './assets/audio/melody1.mp3';

audio.melody2 = new Audio();
audio.melody2.src = './assets/audio/melody2.mp3';

audio.beat1 = new Audio();
audio.beat1.src = './assets/audio/beat1.mp3';

audio.beat2 = new Audio();
audio.beat2.src = './assets/audio/beat2.mp3';

audio.vocals1 = new Audio();
audio.vocals1.src = './assets/audio/vocals1.mp3';

audio.vocals2 = new Audio();
audio.vocals2.src = './assets/audio/vocals2.mp3';

audio.synth1 = new Audio();
audio.synth1.src = './assets/audio/ambience1.mp3';

audio.synth2 = new Audio();
audio.synth2.src = './assets/audio/ambience2.mp3';

audio.synth3 = new Audio();
audio.synth3.src = './assets/audio/ambience3.mp3';

audio.synth4 = new Audio();
audio.synth4.src = './assets/audio/ambience4.mp3';

var selections = [];
var deselections = [];

audio.events = function() {
  // This snipper will allow grouping like radio buttons, it will
  // allow unselecting, and the selector will match all input
  // controls of type :checkbox and attach a click event handler
  $('input:checkbox').on('click', function() {
    // in the handler, 'this' refers to the box clicked on
    var $box = $(this);
    if ($box.is(':checked')) {
      // the name of the box is retrieved using the .attr() method
      // as it is assumed and expected to be immutable
      var group = "input:checkbox[name='" + $box.attr('name') + "']";

      // the checked state of the group/box on the other hand will change
      // and the current value is retrieved using .prop() method
      $(group).prop('checked', false);
      $(this)
        .prev()
        .removeClass('unselected');
      $box.prop('checked', true);
    } else {
      $box.prop('checked', false);
    }

    // add class of unselected when a button (checkbox) is clicked / selected
    $('form')
      .find('.form__checkbox-input')
      .each(function() {
        if ($(this).prop('checked') === false) {
          $(this)
            .prev()
            .addClass('unselected');
        }
      });

    // mapping user selections into the empty selections array
    selections = $('.form__checkbox-input:checked').map(function(item) {
      // for every checked checkbox, put its associated data into this array
      return $(this).data('audio');
    });

    deselections = $('.form__checkbox-input:not(:checked)').map(function(item) {
      return $(this).data('audio');
    });

    if (selections.length === 5) {
      $.each(deselections, function(i, item) {
        audio[item].pause();
        audio[item].currentTime = 0;
      });
      $.each(selections, function(i, item) {
        audio[item].currentTime = 0;
        audio[item].play();
        audio[item].loop = true;
      });
    } else {
      stopAudio();
    }
  }); // END OF CLICK FUNCTION

  function stopAudio() {
    $.each(selections, function(i, item) {
      audio[item].pause();
      audio[item].currentTime = 0;
    });

    $.each(deselections, function(i, item) {
      audio[item].pause();
      audio[item].currentTime = 0;
    });
  }
}; // END OF EVENTS

// initializing main app
audio.init = function() {
  audio.events();
};

$(function() {
  audio.init();
});
