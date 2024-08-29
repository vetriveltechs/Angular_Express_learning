import { Injectable } from '@angular/core';
import * as $ from 'jquery'; // Import jQuery

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  sectionShow(
    sectionType: 'FIRST_SECTION' | 'SECOND_SECTION',
    showHideType: 'SHOW' | 'HIDE'
  ): void {
    if (sectionType === 'FIRST_SECTION') {
      if (showHideType === 'SHOW') {
        $('.first_sec_hide').hide();
        $('.first_sec_show').show();
        $('.first_section').hide('slow');
      } else if (showHideType === 'HIDE') {
        $('.first_sec_hide').show();
        $('.first_sec_show').hide();
        $('.first_section').show('slow');
      }
    } else if (sectionType === 'SECOND_SECTION') {
      if (showHideType === 'SHOW') {
        $('.sec_sec_hide').hide();
        $('.sec_sec_show').show();
        $('.sec_section').hide('slow');
      } else if (showHideType === 'HIDE') {
        $('.sec_sec_hide').show();
        $('.sec_sec_show').hide();
        $('.sec_section').show('slow');
      }
    }
  }
}
