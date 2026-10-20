(function () {
  var COORDS = {
    "Africa/Cairo": [30.04, 31.24],
    "Africa/Johannesburg": [-26.2, 28.04],
    "Africa/Lagos": [6.45, 3.4],
    "Africa/Nairobi": [-1.29, 36.82],
    "America/Anchorage": [61.22, -149.9],
    "America/Argentina/Buenos_Aires": [-34.6, -58.38],
    "America/Bogota": [4.71, -74.07],
    "America/Chicago": [41.88, -87.63],
    "America/Denver": [39.74, -104.99],
    "America/Halifax": [44.65, -63.57],
    "America/Los_Angeles": [34.05, -118.24],
    "America/Mexico_City": [19.43, -99.13],
    "America/New_York": [40.71, -74.01],
    "America/Phoenix": [33.45, -112.07],
    "America/Sao_Paulo": [-23.55, -46.63],
    "America/Toronto": [43.65, -79.38],
    "America/Vancouver": [49.28, -123.12],
    "Asia/Bangkok": [13.76, 100.5],
    "Asia/Dubai": [25.2, 55.27],
    "Asia/Hong_Kong": [22.32, 114.17],
    "Asia/Jakarta": [-6.21, 106.85],
    "Asia/Kolkata": [22.57, 88.36],
    "Asia/Manila": [14.6, 120.98],
    "Asia/Seoul": [37.57, 126.98],
    "Asia/Shanghai": [31.23, 121.47],
    "Asia/Singapore": [1.35, 103.82],
    "Asia/Taipei": [25.03, 121.57],
    "Asia/Tokyo": [35.68, 139.69],
    "Australia/Melbourne": [-37.81, 144.96],
    "Australia/Perth": [-31.95, 115.86],
    "Australia/Sydney": [-33.87, 151.21],
    "Europe/Amsterdam": [52.37, 4.9],
    "Europe/Berlin": [52.52, 13.41],
    "Europe/London": [51.51, -0.13],
    "Europe/Madrid": [40.42, -3.7],
    "Europe/Paris": [48.86, 2.35],
    "Europe/Rome": [41.9, 12.5],
    "Pacific/Auckland": [-36.85, 174.76],
    "Pacific/Honolulu": [21.31, -157.86]
  };

  function viewerCoords() {
    var zone = "Asia/Manila";
    try {
      zone = Intl.DateTimeFormat().resolvedOptions().timeZone || zone;
    } catch (error) {
      zone = "Asia/Manila";
    }
    if (COORDS[zone]) return COORDS[zone];
    var lon = -new Date().getTimezoneOffset() / 4;
    var lat = zone.indexOf("Australia/") === 0 || zone.indexOf("Pacific/Auckland") === 0 ? -33 : 20;
    return [lat, lon];
  }

  function sunMinutes(date, lat, lon, rise) {
    var rad = Math.PI / 180;
    var start = new Date(date.getFullYear(), 0, 0);
    var n = Math.floor((date - start) / 86400000);
    var lngHour = lon / 15;
    var t = n + ((rise ? 6 : 18) - lngHour) / 24;
    var M = (0.9856 * t) - 3.289;
    var L = M + (1.916 * Math.sin(M * rad)) + (0.02 * Math.sin(2 * M * rad)) + 282.634;
    L = ((L % 360) + 360) % 360;
    var RA = Math.atan(0.91764 * Math.tan(L * rad)) / rad;
    RA = ((RA % 360) + 360) % 360;
    var Lq = Math.floor(L / 90) * 90;
    var RAq = Math.floor(RA / 90) * 90;
    RA = (RA + (Lq - RAq)) / 15;
    var sinDec = 0.39782 * Math.sin(L * rad);
    var cosDec = Math.cos(Math.asin(sinDec));
    var cosH = (Math.cos(90.833 * rad) - (sinDec * Math.sin(lat * rad))) / (cosDec * Math.cos(lat * rad));
    if (cosH > 1) return rise ? null : null;
    if (cosH < -1) return rise ? 0 : 24 * 60;
    var H = Math.acos(cosH) / rad;
    if (rise) H = 360 - H;
    H = H / 15;
    var T = H + RA - (0.06571 * t) - 6.622;
    var UT = T - lngHour;
    UT = ((UT % 24) + 24) % 24;
    var local = UT * 60 - date.getTimezoneOffset();
    return ((local % 1440) + 1440) % 1440;
  }

  function clockTheme() {
    var now = new Date();
    var place = viewerCoords();
    var rise = sunMinutes(now, place[0], place[1], true);
    var set = sunMinutes(now, place[0], place[1], false);
    if (rise == null || set == null) return rise == null && set == null ? "night" : "day";
    var mins = now.getHours() * 60 + now.getMinutes();
    return mins >= rise && mins < set ? "day" : "night";
  }

  function chosenTheme() {
    var clock = clockTheme();
    try {
      var stored = localStorage.getItem("chainnes-theme");
      var period = localStorage.getItem("chainnes-theme-period");
      if (period && period !== clock) {
        localStorage.removeItem("chainnes-theme");
        localStorage.removeItem("chainnes-theme-period");
      } else if ((stored === "day" || stored === "night") && period === clock) {
        return stored;
      }
    } catch (error) {
      /* Storage can be blocked; sunrise and sunset still choose the theme. */
    }
    return clock;
  }

  function applyInitial() {
    var theme = "day";
    try {
      theme = chosenTheme();
    } catch (error) {
      theme = "day";
    }
    document.documentElement.setAttribute("data-theme", theme);
    var icon = document.querySelector('link[rel="icon"]');
    if (icon) icon.href = theme === "night" ? "/assets/images/chainnes-logo.png" : "/assets/images/chainnes-logo-day.png";
  }

  window.chainnesClockTheme = clockTheme;
  window.chainnesChosenTheme = chosenTheme;
  applyInitial();
})();
