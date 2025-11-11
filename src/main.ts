import "./style.css"
import "./widgets/web-search/WebSearch"

console.log("Yeet!")

window.addEventListener('popstate', function(event) {
  // 'event.state' holds the data passed to pushState/replaceState
  console.log('Browser history navigation occurred!');
  console.log('New URL:', window.location.href);
  console.log('State data:', event.state);
});
