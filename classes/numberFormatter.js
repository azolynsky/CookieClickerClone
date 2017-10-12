import Numeral from 'numeral';

class NumberFormatter{
  static formatNumber(number){
    var numeral=Numeral(number);
    if (number > 1000000){
      return numeral.format('(0.000 a)');
    }
    else return numeral.format('0,0');
  }
}

export default NumberFormatter;