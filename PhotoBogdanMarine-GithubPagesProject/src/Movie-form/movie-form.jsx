export default function MovieForm(props) {
    const { onSubmit, movie = {} } = props;

    function handleSubmit(event) {
      event.preventDefault();
      const { url, year, description, author, title } = event.target;

      const updatedMovie = {
        ...movie,
        image: url.value,
        year: year.value,
        description: description.value,
        author: author.value,
        title: title.value,
    };
    onSubmit(updatedMovie);
    event.target.reset();
  }

    return (
        <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="url">URL:</label>
          <input
            id="url"
            type="text"
            name="url"
            defaultValue={movie?.image}
          ></input>
        </fieldset>

        <fieldset>
          <label htmlFor="year">Year of release:</label>
          <input
            id="year"
            type="number"
            name="year"
            min={1900}
            max={2100}
            defaultValue={movie?.year}
          ></input>
        </fieldset>

        <fieldset>
          <label htmlFor="description">Description:</label>
          <select id="description" name="description" defaultValue={movie?.description}>
            <option value="Animals">Animals</option>
            <option value="Buildings">Buildings</option>
            <option value="Nature">Nature</option>
            <option value="Objects">Objects</option>
            <option value="People">People</option>
          </select>
        </fieldset>

        <fieldset>
          <label htmlFor="author">Author:</label>
          <select id="author" name="author" defaultValue={movie?.author}>
            <option value="G">Grigore</option>
            <option value="P">Praid</option>
            <option value="D">Daniel</option>
            <option value="R">Robert</option>
            <option value="N">Nicola</option>
          </select>
        </fieldset>

        <fieldset>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={movie?.title}
          ></input>
        </fieldset>

        <button>Submit</button>
      </form>
    )
}