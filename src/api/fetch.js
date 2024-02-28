function responseJsonSuccess(data) {
    return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data)
    });
}


export const fetch = (url, options) => {
    if(url === "http://localhost:3001/login") {
        const body = JSON.parse(options.body);
        const usersString = localStorage.getItem("users");
        const userList = JSON.parse(usersString);
        const user = userList.find((u) => u.email === body.email && u.password === body.password);
        if(user){
            return responseJsonSuccess({access_token: '12345'});
        }
    }

    if(url === "http://localhost:3001/register") {
        const body = JSON.parse(options.body);
        const usersString = localStorage.getItem("users");
        const userList = JSON.parse(usersString);
        const user = userList.find((u) => u.email === body.email);
        if(user){
            return Promise.resolve({
                ok: false,
                json: () => Promise.resolve({error: "User already exists"})
            });
        } else {
            userList.push({email: body.email, password: body.password, id: userList.length + 1});
            localStorage.setItem("users", JSON.stringify(userList));
            return responseJsonSuccess({success: "true"});
        }
    }

    if(url === "http://localhost:3001/movies") {
        if(options.method === "POST") {
            const movieListString = localStorage.getItem("movies");
            const movie = JSON.parse(options.body);
            if (!movieListString) {
                localStorage.setItem("movies", JSON.stringify([movie]));
            } else {
                const movieList = JSON.parse(movieListString);
                movieList.push(movie);
                localStorage.setItem("movies", JSON.stringify(movieList));
            }

            return responseJsonSuccess({success: "true"});
        } else {
            const movieListString = localStorage.getItem("movies");
            const movieList = JSON.parse(movieListString);
            return responseJsonSuccess(movieList);
        }
    }

    if(url.includes("http://localhost:3001/movies/")) {
        const movieId = url.split("/").pop();
        if(options.method === "PUT") {
            const movieListString = localStorage.getItem("movies");
            const movie = JSON.parse(options.body);
            const movieList = JSON.parse(movieListString);
            const index = movieList.findIndex((m) => m.id === Number(movieId));
            movieList[index] = movie;
            localStorage.setItem("movie", JSON.stringify(movieList));
            return responseJsonSuccess(movie);
        }

        if(options.method === "DELETE") {
            const movieListString = localStorage.getItem("movies");
            const movieList = JSON.parse(movieListString);
            const index = movieList.findIndex((m) => m.id === Number(movieId));
            movieList.splice(index, 1);
            localStorage.setItem("movie", JSON.stringify(movieList));
            return responseJsonSuccess({success: "true"});
        }

        const movieListString = localStorage.getItem("movies");
        const movieList = JSON.parse(movieListString);
        const movie = movieList.find((m) => m.id === Number(movieId));
        return responseJsonSuccess(movie);
    }

    if(url.includes("http://localhost:3001/users/")) {
        const userId = url.split("/").pop();
        const usersString = localStorage.getItem("users");
        const userList = JSON.parse(usersString);
        const user = userList.find((u) => u.id === Number(userId));
        return responseJsonSuccess(user);
    }
}
