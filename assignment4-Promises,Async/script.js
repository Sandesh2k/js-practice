// 1. sleep(ms)

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function testSleep() {
    console.log("1. sleep()");

    console.log("Waiting...");

    await sleep(2000);

    console.log("2 seconds completed");
}


// 2. retry(fn, attempts)

async function retry(fn, attempts) {
    for (let i = 1; i <= attempts; i++) {
        try {
            return await fn();
        } catch (error) {
            console.log(`Attempt ${i} failed`);

            if (i === attempts) {
                throw error;
            }
        }
    }
}

async function testRetry() {
    console.log("2. retry()");

    let count = 0;

    const result = await retry(async () => {
        count++;

        if (count < 3) {
            throw new Error("Something went wrong");
        }

        return "Success";
    }, 3);

    console.log("Result:", result);
}


// 3. Promise.all() from scratch

function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completed = 0;

        if (promises.length === 0) {
            resolve([]);
            return;
        }

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(result => {
                    results[index] = result;
                    completed++;

                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    });
}

async function testPromiseAll() {
    console.log("3. Promise.all()");

    const results = await promiseAll([
        Promise.resolve("Java"),
        Promise.resolve("JavaScript"),
        Promise.resolve("Spring Boot")
    ]);

    console.log("Results:", results);
}


// 4. Fetch users and their posts in parallel

async function fetchUsersWithPosts() {
    console.log("4. Users + Posts");

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    const users = await response.json();

    const results = await promiseAll(
        users.map(async user => {

            const response = await fetch(
                `https://jsonplaceholder.typicode.com/users/${user.id}/posts`
            );

            const posts = await response.json();

            return {
                user,
                posts
            };
        })
    );

    results.forEach(result => {
        console.log("\nUser:", result.user.name);
        console.log("Posts:", result.posts);
    });
}

async function main() {
    await testSleep();
    await testRetry();
    await testPromiseAll();
    await fetchUsersWithPosts();
}

main();