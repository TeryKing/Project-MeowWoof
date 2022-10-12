import { format } from 'date-fns';

module.exports = {
    arrival_date: (date) => {
     const today = format(new Date(date),'MM.dd.yyyy');
     console.log(today)
      return today;     
    }
  };