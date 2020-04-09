export const convertUnixToTime = (unix_time) => {
    let date = new Date(unix_time * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.substr(-2);
  }