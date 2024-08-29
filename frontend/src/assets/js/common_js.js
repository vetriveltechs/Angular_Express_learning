function sectionShow(section_type, show_hide_type) {
    if (section_type === 'FIRST_SECTION') {
      if (show_hide_type === 'SHOW') {
        $(".first_sec_hide").hide();
        $(".first_sec_show").show();
        $(".first_section").hide("slow");
      } else if (show_hide_type === 'HIDE') {
        $(".first_sec_hide").show();
        $(".first_sec_show").hide();
        $(".first_section").show("slow");
      }
    } else if (section_type === 'SECOND_SECTION') {
      if (show_hide_type === 'SHOW') {
        $(".sec_sec_hide").hide();
        $(".sec_sec_show").show();
        $(".sec_section").hide("slow");
      } else if (show_hide_type === 'HIDE') {
        $(".sec_sec_hide").show();
        $(".sec_sec_show").hide();
        $(".sec_section").show("slow");
      }
    }
  }

  // Make the function available globally
  window.sectionShow = sectionShow;
