import './dialog.css'

export default function Dialog(props) {
    const { title, yesCallback, noCallback } = props;

    return (
      <div className="backdrop">
        <div className="square"></div>

        <div className="dialog">
          <div className="close-container">
            <span className="close-icon">x</span>
          </div>
          <h1>{title}</h1>

          <p>
            <button onClick={yesCallback}>Yes</button>
            <button onClick={noCallback}>No</button>
          </p>
        </div>
      </div>
    );
}