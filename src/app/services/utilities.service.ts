import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() {
  }

  // transforms a given string date into Date type (year-month-day format)
  public localDateToDate(localDate?: any): Date {
    if (localDate !== null) {
      return new Date(+localDate.year, +localDate.monthValue - 1, +localDate.dayOfMonth + 1);
    }
    return null;
  }

  public localDateToString(localDate?: any): string {
    if (localDate !== null) {
      var day: string  = String((localDate.dayOfMonth < 10) ? "0" + localDate.dayOfMonth : localDate.dayOfMonth);
      var month: string  = String(((localDate.monthValue + 1) < 10) ? "0" + (localDate.monthValue + 1) : (localDate.monthValue + 1));
      var year: string  = String(localDate.year);
      return year + "-" + month + "-" + day;
    }
    return null;
  }

  public dateToString(date?: Date): string {
    if (date !== null) {
      var day: string  = String((date.getDate() < 10) ? "0" + date.getDate() : date.getDate());
      var month: string  = String(((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
      var year: string  = String(date.getFullYear());
      return year + "-" + month + "-" + day;
    }
    return null;
  }

  public stringToDate(stringDate?: string): Date {
    if (stringDate !== null) {
      const splitStringArray = stringDate.split('-');
      return new Date(+splitStringArray[0], +splitStringArray[1] - 1, +splitStringArray[2] + 1);
    }
    return null;
  }
}
