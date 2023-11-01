const userLocale =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log(userLocale, timeZone);
function toDate() {
  let timestamp = document.getElementById("epc-timestamp").value;
  let len = document.getElementById("epc-timestamp").value.toString().length;
  if (len < 12) {
    // assume the timestamp is in second => convert to ms
    timestamp = timestamp * 1000 
  }
  if (timestamp == 0) {
    document.getElementById("epc-gmt-date").innerHTML = "...";
    document.getElementById("epc-local-date").innerHTML = "...";
    return
  }
  let d = new Date(+timestamp);
  document.getElementById("epc-gmt-date").innerHTML = d.toGMTString().replace('GMT', '');
  let option = {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false
  };
  document.getElementById("epc-local-date").innerHTML = d.toLocaleString(userLocale, option);
}
document.getElementById("epc-timestamp").addEventListener("input", toDate);

const span = document.getElementById('time-now');

function currentTime() {
  let d = new Date();
  let s = d.getSeconds();
  let m = d.getMinutes();
  let h = d.getHours();
  let timeZoneOffset = d.getTimezoneOffset() * -1 / 60;
  span.textContent = 
    ("0" + h).slice(-2) + ":" + ("0" + m).slice(-2) + ":" + 
    ("0" + s).slice(-2) + " GMT" + (timeZoneOffset>0?"+":"-") + timeZoneOffset;
}

setInterval(currentTime, 1000);

let d = new Date();
let unix = Math.floor(d.getTime() / 1000) * 1000
const spanUnix = document.getElementById('time-unix');
spanUnix.textContent = unix;
