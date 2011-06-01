define({
  render: function(R, A) {
    return "" + (R.cell('panels/ManaPanel')) + "\n" + (R.cell('panels/CardPanel')) + "\n" + (R.cell('panels/SelectedAreaPanel')) + "\n" + (R.cell('panels/AreaPanel'));
  }
});