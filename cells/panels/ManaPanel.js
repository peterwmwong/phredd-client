define(['GameState'], function(GameState) {
  return {
    render: function(R) {
      return "<div class='container'>\n" + (R(['red', 'pink', 'yellow', 'blue', 'orange', 'green'], function(color) {
        return "  <div class='iconBar " + color + "'>    <div class='iconContainer'>      <div class='icon'>&nbsp;</div>    </div>    <div class='barContainer'>      <div class='bar'>&nbsp;</div>    </div>  </div>";
      })) + "\n</div>";
    }
  };
});