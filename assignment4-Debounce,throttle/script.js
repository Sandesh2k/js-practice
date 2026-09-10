// 1. debounce()

function debounce(fn, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}


// 2. throttle()

function throttle(fn, delay) {
    let lastCall = 0;

    return function (...args) {
        const now = Date.now();

        if (now - lastCall >= delay) {
            lastCall = now;
            fn(...args);
        }
    };
}


// 3. Debounce API Demo

const searchInput = document.querySelector("#searchInput");
const searchResult = document.querySelector("#searchResult");

async function searchUsers(searchText) {

    if (!searchText) {
        searchResult.textContent = "";
        return;
    }

    console.log("API call:", searchText);

    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?username_like=${searchText}`
    );

    const users = await response.json();

    searchResult.textContent =
        `Found ${users.length} user(s)`;
}

const debouncedSearch = debounce(searchUsers, 500);

searchInput.addEventListener("input", event => {
    debouncedSearch(event.target.value);
});


// 4. Throttle Scroll Demo

function logScrollPosition() {
    console.log("Scroll position:", window.scrollY);
}

const throttledScroll = throttle(logScrollPosition, 200);

window.addEventListener("scroll", throttledScroll);