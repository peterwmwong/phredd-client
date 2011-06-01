define(['GameState'], function(GameState) {
  return {
    render: function(R) {
      return "<div class='triangle'>&nbsp;</div>\n<div class='unitgroup'>\n" + (R(['Ant', 'Snake', 'Tiger', 'Leviathan'], function(name) {
        return "  <div class='unit'>    <div class='icon'></div>    <div class='info'>      <div class='name'>" + name + "</div>      <div class='healthbar'></div>    </div>  </div>";
      })) + "\n</div>";
    }
  };
});